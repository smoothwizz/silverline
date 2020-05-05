import React from 'react';
import PropTypes from 'prop-types';
import LANES from '../constants/lanes';
import { NO_OF_ROWS } from '../constants/turn';

const BattlegroundField = ({ baseStrength, cpuUnits, userUnits, isGameOver }) => {
    const createField = () => {
        let field = [];

        for (let i = 0; i < NO_OF_ROWS; i++) {
            for (let j = 0; j < LANES.length; j++) {
                field.push(getTile(j, i));
            }
        }

        return field;
    };

    const getTile = (lane, row) => {
        const userUnit = userUnits.find(unit => {
            return unit.lane === lane && unit.row === row;
        });

        const cpuUnit = cpuUnits.find(unit => {
            return unit.lane === lane && unit.row === row;
        });

        const tileId = `tile-${lane}${row}`;
        const getUnitText = unit => {
            return `${unit.id} ${unit.type} A:${unit.attack} D:${unit.defence}`;
        };

        return (
            <div key={tileId} className="tile" data-test-id={tileId}>
                {userUnit && (
                    <span className={`unit unit--user ${userUnit.isAlive ? '' : 'unit--dead'}`}>
                        {userUnit.isAlive && getUnitText(userUnit)}
                    </span>
                )}
                {cpuUnit && (
                    <span className={`unit unit--cpu ${cpuUnit.isAlive ? '' : 'unit--dead'}`}>
                        {cpuUnit.isAlive && getUnitText(cpuUnit)}
                    </span>
                )}
            </div>
        );
    };

    return (
        <div className="battleground__field">
            {isGameOver ? (
                <div>
                    <h1>
                        {baseStrength.user <= 0 && 'CPU WINS'}
                        {baseStrength.cpu <= 0 && 'USER WINS'}
                    </h1>
                    Destroyed Field
                </div>
            ) : (
                <>
                    <h2 data-test-id="base-strength-user">
                        USER {baseStrength.user < 0 ? 0 : baseStrength.user}
                    </h2>
                    <div className="map">{createField()}</div>
                    <h2 data-test-id="base-strength-cpu">
                        CPU {baseStrength.cpu < 0 ? 0 : baseStrength.cpu}
                    </h2>
                </>
            )}
        </div>
    );
};

BattlegroundField.propTypes = {
    baseStrength: PropTypes.object,
    userUnits: PropTypes.array,
    cpuUnits: PropTypes.array,
    isGameOver: PropTypes.bool
};

export default BattlegroundField;
