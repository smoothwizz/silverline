import React from 'react';
import PropTypes from 'prop-types';
import Tile from './Tile';

const TileContainer = ({
    lane,
    row,
    userUnits,
    enemyUnits,
    selectedLane,
    selectedCard,
    action
}) => {
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
    const isTileLaneSelected = lane === selectedLane.id;
    const isLaneRestricted =
        userUnits.filter(isOwnUnitOnNextLineTile).length > 0 ||
        enemyUnits.filter(isAliveUnit).length > 0;

    const isSelectedForDeploy =
        !isLaneRestricted &&
        Math.floor(selectedCard.stats.pace) === row &&
        lane === selectedLane.id;
    const isTileRestricted = row < 1 && isLaneRestricted;

    return (
        <Tile
            lane={lane}
            row={row}
            isTileLaneSelected={isTileLaneSelected}
            isSelectedForDeploy={isSelectedForDeploy}
            enemyUnits={tileEnemyUnits}
            userUnits={tileUserUnits}
            isRestricted={isTileRestricted}
            action={action}></Tile>
    );
};

TileContainer.propTypes = {
    lane: PropTypes.number.isRequired,
    row: PropTypes.number.isRequired,
    userUnits: PropTypes.array.isRequired,
    enemyUnits: PropTypes.array.isRequired,
    selectedLane: PropTypes.object,
    selectedCard: PropTypes.object,
    action: PropTypes.func
};

export default TileContainer;
