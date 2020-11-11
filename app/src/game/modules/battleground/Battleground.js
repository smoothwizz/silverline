import React from 'react';
import PropTypes from 'prop-types';
import BattlegroundField from './BattlegroundField';
import CardSelect from './CardSelect';
import GameBar from './GameBar';
import BattleEvents from '../events/BattleEvents';
import ScoreBar from './ScoreBar';

const Battleground = ({ cardSelectProps, scoreBarProps, battleFieldProps, gameBarProps, isGameOver }) => {
    return (
        <div className="battleground" data-testid="battleground">
            <GameBar {...gameBarProps} />
            <ScoreBar {...scoreBarProps} ></ScoreBar>
            <BattlegroundField {...battleFieldProps} />
            <BattleEvents />
            {!isGameOver && (
                <CardSelect {...cardSelectProps}
                />
            )}
        </div>
    );
};

Battleground.propTypes = {
    battleFieldProps: PropTypes.object,
    cardSelectProps: PropTypes.object,
    scoreBarProps: PropTypes.object,
    gameBarProps: PropTypes.object,
    isGameOver: PropTypes.bool
};

export default Battleground;
