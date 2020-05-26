import React from 'react';
import PropTypes from 'prop-types';
import BattlegroundField from './BattlegroundField';
import CardSelect from './CardSelect';
import GameBar from './GameBar';
import BattleEvents from '../events/BattleEvents';

const Battleground = ({ cardSelectProps,  battleFieldProps, gameBarProps, isGameOver, isCardSelectMode }) => {
    return (
        <div className="battleground" data-testid="battleground">
            <GameBar {...gameBarProps} />
            {!isGameOver && (
                <CardSelect {...cardSelectProps}
                />
            )}
            <BattlegroundField {...battleFieldProps} />
            <BattleEvents />
        </div>
    );
};

Battleground.propTypes = {
    battleFieldProps: PropTypes.object,
    cardSelectProps: PropTypes.object,
    gameBarProps: PropTypes.object,
    isGameOver: PropTypes.bool,
    isCardSelectMode: PropTypes.bool
};

export default Battleground;
