import CARD_TYPES from '../constants/cardTypes';
import LANES from '../constants/lanes';

import utilsService from './utils';
import {
    INITIAL_MANA_PER_TURN,
    INITIAL_BASE_STRENGTH,
    NO_OF_ROWS,
    LAST_ROW_INDEX
} from '../constants/turn';

let events = [];
let nextId = {
    event: 0,
    user: 0,
    cpu: 0
};

let gameState = {
    events: [],
    turns: 0,
    mana: {
        user: INITIAL_MANA_PER_TURN,
        cpu: INITIAL_MANA_PER_TURN
    },
    units: {
        user: [],
        cpu: []
    },
    baseStrength: {
        user: INITIAL_BASE_STRENGTH,
        cpu: INITIAL_BASE_STRENGTH
    }
};

const initialGameState = utilsService.copyObject(gameState);

/**
 * Add event
 *
 * @param {string} text
 */
const addEvent = text => {
    const event = {
        id: nextId.event,
        text: text
    };

    gameState.events.push(event);
    nextId.event++;
};

/**
 * Buff Card Stats according to the faction
 *
 * @param {object} stats
 * @param {string} faction
 */
const buffCardStats = (stats, faction) => {
    if (['sum', 'spr'].indexOf(faction) > -1) {
        return {
            attack: stats.attack + 1,
            defence: stats.defence,
            pace: stats.pace
        };
    }

    if (['win', 'aut'].indexOf(faction) > -1) {
        return {
            attack: stats.attack,
            defence: stats.defence + 1,
            pace: stats.pace
        };
    }
};

/**
 * Create unit
 *
 * @param {string} type
 * @param {object} card
 *
 * @returns {object}
 */
const createUnitFromCard = (card, laneId, team) => {
    const cardRow = team === 'user' ? 0 : LAST_ROW_INDEX;
    let cardStats = utilsService.copyObject(card.stats);
    if (card.faction === LANES[laneId].value) {
        cardStats = buffCardStats(cardStats, card.faction);
    }

    const unit = {
        id: nextId[team],
        lane: laneId,
        attack: cardStats.attack,
        defence: cardStats.defence,
        pace: cardStats.pace,
        row: cardRow,
        cardId: card.id,
        isAlive: true
    };

    nextId[team]++;

    return unit;
};

/**
 * Add an unit to the battleground
 *
 * @param {object} lane
 * @param {object} card
 */
const deployUnit = (lane, card) => {
    const unit = createUnitFromCard(card, lane.id, 'user');

    gameState.units.user.push(unit);

    return unit;
};

const selectCpuUnits = () => {
    let hasMoves = true,
        availableMana = gameState.mana.cpu,
        availableLanes = LANES.slice(0).filter(lane => {
            const unitExistsOnLane =
                getTeamUnitOnTile('user', lane.id, LAST_ROW_INDEX) ||
                getTeamUnitOnTile('cpu', lane.id, LAST_ROW_INDEX - 1);

            return unitExistsOnLane ? false : true;
        }),
        availableCards = CARD_TYPES.filter(card => card.cost <= availableMana),
        unit,
        cardLaneId,
        selectedCard;

    if (availableLanes.length === 0 || availableCards.length === 0) {
        return;
    }

    /**
     * Get available lane id
     *
     * @returns {number}
     */
    const getAvailableLaneId = () => {
        let laneIndex = utilsService.getRandomInteger(0, availableLanes.length - 1);
        let laneId = availableLanes[laneIndex].id;

        return laneId;
    };

    const getAvailableCard = () => {
        availableCards = CARD_TYPES.filter(card => card.cost <= availableMana);

        let cardIndex = utilsService.getRandomInteger(0, availableCards.length - 1);
        let selectedCard = availableCards[cardIndex];

        return selectedCard;
    };

    do {
        cardLaneId = getAvailableLaneId();
        selectedCard = getAvailableCard();
        if (!selectedCard) {
            return;
        }

        unit = createUnitFromCard(selectedCard, cardLaneId, 'cpu');
        availableMana -= selectedCard.cost;
        gameState.units.cpu.push(unit);
        hasMoves = availableCards.length > 0;
    } while (hasMoves);
};

/**
 * Move Units
 *
 * @param {string} team
 */
const moveUnits = team => {
    team = team || 'user';
    gameState.units[team] = gameState.units[team]
        .filter(unit => unit.isAlive)
        .map(unit => {
            return {
                ...unit,
                row: team === 'user' ? unit.row + unit.pace : unit.row - unit.pace
            };
        });
};

const markUnitAsDead = (unit, team) => {
    gameState.units[team] = gameState.units[team].map(el =>
        el.id === unit.id ? { ...el, isAlive: false } : el
    );
};

/**
 * Update unit stat after a base attack
 *
 * @param {object} unit
 * @param {string} team
 * @param {string} opposingTeam
 */
const attackBase = (unit, team, opposingTeam) => {
    let text = '',
        isBaseDestroyed;
    const unitCard = CARD_TYPES.find(card => card.id === unit.cardId);

    gameState.baseStrength[opposingTeam] -= unit.attack;
    isBaseDestroyed = gameState.baseStrength[opposingTeam] < 0;
    text = `(${LANES[unit.lane].label}) ${unitCard.label} (#${unit.id})
            ${isBaseDestroyed ? 'destroyed' : 'attacked'}
            ${opposingTeam} base.`;

    markUnitAsDead(unit, team);
    addEvent(text);
};

/**
 * Update units stat after fight between them
 *
 * @param {object} unit
 * @param {object} opposingUnit
 * @param {string} team
 * @param {string} opposingTeam
 */
const attackUnit = (unit, opposingUnit, team, opposingTeam) => {
    let text = '';
    const unitCard = CARD_TYPES.find(card => card.id === unit.cardId);
    const opposingCard = CARD_TYPES.find(card => card.id === opposingUnit.cardId);

    text =
        ` (${LANES[unit.lane].label})` +
        ` (${team} #${unit.id}) ${unitCard.label} ${unit.attack}, ${unit.defence} fought` +
        ` (${opposingTeam} #${opposingUnit.id}) ${opposingCard.label} ${opposingUnit.attack}, ${opposingUnit.defence}.`;

    opposingUnit.defence -= unit.attack;
    unit.defence -= opposingUnit.attack;

    if (unit.defence <= 0) {
        markUnitAsDead(unit, team);
        text += `| ${team} unit died.`;
    }

    if (opposingUnit.defence <= 0) {
        markUnitAsDead(opposingUnit, opposingTeam);
        text += `| ${opposingTeam} unit died.`;
    }

    addEvent(text);
};

/**
 * Get team unit on given tile coordinates
 *
 * @param {string} team
 * @param {number} lane
 * @param {number} row
 *
 * @returns {object | false}
 */
const getTeamUnitOnTile = (team, lane, row) => {
    let foundUnit = gameState.units[team].find(
        unit => unit.isAlive && unit.row === row && unit.lane === lane
    );

    return foundUnit ? foundUnit : false;
};

/**
 * Start fight for give team
 *
 * @param {string} team
 *
 * @returns {function}
 */
const fight = team => {
    const opposingTeam = team === 'user' ? 'cpu' : 'user';
    const baseRow = team === 'user' ? NO_OF_ROWS : -1;
    const activeUnits = gameState.units[team].filter(unit => unit.isAlive);
    let opposingUnit, isAttackingBase;

    activeUnits.forEach(unit => {
        isAttackingBase = team === 'user' ? unit.row >= baseRow : unit.row <= baseRow;
        if (isAttackingBase) {
            return attackBase(unit, team, opposingTeam);
        }
        opposingUnit = getTeamUnitOnTile(opposingTeam, unit.lane, unit.row);
        if (!opposingUnit) {
            return;
        }

        return attackUnit(unit, opposingUnit, team, opposingTeam);
    });
};

const increaseMana = team => {
    const manaIncrease = gameState.turns % 2 === 0 ? 1 : 0;

    gameState.mana[team] += manaIncrease;
};

/**
 * Play user turn
 *
 * @returns {object} gameState
 */
const playUserTurn = () => {
    moveUnits('user');
    fight('user');
    increaseMana('user');
    selectCpuUnits();

    return gameState;
};

/**
 * Play enemy turn
 *
 * @returns {object} gameState
 */

const playEnemyTurn = () => {
    moveUnits('cpu');
    fight('cpu');
    increaseMana('cpu');
    gameState.turns++;

    return gameState;
};

/**
 * Get the events
 *
 * @returns {array}
 */
const getEvents = () => events;

/**
 * Get the units
 *
 * @param {string} team
 *
 * @returns {array}
 */
const getUnits = team => {
    team = team || 'user';

    return gameState.units[team];
};

/**
 * Get default card
 *
 * @returns {object}
 */
const getDefaultCard = () => {
    return CARD_TYPES[0];
};

/**
 * Reset game state
 */
const reset = () => {
    gameState = utilsService.copyObject(initialGameState);
    events = [];
    nextId = {
        event: 0,
        user: 0,
        cpu: 0
    };

    return;
};

const gameService = {
    getUnits,
    getEvents,
    getDefaultCard,
    createUnitFromCard,
    playUserTurn,
    playEnemyTurn,
    reset,
    deployUnit
};

export default gameService;
