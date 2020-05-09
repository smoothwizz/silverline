import { CARD_TYPES } from '../constants/cards';
import LANES from '../constants/lanes';

import utilsService from './utils';
import fightService from './fight';

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
    enemy: 0
};

let gameState = {
    events: [],
    turns: 0,
    mana: {
        user: INITIAL_MANA_PER_TURN,
        enemy: INITIAL_MANA_PER_TURN
    },
    units: {
        user: [],
        enemy: []
    },
    baseStrength: {
        user: INITIAL_BASE_STRENGTH,
        enemy: INITIAL_BASE_STRENGTH
    },
    isGameOver: false
};

const initialGameState = utilsService.copyObject(gameState);

/**
 * Add event
 *
 * @param {string} text
 * @param {string} log
 */
const addEvent = (text, log) => {
    log = log || '';
    const event = {
        id: nextId.event,
        text: text,
        log: log
    };

    if (gameState.isGameOver) {
        return;
    }

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
    // TODO Add buffs for faction
    if (['sum', 'spr'].indexOf(faction) > -1) {
        return {
            attack: stats.attack,
            life: stats.life,
            pace: stats.pace
        };
    }

    if (['win', 'aut'].indexOf(faction) > -1) {
        return {
            attack: stats.attack,
            life: stats.life,
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
        life: cardStats.life,
        pace: cardStats.pace,
        row: cardRow,
        cardId: card.id,
        isAlive: true
    };

    return unit;
};

/**
 * Add an unit to the battleground
 *
 * @param {object} lane
 * @param {object} card
 */
const deployUnit = (lane, card) => {
    const team = 'user';
    const unit = createUnitFromCard(card, lane.id, team);

    nextId[team]++;
    gameState.mana.user -= card.cost;
    gameState.units.user.push(unit);

    return unit;
};

const selectEnemyUnits = () => {
    let hasMoves = true,
        availableLanes = LANES.slice(0).filter(lane => {
            const unitExistsOnLane =
                getTeamUnitsOnTile('user', lane.id, LAST_ROW_INDEX).length > 0 ||
                getTeamUnitsOnTile('enemy', lane.id, LAST_ROW_INDEX - 1).length > 0;

            return unitExistsOnLane ? false : true;
        }),
        availableCards = CARD_TYPES.filter(card => card.cost <= gameState.mana.enemy),
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
        availableCards = CARD_TYPES.filter(card => card.cost <= gameState.mana.enemy);

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

        gameState.mana.enemy -= selectedCard.cost;
        unit = createUnitFromCard(selectedCard, cardLaneId, 'enemy');
        nextId.enemy++;
        gameState.units.enemy.push(unit);
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

    const getUpdatedUnit = unit => {
        if (!unit.isAlive) {
            return unit;
        }

        return {
            ...unit,
            row: team === 'user' ? unit.row + unit.pace : unit.row - unit.pace
        };
    };

    gameState.units[team] = gameState.units[team].map(unit => {
        return getUpdatedUnit(unit);
    });
};

const markUnitAsDead = (unit, team) => {
    gameState.units[team] = gameState.units[team].map(el =>
        el.id === unit.id ? { ...el, life: -1, isAlive: false } : el
    );
};

/**
 * Update unit life
 *
 * @param {object} unit
 * @param {number} life
 * @param {string} team
 */
const updateUnitLife = (unit, life, team) => {
    gameState.units[team] = gameState.units[team].map(el =>
        el.id === unit.id ? { ...el, life: life } : el
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
    const unitCard = CARD_TYPES.find(card => card.id === unit.cardId),
        opposingTeamLabel = opposingTeam === 'user' ? 'Your' : 'Enemy';

    gameState.baseStrength[opposingTeam] -= unit.attack;
    isBaseDestroyed = gameState.baseStrength[opposingTeam] <= 0;
    text = `(${LANES[unit.lane].label}) ${unitCard.label} (#${unit.id})
            ${isBaseDestroyed ? 'destroyed' : 'attacked'}
            ${opposingTeamLabel} base. ${isBaseDestroyed ? '' : `-${unit.attack} HP`}`;

    markUnitAsDead(unit, team);
    addEvent(text);

    if (isBaseDestroyed) {
        gameState.isGameOver = true;
    }
};

/**
 * Update units stat after fight between them and log the fight
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
    const teamLabel = team === 'user' ? 'Your' : 'Enemy';
    const opposingTeamLabel = team === 'user' ? 'Enemy' : 'Your';

    const { stats, log } = fightService.processFight(unit, opposingUnit);

    text = `Fight #${nextId.event}:
            (${LANES[unit.lane].label}) ${teamLabel} ${unitCard.label} (#${unit.id}) vs ${opposingTeamLabel} ${opposingCard.label} (#${opposingUnit.id})`;

    if (stats.unit.life <= 0) {
        markUnitAsDead(unit, team);
        text += ` | ${teamLabel} unit died.`;
    } else {
        updateUnitLife(unit, stats.unit.life, team);
    }

    if (stats.opposingUnit.life <= 0) {
        markUnitAsDead(opposingUnit, opposingTeam);
        text += ` | ${opposingTeamLabel} unit died.`;
    } else {
        updateUnitLife(opposingUnit, stats.opposingUnit.life, opposingTeam);
    }

    addEvent(text, log);
};

/**
 * Get team unit on given tile coordinates
 *
 * @param {string} team
 * @param {number} lane
 * @param {number} row
 *
 * @returns {array}
 */
const getTeamUnitsOnTile = (team, lane, row) => {
    let units = gameState.units[team].filter(
        unit => unit.isAlive && unit.row === row && unit.lane === lane
    );

    return units;
};

/**
 * Start fight for give team
 *
 * @param {string} team
 *
 * @returns {}
 */
const fight = team => {
    const opposingTeam = team === 'user' ? 'enemy' : 'user';
    const baseRow = team === 'user' ? NO_OF_ROWS : -1;
    const activeUnits = gameState.units[team].filter(unit => {
        return unit.isAlive;
    });
    let opposingUnits, isAttackingBase;

    activeUnits.forEach(unit => {
        isAttackingBase = team === 'user' ? unit.row >= baseRow : unit.row <= baseRow;
        if (isAttackingBase) {
            attackBase(unit, team, opposingTeam);

            return;
        }
        opposingUnits = getTeamUnitsOnTile(opposingTeam, unit.lane, unit.row);
        if (opposingUnits.length === 0) {
            return;
        }
        opposingUnits.map(opposingUnit => attackUnit(unit, opposingUnit, team, opposingTeam));

        return;
    });
};

const increaseMana = team => {
    const manaIncrease = 1 + parseInt(gameState.turns / 2);
    gameState.mana[team] += manaIncrease;
};

const cleanField = () => {
    gameState.units.user = gameState.units.user.filter(unit => {
        return unit.isAlive;
    });
    gameState.units.enemy = gameState.units.enemy.filter(unit => {
        return unit.isAlive;
    });
};

/**
 * Play user turn
 *
 * @returns {object} gameState
 */
const playUserTurn = () => {
    cleanField();
    moveUnits('user');
    fight('user');
    increaseMana('user');
    selectEnemyUnits();

    return gameState;
};

/**
 * Play enemy turn
 *
 * @returns {object} gameState
 */

const playEnemyTurn = () => {
    cleanField();
    moveUnits('enemy');
    fight('enemy');
    increaseMana('enemy');
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
 * Check if game is over
 *
 * @returns {boolean}
 */
const getGameOverState = () => {
    return gameState.isGameOver;
};

/**
 * Reset game state
 */
const reset = () => {
    gameState = utilsService.copyObject(initialGameState);
    events.length = 0;
    nextId = {
        event: 0,
        user: 0,
        enemy: 0
    };

    return;
};

const gameService = {
    getUnits,
    getEvents,
    getDefaultCard,
    getGameOverState,
    createUnitFromCard,
    playUserTurn,
    playEnemyTurn,
    reset,
    deployUnit
};

export default gameService;
