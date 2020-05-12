import React, { useState } from 'react';

import {CARD_TYPES} from '../../constants/cards';
import {
    ENEMY_TURN_DURATION,
    INITIAL_MANA_PER_TURN,
    INITIAL_BASE_STRENGTH
} from '../../constants/turn';
import LANES from '../../constants/lanes';
import gameService from '../../services/game';
import Battleground from './Battleground';
import utilsService from '../../services/utils';

const ANIMATION_DURATION = 2000;
const defaultCard = CARD_TYPES[0];
const defaultLane = LANES[0];
const defaultBaseStrength = {
    user: INITIAL_BASE_STRENGTH,
    enemy: INITIAL_BASE_STRENGTH
};
const BattlegroundContainer = () => {
    const [events, setEvents] = useState([]),
        [userUnits, setUserUnits] = useState(utilsService.copyObject(gameService.getUnits('user'))),
        [enemyUnits, setEnemyUnits] = useState(utilsService.copyObject(gameService.getUnits('enemy'))),
        [isGameOver, setGameOver] = useState(gameService.getGameOverState()),
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

        let unitExistsOnLane =
            userUnits.filter(isOwnUnitOnSameTileLine).length > 0 ||
            enemyUnits.filter(isAliveUnit).length > 0;

        if (unitExistsOnLane) {
            showAlert('You can not deploy a card on that lane..', 'error');

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

        const userBaseStrength = parseInt(baseStrength.user);
        const enemyBaseStrength = parseInt(baseStrength.enemy);

        if (userBaseStrength <= 0 || enemyBaseStrength <= 0) {
            setGameOver(true);
        }

        if (userBaseStrength <= 0 && enemyBaseStrength <= 0) {
            return showAlert('Draw', 'success');
        }

        if (userBaseStrength <= 0) {
            return showAlert('You lost', 'error');
        }

        if (enemyBaseStrength <= 0) {
            return showAlert('You Win', 'success');
        }
    };

    const endTurn = () => {
        const currentState = gameService.playUserTurn();

        setIsLoading(true);
        updateBaseStrength(currentState.baseStrength);
        setUserUnits(currentState.units.user);
        setEnemyUnits(currentState.units.enemy);
        setEvents(currentState.events);
        setMana(currentState.mana.user);
        setIsEnemyTurn(true);

        setTimeout(() => {
            playEnemyTurn();
        }, ENEMY_TURN_DURATION);
    };

    const playEnemyTurn = () => {
        const currentState = gameService.playEnemyTurn();

        updateBaseStrength(currentState.baseStrength);
        setUserUnits(currentState.units.user);
        setEnemyUnits(currentState.units.enemy);
        setEvents(currentState.events);

        setTimeout(() => {
            setIsEnemyTurn(false);
            setIsLoading(false);
        }, ANIMATION_DURATION);
    };

    /**
     * Reset Game State
     */
    const resetGame = () => {
        gameService.reset();
        setEvents([]);
        setUserUnits([]);
        setEnemyUnits([]);
        setGameOver(false);
        setIsLoading(false);
        setIsEnemyTurn(false);
        setAlert({
            text: '',
            type: 'success'
        });
        setMana(INITIAL_MANA_PER_TURN);
        setLane(defaultLane);
        setCard(defaultCard);
        setBaseStrength(defaultBaseStrength);
    };

    const handleLaneSelect = lane => {
        setLane(lane);
    };

    const handleCardSelect = card => {
        setCard(card);
    };

    const isDeployUnitDisabled =
        isLoading || baseStrength.user < 0 || baseStrength.enemy < 0 || mana <= 0;
    const isEndTurnDisabled = isLoading || baseStrength.user < 0 || baseStrength.enemy < 0;

    const actions = {
        handleCardSelect,
        handleLaneSelect,
        deployUnit,
        endTurn,
        resetGame
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
        selectedLane,
        baseStrength,
        userUnits,
        enemyUnits
    };

    return <Battleground battlePanelProps={battlePanelProps} battleFieldProps={battleFieldProps} />;
};

export default BattlegroundContainer;
