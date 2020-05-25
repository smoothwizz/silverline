import React from 'react';
import PropTypes from 'prop-types';
import { FaSpinner } from 'react-icons/fa';

import CardSelect from './CardSelect';
import LaneSelect from './LaneSelect';
import BattleEvents from '../events/BattleEvents';

const BattlegroundPanel = ({ alert, selectedLane, selectedCard, mana, conditions, actions }) => {
    const loadingIcon = (
        <span className="loading-icon">
            <FaSpinner />
        </span>
    );

    const laneSelect = <LaneSelect selectedLane={selectedLane} action={actions.handleLaneSelect} />;
    const userMana = mana.user;

    const manaIndicator = (
        <div className={`mana-indicator${userMana === 0 ? ' mana-indicator--empty' : ''}`}>
            <span>{userMana}</span>
        </div>
    );

    const noMovesLeft = userMana === 0;

    const activeGameBar = (
        <>
            <button
                data-testid="restart-game"
                className="btn btn--primary restart-game"
                onClick={actions.resetGame}>
                Restart
            </button>
            {manaIndicator}
            {laneSelect}
            {conditions.isEnemyTurn ? (
                <div className="turn-indicator turn-indicator--enemy">
                    {!conditions.isLoading ? '' : loadingIcon}
                    Enemy Turn
                </div>
            ) : (
                <button
                    disabled={conditions.isEndTurnDisabled}
                    className={`btn btn--success ${noMovesLeft ? 'btn--jumping' : ''}`}
                    onClick={actions.endTurn}>
                    End Turn
                </button>
            )}
        </>
    );

    return (
        <div className="battleground__panel">
            {alert.text && <div className={`alert alert--${alert.type}`}>{alert.text}</div>}
            <div data-testid="game-bar" className="game-bar">
                {conditions.isGameOver && (
                    <button
                        data-testid="restart-game"
                        className="btn btn--primary"
                        onClick={actions.resetGame}>
                        Restart Game
                    </button>
                )}
                {!conditions.isGameOver && activeGameBar}
            </div>

            {!conditions.isGameOver && (
                <CardSelect
                    mana={userMana}
                    selectedCard={selectedCard}
                    selectCard={actions.handleCardSelect}
                    deployCard={actions.deployUnit}
                />
            )}

            <BattleEvents />
        </div>
    );
};
BattlegroundPanel.propTypes = {
    alert: PropTypes.object,
    selectedLane: PropTypes.object,
    selectedCard: PropTypes.object,
    events: PropTypes.array,
    mana: PropTypes.object,
    conditions: PropTypes.object,
    actions: PropTypes.object
};

export default BattlegroundPanel;
