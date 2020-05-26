import React from 'react';
import PropTypes from 'prop-types';
import LANES from '../../constants/lanes';

const LaneSelect = ({ selectedLane, action }) => {
    const selectedLaneId = selectedLane ? selectedLane.id : null;
    const getLane = lane => {
        const laneClass =
            'lane' +
            ` ${selectedLaneId === lane.id ? 'lane--selected' : ''}` +
            ` lane--${lane.value}`;
        return (
            <div className={laneClass} key={lane.id} onClick={() => action(lane.id)}>
                {lane.label}
            </div>
        );
    };

    return (
        <div className="lane-select-container">
            <span className="label">Select a lane</span>
            <div data-testid="lane-select" className="lane-select">
                {LANES.map(lane => getLane(lane))}
            </div>
        </div>
    );
};

LaneSelect.propTypes = {
    selectedLane: PropTypes.object,
    action: PropTypes.func
};

export default LaneSelect;
