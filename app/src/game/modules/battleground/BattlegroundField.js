import React from 'react';
import PropTypes from 'prop-types';
import LANES from '../../constants/lanes';
import { NUMBER_OF_ROWS } from '../../constants/turn';
import TileContainer from './TileContainer';

const BattlegroundField = ({
    enemyUnits,
    userUnits,
    selectedLane,
    selectedCard,
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
        <div data-testid="battleground-field" className="battleground__field">
            <div className={`map${isGameOver ? ' map--destroyed' : ''}`}>{createField()}</div>
        </div>
    );
};

BattlegroundField.propTypes = {
    mana: PropTypes.object,
    baseStrength: PropTypes.object,
    userUnits: PropTypes.array,
    enemyUnits: PropTypes.array,
    isGameOver: PropTypes.bool,
    selectedCard: PropTypes.object,
    selectedLane: PropTypes.object,
    actions: PropTypes.object
};

export default BattlegroundField;
