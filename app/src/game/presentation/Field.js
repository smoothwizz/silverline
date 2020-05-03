import React from 'react';
import PropTypes from 'prop-types';

const Field = ({ userUnits, cpuUnits }) => {
    const getTile = (lane, row) => {
        const userUnit = userUnits.find(unit => {
            return unit.lane === lane && unit.row === row;
        });

        const cpuUnit = cpuUnits.find(unit => {
            return unit.lane === lane && unit.row === row;
        });

        return (
            <div className="tile" data-test-id={`tile-${lane}${row}`}>
                {userUnit && <span className="unit unit--user">{userUnit.type}</span>}
                {cpuUnit && <span className="unit unit--cpu">{cpuUnit.type}</span>}
            </div>
        );
    };

    return (
        <div className="map">
            {getTile(0, 0)}
            {getTile(1, 0)}
            {getTile(2, 0)}

            {getTile(0, 1)}
            {getTile(1, 1)}
            {getTile(2, 1)}

            {getTile(0, 2)}
            {getTile(1, 2)}
            {getTile(2, 2)}

            {getTile(0, 3)}
            {getTile(1, 3)}
            {getTile(2, 3)}

            {getTile(0, 4)}
            {getTile(1, 4)}
            {getTile(2, 4)}
        </div>
    );
};

Field.propTypes = {
    userUnits: PropTypes.array,
    cpuUnits: PropTypes.array
};

export default Field;
