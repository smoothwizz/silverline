import React from 'react';
import PropTypes from 'prop-types';
import { GiBroadsword, GiStandingPotion, GiRunningNinja } from 'react-icons/gi';
import { BsFillShieldFill } from 'react-icons/bs';

const CardStats = ({ stats, mana }) => {
    return (
        <div className="stats">
            <div className="stat">
                <span className="stat__label">
                    <GiBroadsword />
                    Attack
                </span>
                <span className="stat__value" data-testid="stat-attack">
                    <span>{stats.attack}</span>
                </span>
            </div>
            <div className="stat">
                <span className="stat__label">
                    <BsFillShieldFill />
                    Life
                </span>
                <span className="stat__value" data-testid="stat-life">
                    <span>{stats.life}</span>
                </span>
            </div>
            <div className="stat">
                <span className="stat__label">
                    <GiRunningNinja />
                    Pace
                </span>
                <span className="stat__value" data-testid="stat-pace">
                    <span>{stats.pace}</span>
                </span>
            </div>
            <div className="stat stat--mana">
                <span className="stat__label">
                    <GiStandingPotion />
                    Mana
                </span>
                <span className="stat__value" data-testid="stat-mana">
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
