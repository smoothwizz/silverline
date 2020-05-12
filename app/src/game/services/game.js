import { CARD_TYPES } from '../constants/cards';
import LANES from '../constants/lanes';

import utilsService from './utils';
import fightService from './fight';
import { currentState, actions } from './gameState';

import { NO_OF_ROWS, LAST_ROW_INDEX } from '../constants/turn';

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

    actions.setMana(currentState.mana.user - card.cost, 'user');
    actions.addUnit(unit, 'user');

    return unit;
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
    let units = currentState.units[team].filter(
        unit => unit.isAlive && unit.row === row && unit.lane === lane
    );

    return units;
};

const selectEnemyUnits = () => {
    let hasMoves = true,
        availableLanes = LANES.slice(0).filter(lane => {
            const unitExistsOnLane =
                getTeamUnitsOnTile('user', lane.id, LAST_ROW_INDEX).length > 0 ||
                getTeamUnitsOnTile('enemy', lane.id, LAST_ROW_INDEX - 1).length > 0;

            return unitExistsOnLane ? false : true;
        }),
        availableCards = CARD_TYPES.filter(card => card.cost <= currentState.mana.enemy),
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
        availableCards = CARD_TYPES.filter(card => card.cost <= currentState.mana.enemy);

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

        actions.setMana(currentState.mana.enemy - selectedCard.cost, 'enemy');
        unit = createUnitFromCard(selectedCard, cardLaneId, 'enemy');
        actions.addUnit(unit, 'enemy');
        hasMoves = availableCards.length > 0;
    } while (hasMoves);
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

    actions.setBaseStrength(currentState.baseStrength[opposingTeam] - unit.attack);
    isBaseDestroyed = currentState.baseStrength[opposingTeam] <= 0;
    text = `(${LANES[unit.lane].label}) ${unitCard.label} (#${unit.id})
            ${isBaseDestroyed ? 'destroyed' : 'attacked'}
            ${opposingTeamLabel} base. ${isBaseDestroyed ? '' : `-${unit.attack} HP`}`;

    actions.markUnitAsDead(unit, team);
    actions.addEvent(text);

    if (isBaseDestroyed) {
        actions.setGameOver(true);
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

    text = `Fight:
            (${LANES[unit.lane].label}) ${teamLabel} ${unitCard.label} (#${unit.id}) vs ${opposingTeamLabel} ${opposingCard.label} (#${opposingUnit.id})`;

    if (stats.unit.life <= 0) {
        actions.markUnitAsDead(unit, team);
        text += ` | ${teamLabel} unit died.`;
    } else {
        actions.updateUnitLife(unit, stats.unit.life, team);
    }

    if (stats.opposingUnit.life <= 0) {
        actions.markUnitAsDead(opposingUnit, opposingTeam);
        text += ` | ${opposingTeamLabel} unit died.`;
    } else {
        actions.updateUnitLife(opposingUnit, stats.opposingUnit.life, opposingTeam);
    }

    actions.addEvent(text, log);
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
    const activeUnits = currentState.units[team].filter(unit => {
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
    const manaIncrease = 1 + parseInt(currentState.turns / 3);
    const updatedMana = currentState.mana[team] + manaIncrease;

    actions.setMana(updatedMana, team);
};

/**
 * Play user turn
 *
 * @returns {object} currentState
 */
const playUserTurn = () => {
    actions.removeDeadUnits();
    actions.moveUnits('user');
    fight('user');
    increaseMana('user');
    selectEnemyUnits();

    return currentState;
};

/**
 * Play enemy turn
 *
 * @returns {object} currentState
 */

const playEnemyTurn = () => {
    actions.removeDeadUnits();
    actions.moveUnits('enemy');
    fight('enemy');
    increaseMana('enemy');
    actions.incrementTurn();
    actions.addEvent(`Turn #${currentState.turns}`);

    return currentState;
};

/**
 * Get the units
 *
 * @param {string} team
 *
 * @returns {array}
 */
const getUnits = team => {
    team = team || 'user';

    return currentState.units[team];
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
    return actions.isGameOver();
};

/**
 * Reset game state
 */
const reset = () => {
    return actions.resetState();
};

const gameService = {
    getUnits,
    getDefaultCard,
    getGameOverState,
    createUnitFromCard,
    playUserTurn,
    playEnemyTurn,
    reset,
    deployUnit
};

export default gameService;
