import React from 'react';
import PropTypes from 'prop-types';
import CARD_TYPES from '../../constants/cardTypes';
import { GiBroadsword, GiStandingPotion, GiRunningNinja } from 'react-icons/gi';
import { BsFillShieldFill } from 'react-icons/bs';

const CardStats = ({ cardType, stats, mana }) => {
    const getStatAdded = () => {
        var statAddedText = '';

        if (stats.attack > 0) {
            statAddedText = ` +${stats.attack} attack `;
        }

        if (stats.life > 0) {
            statAddedText = ` +${stats.life} life `;
        }

        if (stats.pace > 0) {
            statAddedText = ` +${stats.pace} pace `;
        }

        return statAddedText;
    };

    return (
        <>
            <div className="stats">
                {cardType !== CARD_TYPES.buffer && (
                    <>
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
                    </>
                )}
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

            {cardType === CARD_TYPES.buffer && (
                <p className="stats-placeholder">
                    This cards adds {getStatAdded()} to the next cards deployed.
                </p>
            )}
        </>
    );
};

CardStats.propTypes = {
    cardType: PropTypes.string,
    stats: PropTypes.object,
    mana: PropTypes.number
};

export default CardStats;
