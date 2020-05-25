import React from 'react';
import PropTypes from 'prop-types';

import CardSelect from './CardSelect';
import BattleEvents from '../events/BattleEvents';
import GameBar from './GameBar';

const BattlegroundPanel = ({ alert, selectedLane, selectedCard, mana, conditions, actions }) => {
    const userMana = mana.user;

    return (
        <div className="battleground__panel">
            {alert.text && <div className={`alert alert--${alert.type}`}>{alert.text}</div>}

            <GameBar
                selectedLane={selectedLane}
                userMana={userMana}
                conditions={conditions}
                actions={actions}>
            </GameBar>

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
