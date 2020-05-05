import React from 'react';
import PropTypes from 'prop-types';
import { FaSpinner } from 'react-icons/fa';
import LANES from '../constants/lanes';
import CardSelect from './CardSelect';

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
            {conditions.isEnemyTurn ? 'Enemy' : 'User'} Turn
        </div>
    );

    const manaIndicator = (
        <div className={`mana-indicator${mana === 0 ? ' mana-indicator--empty' : ''}`}>
            <span>{mana}</span>
        </div>
    );

    const activeGameBar = (
        <>
            {turnIndicator}
            {manaIndicator}
            <select value={selectedLane.value} onChange={actions.handleLaneSelect}>
                {LANES.map(lane => (
                    <option key={lane.id} value={lane.value}>
                        {lane.label}
                    </option>
                ))}
            </select>
            <button
                disabled={conditions.isDeployUnitDisabled}
                className="btn btn--primary"
                onClick={actions.deployUnit}>
                Deploy Unit
            </button>
            <button
                disabled={conditions.isEndTurnDisabled}
                className="btn btn--primary"
                onClick={actions.endTurn}>
                End Turn
            </button>
        </>
    );

    return (
        <div className="battleground__panel">
            <h1> Battleground </h1>
            {alert.text && <div className={`alert alert--${alert.type}`}>{alert.text}</div>}
            {!conditions.isGameOver && (
                <CardSelect mana={mana} selectedCard={selectedCard} action={actions.handleCardSelect} />
            )}
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
            <div className="events-list">
                {events
                    .sort((a, b) => a.id - b.id)
                    .map(event => {
                        return <span key={event.id}>{event.text}</span>;
                    })}
            </div>
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
