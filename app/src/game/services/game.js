import CARD_TYPES from '../constants/cardTypes';
import utilsService from './utils';
import { INITIAL_MANA_PER_TURN, INITIAL_BASE_STRENGTH, LAST_ROW_INDEX } from '../constants/turn';

let events = [];

let nextId = {
    user: 0,
    cpu: 0
};

let gameState = {
    events: [],
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

/**
 * Create unit
 *
 * @param {string} type
 * @param {object} card
 *
 * @returns {object}
 */
const createUnitFromCard = (card, laneId, team) => {
    const cardRow = team === 'user' ? 0 : 4;
    const unit = {
        id: nextId[team],
        lane: laneId,
        attack: card.attack,
        defence: card.defence,
        row: cardRow,
        type: card.type
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
    const unit = createUnitFromCard(card, lane.id, 'user');

    nextId.user++;
    gameState.units.user.push(unit);

    return unit;
};

const selectCpuUnits = () => {
    let availableMana = gameState.mana.cpu;

    do {
        const cardType = utilsService.getRandomInteger(0, CARD_TYPES.length - 1);
        const cardLane = utilsService.getRandomInteger(0, 2);
        const selectedCard = CARD_TYPES[cardType];
        const unit = createUnitFromCard(selectedCard, cardLane, 'cpu');

        availableMana = availableMana - selectedCard.cost;
        nextId.cpu++;
        gameState.units.cpu.push(unit);
    } while (availableMana >= 0);
};

const moveUnits = team => {
    team = team || 'user';

    gameState.units[team] = gameState.units[team].map(unit => ({
        ...unit,
        row: team === 'user' ? unit.row + 1 : unit.row - 1
    }));
};

const removeUnit = (unitToRemove, team) => {
    let unitIndex = gameState.units[team].findIndex(
        unit => unit.row === unitToRemove.row && unit.lane === unitToRemove.lane
    );

    gameState.events.push({
        text: `DESTROYED: ${unitToRemove.type} from ${unitToRemove.lane}|${unitToRemove.row} for ${team}`
    });
    gameState.units[team].splice(unitIndex, 1);
};

const fight = () => {
    let cpuUnitIndex, cpuUnit, hasEnemyOnSameTile;
    const cpuUnitsAttackingUserBase = gameState.units.cpu.filter(unit => unit.row === -1);
    cpuUnitsAttackingUserBase.forEach(unit => {
        gameState.baseStrength.user = gameState.baseStrength.user - unit.attack;
        removeUnit(unit, 'cpu');
    });

    gameState.units.user.forEach(userUnit => {
        if (userUnit.row === LAST_ROW_INDEX + 1) {
            gameState.baseStrength.cpu--;
            removeUnit(userUnit, 'user');
        }

        cpuUnitIndex = gameState.units.cpu.findIndex(
            cpuUnit => cpuUnit.row === userUnit.row && cpuUnit.lane === userUnit.lane
        );

        hasEnemyOnSameTile = cpuUnitIndex > -1;

        if (!hasEnemyOnSameTile) {
            return;
        }

        cpuUnit = gameState.units.cpu[cpuUnitIndex];
        userUnit.defence -= cpuUnit.attack;
        cpuUnit.defence -= userUnit.attack;

        if (userUnit.defence < 0) {
            removeUnit(userUnit, 'user');
        }

        if (cpuUnit.defence < 0) {
            removeUnit(cpuUnit, 'cpu');
        }
    });
};

/**
 * Play turn
 *
 * @param {number} lane
 * @param {object} card
 *
 * @returns {object} event
 */
const playTurn = () => {
    selectCpuUnits();
    moveUnits('cpu');
    moveUnits('user');
    console.log('user:' + JSON.stringify(gameState.units.user.map(unit => `${unit.lane}, ${unit.row}`)));
    console.log('cpu:' + JSON.stringify(gameState.units.cpu.map(unit => `${unit.lane}, ${unit.row}`)));
    fight();

    gameState.mana.user++;
    gameState.mana.cpu++;

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

const gameService = {
    getUnits,
    getEvents,
    getDefaultCard,
    createUnitFromCard,
    playTurn,
    deployUnit
};

export default gameService;
