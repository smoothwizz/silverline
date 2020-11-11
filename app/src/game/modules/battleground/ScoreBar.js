import React from 'react';
import PropTypes from 'prop-types';
import TeamBase from './TeamBase';

const ScoreBar = ({ mana, baseStrength, isGameOver }) => {
    return (
        <div data-testid="scorebar" className="scorebar">
            <TeamBase
                mana={mana.user}
                team="user"
                life={baseStrength.user}
                isGameOver={isGameOver}
            />
            <TeamBase
                mana={mana.enemy}
                team="enemy"
                life={baseStrength.enemy}
                isGameOver={isGameOver}
            />
        </div>
    );
};

ScoreBar.propTypes = {
    mana: PropTypes.object,
    baseStrength: PropTypes.object,
    isGameOver: PropTypes.bool
};

export default ScoreBar;
