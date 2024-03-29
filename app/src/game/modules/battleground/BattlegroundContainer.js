import React, { useState } from 'react';

import {
    ENEMY_TURN_DURATION,
    INITIAL_MANA_PER_TURN,
    INITIAL_BASE_STRENGTH
} from '../../constants/turn';
import LANES from '../../constants/lanes';
import gameService from '../../services/game';
import Battleground from './Battleground';
import utilsService from '../../services/utils';
import eventsService from '../../services/events';

const ANIMATION_DURATION = 1200;
const defaultBaseStrength = {
    user: INITIAL_BASE_STRENGTH,
    enemy: INITIAL_BASE_STRENGTH
};
const defaultMana = {
    user: INITIAL_MANA_PER_TURN,
    enemy: INITIAL_MANA_PER_TURN
};
const BattlegroundContainer = () => {
    const [userUnits, setUserUnits] = useState(
            utilsService.copyObject(gameService.getUnits('user'))
        ),
        [enemyUnits, setEnemyUnits] = useState(
            utilsService.copyObject(gameService.getUnits('enemy'))
        ),
        [isGameOver, setGameOver] = useState(gameService.getGameOverState()),
        [isLoading, setIsLoading] = useState(false),
        [isCardSelectMode, setCardSelectMode] = useState(false),
        [isEnemyTurn, setIsEnemyTurn] = useState(false),
        [alert, setAlert] = useState({
            text: '',
            type: 'success'
        }),
        [mana, setMana] = useState(utilsService.copyObject(defaultMana)),
        [selectedLane, setLane] = useState(null),
        [selectedCard, setCard] = useState(null),
        [baseStrength, setBaseStrength] = useState(utilsService.copyObject(defaultBaseStrength));

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
     * Minimize the card select dialog
     */
    const minimizeCardSelection = () => {
        setCardSelectMode(false);
    };

    /**
     * Validate card add
     *
     * @param {object} card
     *
     * @returns boolean
     */
    const isAddValid = card => {
        const isManaEnough = mana.user - card.cost >= 0;
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

    /**
     * Deploy a card on the lane
     *
     * @param {object} card
     */
    const deployUnit = cardToDeploy => {
        if (!isAddValid(cardToDeploy)) {
            return;
        }
        const addedUnit = gameService.deployUnit(selectedLane, cardToDeploy);
        const leftMana = mana.user - cardToDeploy.cost;

        setCard(cardToDeploy);
        setMana(prevMana => ({
            ...prevMana,
            user: leftMana
        }));

        if (leftMana <= 0) {
            setCardSelectMode(false);
        }

        setUserUnits(userUnits.concat(addedUnit));
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
        setCard(null);
        setLane(null);
        setCardSelectMode(false);
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
        setTimeout(() => {
            setIsEnemyTurn(false);
            setIsLoading(false);

            if (!currentState.isGameOver) {
                showAlert(
                    `Your mana increased. You now have ${currentState.mana.user} mana.`,
                    'info'
                );
                setMana(currentState.mana);
            }
        }, ANIMATION_DURATION);
    };

    /**
     * Reset Game State
     */
    const resetGame = () => {
        eventsService.reset();
        gameService.reset();
        setUserUnits([]);
        setEnemyUnits([]);
        setGameOver(false);
        setIsLoading(false);
        setIsEnemyTurn(false);
        setAlert({
            text: '',
            type: 'success'
        });
        setMana(utilsService.copyObject(defaultMana));
        setLane(null);
        setCard(null);
        setBaseStrength(utilsService.copyObject(defaultBaseStrength));
    };

    const handleLaneSelect = laneId => {
        const lane = LANES.find(el => el.id === laneId);

        setLane(lane);
        if (!isCardSelectMode) {
            setCardSelectMode(true);
        }
    };

    const handleCardSelect = card => {
        if (card.stats.pace > 1 && selectedLane.id === 0) {
            showAlert('In winter, flying units have pace reduced to 1.', 'info');
        }
        setCard(card);
    };

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
        isEndTurnDisabled,
        isEnemyTurn,
        isGameOver,
        isLoading
    };

    const battleFieldProps = {
        isGameOver,
        selectedLane,
        selectedCard,
        userUnits,
        enemyUnits,
        actions: {
            selectLane: handleLaneSelect
        }
    };

    const scoreBarProps = {
        mana,
        baseStrength,
        isGameOver
    };

    const cardSelectProps = {
        mana: mana.user,
        selectedCard,
        selectCard: actions.handleCardSelect,
        deployCard: actions.deployUnit,
        isCardSelectMode,
        minimizeSelection: minimizeCardSelection
    };

    const gameBarProps = {
        selectedLane,
        userMana: mana.user,
        conditions,
        actions
    };

    return (
        <>
            {alert.text && <div className={`alert alert--${alert.type}`}>{alert.text}</div>}
            <Battleground
                battleFieldProps={battleFieldProps}
                scoreBarProps={scoreBarProps}
                gameBarProps={gameBarProps}
                cardSelectProps={cardSelectProps}
                isGameOver={conditions.isGameOver}
            />
        </>
    );
};

export default BattlegroundContainer;
