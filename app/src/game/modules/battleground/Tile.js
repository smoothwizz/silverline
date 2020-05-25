import React from 'react';
import PropTypes from 'prop-types';
import Unit from './Unit';

const Tile = ({
    lane,
    row,
    isTileLaneSelected,
    isFinalPosition,
    isMovePosition,
    enemyUnits,
    userUnits,
    isRestricted,
    action
}) => {
    const tileId = `tile-${lane}${row}`;
    const tileClass =
        'tile' +
        (isRestricted ? ' tile--restricted' : '') +
        (isTileLaneSelected ? ' tile--lane-selected' : '') +
        (isFinalPosition ? ' tile--final-pos' : '') +
        (isMovePosition ? ' tile--move-pos' : '');

    return (
        <div onClick={() => action(lane)} className={tileClass} data-testid={tileId}>
            {userUnits.map(unit => (
                <Unit key={`user-${unit.id}`} unit={unit} team="user" />
            ))}
            {enemyUnits.map(unit => (
                <Unit key={`enemy-${unit.id}`} unit={unit} team="enemy" />
            ))}
        </div>
    );
};

Tile.propTypes = {
    lane: PropTypes.number,
    row: PropTypes.number,
    isTileLaneSelected: PropTypes.bool,
    isFinalPosition: PropTypes.bool,
    isMovePosition: PropTypes.bool,
    enemyUnits: PropTypes.array,
    userUnits: PropTypes.array,
    isRestricted: PropTypes.bool,
    action: PropTypes.func
};

export default Tile;
