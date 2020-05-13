import React from 'react';
import PropTypes from 'prop-types';
import LANES from '../../constants/lanes';
import { NO_OF_ROWS } from '../../constants/turn';
import Tile from './Tile';
import TeamBase from './TeamBase';

const BattlegroundField = ({
    baseStrength,
    enemyUnits,
    userUnits,
    isGameOver,
    selectedLane,
    actions
}) => {
    const createField = () => {
        let field = [];

        for (let i = 0; i < NO_OF_ROWS; i++) {
            for (let j = 0; j < LANES.length; j++) {
                field.push(
                    <Tile
                        key={`tile--${i}${j}`}
                        lane={j}
                        row={i}
                        selectedLane={selectedLane}
                        enemyUnits={enemyUnits}
                        userUnits={userUnits}
                        action={actions.selectLane}></Tile>
                );
            }
        }

        return field;
    };

    return (
        <div className="battleground__field">
            <TeamBase team="user" life={baseStrength.user} isGameOver={isGameOver} />
            <div className={`map${isGameOver ? ' map--destroyed' : ''}`}>{createField()}</div>
            <TeamBase team="enemy" life={baseStrength.enemy} isGameOver={isGameOver} />
        </div>
    );
};

BattlegroundField.propTypes = {
    baseStrength: PropTypes.object,
    userUnits: PropTypes.array,
    enemyUnits: PropTypes.array,
    isGameOver: PropTypes.bool,
    selectedLane: PropTypes.object,
    actions: PropTypes.object
};

export default BattlegroundField;
