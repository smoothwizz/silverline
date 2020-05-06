import React from 'react';
import PropTypes from 'prop-types';
import { GiBroadsword, GiStandingPotion, GiRunningNinja } from 'react-icons/gi';
import { BsFillShieldFill } from 'react-icons/bs';

const CardStats = ({ stats, mana }) => {
    return (
        <div className="stats">
            <div className="stat">
                <span className="stat__label">
                    Attack
                    <GiBroadsword />
                </span>
                <span className="stat__value" data-test-id="stat-attack">
                    <span>{stats.attack}</span>
                </span>
            </div>
            <div className="stat">
                <span className="stat__label">
                    Life
                    <BsFillShieldFill />
                </span>
                <span className="stat__value" data-test-id="stat-life">
                    <span>{stats.life}</span>
                </span>
            </div>
            <div className="stat">
                <span className="stat__label">
                    Pace
                    <GiRunningNinja />
                </span>
                <span className="stat__value" data-test-id="stat-pace">
                    <span>{stats.pace}</span>
                </span>
            </div>
            <div className="stat stat--mana">
                <span className="stat__label">
                    Mana
                    <GiStandingPotion />
                </span>
                <span className="stat__value" data-test-id="stat-pace">
                    <span>{mana}</span>
                </span>
            </div>
        </div>
    );
};

CardStats.propTypes = {
    stats: PropTypes.object,
    mana: PropTypes.number
};

export default CardStats;
