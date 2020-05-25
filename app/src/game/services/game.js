import { CARDS } from '../constants/cards';
import CARD_TYPES from '../constants/cardTypes';

import LANES from '../constants/lanes';

import eventsService from './events';
import utilsService from './utils';
import fightService from './fight';
import { currentState, actions } from './gameState';

import { NUMBER_OF_ROWS, LAST_ROW_INDEX } from '../constants/turn';

/**
 * Get buff units
 *
 * @returns {array}
 */
const getBuffUnits = team => {
    return currentState.units[team].filter(unit => unit.isAlive && unit.isBuffer);
};

/**
 * Apply buffs to cards
 *
 * @param {object} initialStats
 * @param {array} buffUnits
 */
const getStatsWithBuff = (initialStats, buffUnits) => {
    if (buffUnits.length === 0) {
        return initialStats;
    }

    const lifeIncrease = buffUnits.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.life;
    }, 0);

    const attackIncrease = buffUnits.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.attack;
    }, 0);

    const updatedStats = {
        ...initialStats,
        attack: initialStats.attack + attackIncrease,
        life: initialStats.life + lifeIncrease
    };

    return updatedStats;
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
    const isBuffer = card.type === CARD_TYPES.buffer;
    let cardStats = utilsService.copyObject(card.stats);
    const buffUnits = getBuffUnits(team);

    if (buffUnits.length > 0) {
        cardStats = getStatsWithBuff(cardStats, buffUnits);
    }

    const unit = {
        lane: laneId,
        attack: cardStats.attack,
        life: cardStats.life,
        pace: cardStats.pace,
        row: cardRow,
        cardId: card.id,
        isAlive: true,
        isBuffer: isBuffer
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

/**
 * Get Most Dangerous unit
 *
 * @param {string} team
 * @param {number} lane
 * @param {number} row
 *
 * @returns {object | false}
 */
const getMostDangerousUnit = (team, lane, row) => {
    const opposingUnits = getTeamUnitsOnTile(team, lane, row);
    if (opposingUnits.length === 0) {
        return false;
    }

    return opposingUnits.reduce((prev, current) => (prev.attack > current.attack ? prev : current));
};

const selectEnemyUnits = () => {
    let leftMana = currentState.mana.enemy,
        hasMoves = true,
        cardLaneId,
        selectedCard;

    console.log(leftMana);
    /**
     * Get available lanes
     *
     * @returns {array}
     */
    const getAvailableLanes = () => {
        return LANES.slice(0).filter(lane => {
            const unitExistsOnLane =
                getTeamUnitsOnTile('user', lane.id, LAST_ROW_INDEX).length > 0 ||
                getTeamUnitsOnTile('enemy', lane.id, LAST_ROW_INDEX).length > 0 ||
                getTeamUnitsOnTile('enemy', lane.id, LAST_ROW_INDEX - 1).length > 0;

            return unitExistsOnLane ? false : true;
        });
    };

    /**
     * Get available cards to select
     *
     * @returns {array}
     */

    const getAvailableCards = () => {
        return CARDS.filter(card => card.cost <= leftMana);
    };

    /**
     * Get available lane id
     */
    const getAvailableLaneId = () => {
        const availableLanes = getAvailableLanes();

        if (availableLanes.length === 0) {
            return false;
        }

        let laneIndex = utilsService.getRandomInteger(0, availableLanes.length - 1);

        return availableLanes[laneIndex].id;
    };

    /**
     * Get available card
     *
     * @returns {object}
     */
    const getAvailableCard = () => {
        const availableCards = getAvailableCards();

        if (availableCards.length === 0) {
            return false;
        }

        const cardIndex = utilsService.getRandomInteger(0, availableCards.length - 1);

        return availableCards[cardIndex];
    };

    do {
        cardLaneId = getAvailableLaneId();
        selectedCard = getAvailableCard();

        if (!selectedCard || !cardLaneId) {
            hasMoves = false;

            return;
        }

        leftMana -= selectedCard.cost;
        const unit = createUnitFromCard(selectedCard, cardLaneId, 'enemy');
        actions.addUnit(unit, 'enemy');
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
    const unitCard = CARDS.find(card => card.id === unit.cardId),
        opposingTeamLabel = opposingTeam === 'user' ? 'Your' : 'Enemy',
        lifeLeft = currentState.baseStrength[opposingTeam] - unit.attack;

    actions.setBaseStrength(lifeLeft, opposingTeam);
    isBaseDestroyed = currentState.baseStrength[opposingTeam] <= 0;
    text = `(${LANES[unit.lane].label}) ${unitCard.label} (#${unit.id})
            ${isBaseDestroyed ? 'destroyed' : 'attacked'}
            ${opposingTeamLabel} base. ${isBaseDestroyed ? '' : `-${unit.attack} HP`}`;

    actions.markUnitAsDead(unit, team);
    eventsService.addEvent(text, 'fight');
    if (isBaseDestroyed) {
        eventsService.addEvent(`Game over. ${opposingTeamLabel} team lost.`, 'generic');
    }

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
    const unitCard = CARDS.find(card => card.id === unit.cardId);
    const opposingCard = CARDS.find(card => card.id === opposingUnit.cardId);
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

    eventsService.addEvent(text, 'fight', log);
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
    const baseRow = team === 'user' ? NUMBER_OF_ROWS : -1;
    const activeUnits = currentState.units[team].filter(unit => {
        return unit.isAlive;
    });
    let isAttackingBase;

    for (let i = 0, len = activeUnits.length; i < len; i++) {
        const unit = activeUnits[i];

        if (currentState.gameOver) {
            break;
        }

        isAttackingBase = team === 'user' ? unit.row >= baseRow : unit.row <= baseRow;
        if (isAttackingBase) {
            attackBase(unit, team, opposingTeam);

            continue;
        }

        const opposingUnit = getMostDangerousUnit(opposingTeam, unit.lane, unit.row);
        if (!opposingUnit) {
            continue;
        }

        attackUnit(unit, opposingUnit, team, opposingTeam);
    }
};

const increaseMana = team => {
    const manaIncrease = 1;
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
    eventsService.addEvent('Your units have moved.', 'game');
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
    if (currentState.gameOver) {
        return currentState;
    }

    actions.removeDeadUnits();
    actions.moveUnits('enemy');
    eventsService.addEvent('Enemy units have moved.', 'game');

    fight('enemy');
    increaseMana('enemy');
    actions.incrementRound();
    eventsService.addEvent(`Round #${currentState.round} ended.`, 'generic');

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
    return CARDS[0];
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
 * Get Mana
 *
 * @returns {object}
 */
const getMana = () => {
    return currentState.mana;
};

/**
 * Reset game state
 */
const reset = () => {
    actions.resetState();
};

const gameService = {
    getUnits,
    getMana,
    getDefaultCard,
    getGameOverState,
    createUnitFromCard,
    playUserTurn,
    playEnemyTurn,
    reset,
    deployUnit
};

export default gameService;
