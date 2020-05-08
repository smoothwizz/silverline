import React from 'react';
import PropTypes from 'prop-types';
import { FaSpinner } from 'react-icons/fa';

import CardSelect from './CardSelect';
import LaneSelect from './LaneSelect';
import BattleEvents from '../events/BattleEvents';

const BattlegroundPanel = ({
    alert,
    selectedLane,
    selectedCard,
    events,
    mana,
    conditions,
    actions
}) => {
    const loadingIcon = (
        <span className="loading-icon">
            <FaSpinner />
        </span>
    );

    const turnIndicator = (
        <div className={`turn-indicator ${conditions.isEnemyTurn ? 'turn-indicator--enemy' : ''}`}>
            {!conditions.isLoading ? '' : loadingIcon}
            {conditions.isEnemyTurn ? 'Enemy' : 'Your'} Turn
        </div>
    );

    const laneSelect = <LaneSelect selectedLane={selectedLane} action={actions.handleLaneSelect} />;

    const manaIndicator = (
        <div className={`mana-indicator${mana === 0 ? ' mana-indicator--empty' : ''}`}>
            <span>{mana}</span>
        </div>
    );

    const noMovesLeft = mana === 0;

    const activeGameBar = (
        <>
            {turnIndicator}
            {manaIndicator}
            {laneSelect}
            <button
                disabled={conditions.isDeployUnitDisabled}
                className="btn btn--primary"
                onClick={actions.deployUnit}>
                Deploy Unit
            </button>
            <button
                disabled={conditions.isEndTurnDisabled}
                className={`btn btn--success ${noMovesLeft ? 'btn--jumping' : ''}`}
                onClick={actions.endTurn}>
                End Turn
            </button>
            <button
                data-test-id="restart-game"
                className="btn btn--primary restart-game"
                onClick={actions.resetGame}>
                Restart
            </button>
        </>
    );

    return (
        <div className="battleground__panel">
            <h1> Battleground </h1>
            {alert.text && <div className={`alert alert--${alert.type}`}>{alert.text}</div>}
            <div data-test-id="game-bar" className="game-bar">
                {conditions.isGameOver && (
                    <button
                        data-test-id="restart-game"
                        className="btn btn--primary"
                        onClick={actions.resetGame}>
                        Restart Game
                    </button>
                )}
                {!conditions.isGameOver && activeGameBar}
            </div>

            {!conditions.isGameOver && (
                <CardSelect
                    mana={mana}
                    selectedCard={selectedCard}
                    action={actions.handleCardSelect}
                />
            )}

            {events.length > 0 && <BattleEvents events={events} />}
        </div>
    );
};
BattlegroundPanel.propTypes = {
    alert: PropTypes.object,
    selectedLane: PropTypes.object,
    selectedCard: PropTypes.object,
    events: PropTypes.array,
    mana: PropTypes.number,
    conditions: PropTypes.object,
    actions: PropTypes.object
};

export default BattlegroundPanel;
