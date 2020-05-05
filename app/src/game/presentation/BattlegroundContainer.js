import React, { useState } from 'react';

import CARD_TYPES from '../constants/cardTypes';
import {
    ENEMY_TURN_DURATION,
    INITIAL_MANA_PER_TURN,
    INITIAL_BASE_STRENGTH
} from '../constants/turn';
import LANES from '../constants/lanes';

import gameService from '../services/game';
import Battleground from './Battleground';

const ANIMATION_DURATION = 2000;
const defaultCard = CARD_TYPES[0];
const defaultLane = LANES[0];
const defaultBaseStrength = {
    user: INITIAL_BASE_STRENGTH,
    cpu: INITIAL_BASE_STRENGTH
};
const BattlegroundContainer = () => {
    const [events, setEvents] = useState([]),
        [userUnits, setUserUnits] = useState([]),
        [cpuUnits, setCpuUnits] = useState([]),
        [isGameOver, setGameOver] = useState(false),
        [isLoading, setIsLoading] = useState(false),
        [isEnemyTurn, setIsEnemyTurn] = useState(false),
        [alert, setAlert] = useState({
            text: '',
            type: 'success'
        }),
        [mana, setMana] = useState(INITIAL_MANA_PER_TURN),
        [selectedLane, setLane] = useState(defaultLane),
        [selectedCard, setCard] = useState(defaultCard),
        [baseStrength, setBaseStrength] = useState(defaultBaseStrength);

    /**
     * Show an alert
     *
     * @param {string} text
     */
    const showAlert = (text, type) => {
        type = type || 'error';
        console.dir({ text, type });
        setAlert({
            text: text,
            type: type
        });

        setTimeout(() => {
            setAlert({
                text: '',
                type: 'success'
            });
        }, 2500);
    };

    /**
     * Validate card add
     *
     * @returns boolean
     */
    const isAddValid = () => {
        const isManaEnough = mana - selectedCard.cost >= 0;
        if (!isManaEnough) {
            showAlert('Not enough mana to deploy this card.');

            return false;
        }

        const isAliveUnit = unit => {
            return unit.isAlive && unit.lane === selectedLane.id && unit.row === 0;
        };

        const isOwnUnitOnSameTileLine = unit => {
            return unit.isAlive && unit.lane === selectedLane.id && unit.row <= 1;
        };

        const unitExistsOnLane =
            userUnits.filter(isOwnUnitOnSameTileLine).length > 0 ||
            cpuUnits.filter(isAliveUnit).length > 0;

        if (unitExistsOnLane) {
            showAlert('There can only be one card on each tile.');

            return false;
        }

        return true;
    };

    const deployUnit = () => {
        if (!isAddValid()) {
            return;
        }
        let updatedMana = mana - selectedCard.cost;
        let addedUnit = gameService.deployUnit(selectedLane, selectedCard);
        setUserUnits(userUnits.concat(addedUnit));
        setMana(updatedMana);
    };

    /**
     * Update Base strength
     *
     * @param {object} baseStrength
     */
    const updateBaseStrength = baseStrength => {
        setBaseStrength(baseStrength);
        console.dir(baseStrength);
        const userBaseStrength = parseInt(baseStrength.user);
        const cpuBaseStrength = parseInt(baseStrength.cpu);

        if (userBaseStrength <= 0 || cpuBaseStrength <= 0) {
            setGameOver(true);
        }

        if (userBaseStrength <= 0 && cpuBaseStrength <= 0) {
            return showAlert('Draw', 'success');
        }

        if (userBaseStrength <= 0) {
            return showAlert('You lost', 'error');
        }

        if (cpuBaseStrength <= 0) {
            return showAlert('You Win', 'success');
        }
    };

    const endTurn = () => {
        const gameState = gameService.playUserTurn();

        setIsLoading(true);
        updateBaseStrength(gameState.baseStrength);
        setUserUnits(gameState.units.user);
        setCpuUnits(gameState.units.cpu);
        setEvents(gameState.events);
        setMana(gameState.mana.user);

        setTimeout(() => {
            playEnemyTurn();
            setIsEnemyTurn(true);
        }, ENEMY_TURN_DURATION);
    };

    const playEnemyTurn = () => {
        const gameState = gameService.playEnemyTurn();

        updateBaseStrength(gameState.baseStrength);
        setUserUnits(gameState.units.user);
        setCpuUnits(gameState.units.cpu);
        setEvents(gameState.events);

        setTimeout(() => {
            setIsEnemyTurn(false);
            setIsLoading(false);
        }, ANIMATION_DURATION);
    };

    const handleLaneSelect = event => {
        const laneType = event.target.value;
        const selectedLane = LANES.find(lane => lane.value === laneType);

        setLane(selectedLane);
    };

    const handleCardSelect = event => {
        const selectedCardId = event.target.value;
        const card = CARD_TYPES.find(({ id }) => id === parseInt(selectedCardId));

        setCard(card);
    };

    const isDeployUnitDisabled =
        isLoading || baseStrength.user < 0 || baseStrength.cpu < 0 || mana <= 0;
    const isEndTurnDisabled = isLoading || baseStrength.user < 0 || baseStrength.cpu < 0;

    const actions = {
        handleCardSelect,
        handleLaneSelect,
        deployUnit,
        endTurn
    };

    const conditions = {
        isAddValid,
        isDeployUnitDisabled,
        isEndTurnDisabled,
        isEnemyTurn,
        isGameOver,
        isLoading
    };

    const battlePanelProps = {
        events,
        mana,
        selectedLane,
        selectedCard,
        alert,
        actions,
        conditions
    };

    const battleFieldProps = {
        isGameOver,
        baseStrength,
        userUnits,
        cpuUnits
    };

    return <Battleground battlePanelProps={battlePanelProps} battleFieldProps={battleFieldProps} />;
};

export default BattlegroundContainer;
