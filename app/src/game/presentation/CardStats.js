import React from 'react';
import PropTypes from 'prop-types';
import { GiBroadsword, GiRunningNinja } from 'react-icons/gi';
import { BsFillShieldFill } from 'react-icons/bs';

const CardStats = ({ stats }) => {
    return (
        <div className="stats">
            <div className="stat">
                <span className="stat__label">
                    Attack
                    <GiBroadsword />
                </span>
                <span className="stat__value" data-test-id="stat-attack">
                    {stats.attack}
                </span>
            </div>
            <div className="stat">
                <span className="stat__label">
                    Defence
                    <BsFillShieldFill />
                </span>
                <span className="stat__value" data-test-id="stat-defence">
                    {stats.defence}
                </span>
            </div>
            <div className="stat">
                <span className="stat__label">
                    Pace
                    <GiRunningNinja />
                </span>
                <span className="stat__value" data-test-id="stat-pace">
                    {stats.pace}
                </span>
            </div>
        </div>
    );
};

CardStats.propTypes = {
    stats: PropTypes.object
};

export default CardStats;
