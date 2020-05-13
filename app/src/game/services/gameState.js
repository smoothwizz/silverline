import { INITIAL_MANA_PER_TURN, INITIAL_BASE_STRENGTH } from '../constants/turn';
import utilsService from './utils';

let currentState = {
    round: 0,
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
    gameOver: false
};

const initialState = utilsService.copyObject(currentState);

let nextId = {
    user: 0,
    enemy: 0
};

/**
 * Reset game state
 */
const resetState = () => {
    currentState = initialState;
    nextId = {
        user: 0,
        enemy: 0
    };

    return;
};

/**
 * Check game over state
 *
 * @returns {boolean}
 */
const isGameOver = () => {
    return currentState.gameOver;
};

/**
 * Set game over state
 *
 * @param {boolean} isGameOver
 */
const setGameOver = isGameOver => {
    currentState.gameOver = isGameOver;
};

/**
 * Set Mana Value
 *
 * @param {number} value
 * @param {string} value
 */
const setMana = (value, team) => {
    currentState.mana[team] = value;
};

/**
 * Set units values
 *
 * @param {array} units
 */
const setUnits = (units, team) => {
    currentState.units[team] = units;
};

/**
 * Add an unit
 * =
 * @param {object} unit
 * @param {string} team
 */
const addUnit = (unit, team) => {
    currentState.units[team] = [
        ...currentState.units[team],
        {
            id: nextId[team],
            ...unit
        }
    ];

    nextId[team]++;
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

    currentState.units[team] = currentState.units[team].map(unit => {
        return getUpdatedUnit(unit);
    });
};

/**
 * Set Base strength values
 *
 * @param {number} value
 * @param {string} team
 */
const setBaseStrength = (value, team) => {
    currentState.baseStrength[team] = value;
};

/**
 * Increase the number of rounds
 */
const incrementRound = () => {
    currentState.round++;
};

/**
 * Remove dead units from the map
 */
const removeDeadUnits = () => {
    currentState.units.user = currentState.units.user.filter(unit => {
        return unit.isAlive;
    });

    currentState.units.enemy = currentState.units.enemy.filter(unit => {
        return unit.isAlive;
    });
};

/**
 * Mark unit as dead
 *
 * @param {object} unitId
 * @param {string} team
 */
const markUnitAsDead = (unit, team) => {
    currentState.units[team] = currentState.units[team].map(el =>
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
    actions.setUnits(
        currentState.units[team].map(el => (el.id === unit.id ? { ...el, life: life } : el)),
        team
    );
};

/**
 * Get unit by id
 *
 * @param {number} id
 * @param {string} team
 *
 * @returns {object | false}
 */
const getUnitById = (id, team) => {
    return currentState.units[team].find(unit => unit.id === id) || false;
};

const actions = {
    addUnit,
    getUnitById,
    incrementRound,
    isGameOver,
    markUnitAsDead,
    moveUnits,
    removeDeadUnits,
    resetState,
    setBaseStrength,
    setGameOver,
    setMana,
    setUnits,
    updateUnitLife
};

export { currentState, initialState, actions };
