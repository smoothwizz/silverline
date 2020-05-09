import React from 'react';
import PropTypes from 'prop-types';
import LANES from '../../constants/lanes';
import { NO_OF_ROWS } from '../../constants/turn';

import Unit from './Unit';

const BattlegroundField = ({ baseStrength, cpuUnits, userUnits, isGameOver, selectedLane }) => {
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
        const isAliveUnit = unit => {
            return unit.isAlive && unit.lane === lane && unit.row === 0;
        };

        const isOwnUnitOnNextLineTile = unit => {
            return unit.isAlive && unit.lane === lane && unit.row === 1;
        };

        const isTileLaneSelected = lane === selectedLane.id;
        const isTileRestricted =
            row < 1 &&
            (userUnits.filter(isOwnUnitOnNextLineTile).length > 0 ||
                cpuUnits.filter(isAliveUnit).length > 0);

        const userUnit = userUnits.find(unit => {
            return unit.lane === lane && unit.row === row;
        });

        const cpuUnit = cpuUnits.find(unit => {
            return unit.lane === lane && unit.row === row;
        });

        const tileId = `tile-${lane}${row}`;
        const tileClass = `tile${isTileRestricted ? ' tile--restricted' : ''}${
            isTileLaneSelected ? ' tile--lane-selected' : ''
        }`;

        return (
            <div key={tileId} className={tileClass} data-testid={tileId}>
                {userUnit && <Unit unit={userUnit} team="user" />}
                {cpuUnit && <Unit unit={cpuUnit} team="cpu" />}
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
                    <div className="map map--destroyed">{createField()}</div>
                </div>
            ) : (
                <>
                    <h2 data-testid="base-strength-user">
                        USER {baseStrength.user < 0 ? 0 : baseStrength.user}
                    </h2>
                    <div className="map">{createField()}</div>
                    <h2 data-testid="base-strength-cpu">
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
    isGameOver: PropTypes.bool,
    selectedLane: PropTypes.object
};

export default BattlegroundField;
