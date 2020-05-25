import React from 'react';
import LaneSelect from './LaneSelect';
import { FaSpinner } from 'react-icons/fa';
import PropTypes from 'prop-types';

const GameBar = ({ selectedLane, userMana, conditions, actions }) => {
    const loadingIcon = (
        <span className="loading-icon">
            <FaSpinner />
        </span>
    );

    const laneSelect = <LaneSelect selectedLane={selectedLane} action={actions.handleLaneSelect} />;

    const manaIndicator = (
        <div className={`mana-indicator${userMana === 0 ? ' mana-indicator--empty' : ''}`}>
            <span>{userMana}</span>
        </div>
    );

    const noMovesLeft = userMana === 0;

    const activeGameBar = (
        <>
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
            <button
                data-testid="restart-game"
                className="btn btn--primary restart-game"
                onClick={actions.resetGame}>
                Restart
            </button>
        </>
    );

    return (
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
    );
};

GameBar.propTypes = {
    selectedLane: PropTypes.object,
    userMana: PropTypes.number,
    conditions: PropTypes.object,
    actions: PropTypes.object
};

export default GameBar;
