import { CARD_TYPES } from '../constants/cards';
import LANES from '../constants/lanes';

import eventsService from './events';
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
    let leftMana = currentState.mana.enemy,
        hasMoves = true,
        cardLaneId,
        selectedCard;

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
        return CARD_TYPES.filter(card => card.cost <= leftMana);
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

    actions.setMana(leftMana, 'enemy');
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
    const baseRow = team === 'user' ? NO_OF_ROWS : -1;
    const activeUnits = currentState.units[team].filter(unit => {
        return unit.isAlive;
    });
    let opposingUnits, isAttackingBase;

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
        opposingUnits = getTeamUnitsOnTile(opposingTeam, unit.lane, unit.row);
        if (opposingUnits.length === 0) {
            continue;
        }
        opposingUnits.map(opposingUnit => attackUnit(unit, opposingUnit, team, opposingTeam));
    }
};

const increaseMana = team => {
    const manaIncrease = 1 + parseInt(currentState.round / 3);
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
    if (currentState.gameOver) {
        return;
    }

    actions.removeDeadUnits();
    actions.moveUnits('enemy');
    fight('enemy');
    increaseMana('enemy');
    actions.incrementRound();
    eventsService.addEvent(`Round #${currentState.round}`, 'generic');

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
