import React from 'react';
import PropTypes from 'prop-types';

const Castle = ({ team }) => (
    <div className={`team-base__castle team-base__castle--${team}`}>
        <div className="second-floor">
            <div className="second-floor__tile">
                <div className="window"></div>
            </div>
            <div className="second-floor__tile">
                <div className="window"></div>
            </div>
            <div className="second-floor__tile">
                <div className="window"></div>
            </div>
        </div>
        <div className="first-floor">
            <div className="first-floor__tile">
                <div className="window"></div>
            </div>
            <div className="first-floor__tile">
                <div className="window"></div>
            </div>
            <div className="first-floor__tile">
                <div className="window"></div>
            </div>
        </div>
    </div>
);

Castle.propTypes = {
    team: PropTypes.string.isRequired
};

export default Castle;
