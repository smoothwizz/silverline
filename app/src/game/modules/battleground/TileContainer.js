import React from 'react';
import PropTypes from 'prop-types';
import Tile from './Tile';

const TileContainer = ({ lane, row, userUnits, enemyUnits, selectedLane, action }) => {
    const tileUserUnits = userUnits.filter(
        unit => unit.isAlive && unit.row === row && unit.lane === lane
    );

    const tileEnemyUnits = enemyUnits.filter(
        unit => unit.isAlive && unit.row === row && unit.lane === lane
    );

    const isAliveUnit = unit => {
        return unit.isAlive && unit.lane === lane && unit.row === 0;
    };

    const isOwnUnitOnNextLineTile = unit => {
        return unit.isAlive && unit.lane === lane && unit.row === 1;
    };

    const isRestricted =
        row < 1 &&
        (userUnits.filter(isOwnUnitOnNextLineTile).length > 0 ||
            enemyUnits.filter(isAliveUnit).length > 0);

    return (
        <Tile
            lane={lane}
            row={row}
            selectedLane={selectedLane}
            enemyUnits={tileEnemyUnits}
            userUnits={tileUserUnits}
            isRestricted={isRestricted}
            action={action}></Tile>
    );
};

TileContainer.propTypes = {
    lane: PropTypes.number.isRequired,
    row: PropTypes.number.isRequired,
    userUnits: PropTypes.array.isRequired,
    enemyUnits: PropTypes.array.isRequired,
    selectedLane: PropTypes.object,
    action: PropTypes.func
};

export default TileContainer;
