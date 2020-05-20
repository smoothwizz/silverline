import React from 'react';
import PropTypes from 'prop-types';
import LANES from '../../constants/lanes';
import { NUMBER_OF_ROWS } from '../../constants/turn';
import TeamBase from './TeamBase';
import TileContainer from './TileContainer';

const BattlegroundField = ({
    enemyUnits,
    userUnits,
    selectedLane,
    selectedCard,
    baseStrength,
    isGameOver,
    actions
}) => {
    const createField = () => {
        let field = [];

        for (let rowIndex = 0; rowIndex < NUMBER_OF_ROWS; rowIndex++) {
            for (let laneIndex = 0; laneIndex < LANES.length; laneIndex++) {
                field.push(
                    <TileContainer
                        key={`tile--${rowIndex}${laneIndex}`}
                        lane={laneIndex}
                        row={rowIndex}
                        selectedCard={selectedCard}
                        selectedLane={selectedLane}
                        enemyUnits={enemyUnits}
                        userUnits={userUnits}
                        action={actions.selectLane}></TileContainer>
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
    selectedCard: PropTypes.object,
    selectedLane: PropTypes.object,
    actions: PropTypes.object
};

export default BattlegroundField;
