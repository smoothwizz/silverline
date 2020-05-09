import React from 'react';
import PropTypes from 'prop-types';
import Unit from './Unit';

const Tile = ({ lane, row, selectedLane, enemyUnits, userUnits }) => {
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
            enemyUnits.filter(isAliveUnit).length > 0);

    const userUnit = userUnits.find(unit => {
        return unit.lane === lane && unit.row === row;
    });

    const enemyUnit = enemyUnits.find(unit => {
        return unit.lane === lane && unit.row === row;
    });

    const tileId = `tile-${lane}${row}`;
    const tileClass = `tile${isTileRestricted ? ' tile--restricted' : ''}${
        isTileLaneSelected ? ' tile--lane-selected' : ''
    }`;

    return (
        <div key={tileId} className={tileClass} data-testid={tileId}>
            {userUnit && <Unit unit={userUnit} team="user" />}
            {enemyUnit && <Unit unit={enemyUnit} team="enemy" />}
        </div>
    );
};

Tile.propTypes = {
    lane: PropTypes.number,
    row: PropTypes.number,
    selectedLane: PropTypes.object,
    enemyUnits: PropTypes.array,
    userUnits: PropTypes.array
};

export default Tile;
