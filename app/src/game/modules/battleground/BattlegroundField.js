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

        for (let rowIndex = 0; rowIndex < NO_OF_ROWS; rowIndex++) {
            for (let laneIndex = 0; laneIndex < LANES.length; laneIndex++) {

                const tileUserUnits = userUnits.filter(
                    unit => unit.isAlive && unit.row === rowIndex && unit.lane === laneIndex
                );

                const tileEnemyUnits = enemyUnits.filter(
                    unit => unit.isAlive && unit.row === rowIndex && unit.lane === laneIndex
                );

                field.push(
                    <Tile
                        key={`tile--${rowIndex}${laneIndex}`}
                        lane={laneIndex}
                        row={rowIndex}
                        selectedLane={selectedLane}
                        enemyUnits={tileEnemyUnits}
                        userUnits={tileUserUnits}
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
