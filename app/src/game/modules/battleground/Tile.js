import React from 'react';
import PropTypes from 'prop-types';
import Unit from './Unit';

const Tile = ({
    lane,
    row,
    isTileLaneSelected,
    isSelectedForDeploy,
    enemyUnits,
    userUnits,
    isRestricted,
    action
}) => {
    const tileId = `tile-${lane}${row}`;
    const tileClass = `tile${isRestricted ? ' tile--restricted' : ''}${
        isTileLaneSelected ? ' tile--lane-selected' : ''
    }${isSelectedForDeploy ? ' tile--lane-deploy' : ''}`;

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
    isSelectedForDeploy: PropTypes.bool,
    enemyUnits: PropTypes.array,
    userUnits: PropTypes.array,
    isRestricted: PropTypes.bool,
    action: PropTypes.func
};

export default Tile;
