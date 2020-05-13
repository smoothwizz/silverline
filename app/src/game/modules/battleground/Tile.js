import React from 'react';
import PropTypes from 'prop-types';
import Unit from './Unit';

const Tile = ({ lane, row, selectedLane, enemyUnits, userUnits, action }) => {
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

    const tileId = `tile-${lane}${row}`;
    const tileClass = `tile${isTileRestricted ? ' tile--restricted' : ''}${
        isTileLaneSelected ? ' tile--lane-selected' : ''
    }`;

    return (
        <div onClick={() => action(lane)} key={tileId} className={tileClass} data-testid={tileId}>
            {userUnits.map(unit => (
                <Unit key={unit.id} unit={unit} team="user" />
            ))}
            {enemyUnits.map(unit => (
                <Unit key={unit.id} unit={unit} team="enemy" />
            ))}
        </div>
    );
};

Tile.propTypes = {
    lane: PropTypes.number,
    row: PropTypes.number,
    selectedLane: PropTypes.object,
    enemyUnits: PropTypes.array,
    userUnits: PropTypes.array,
    action: PropTypes.func
};

export default Tile;
