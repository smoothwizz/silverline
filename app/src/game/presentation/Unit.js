import React from 'react';
import PropTypes from 'prop-types';
import CARD_TYPES from '../constants/cardTypes';

const Unit = ({ unit, team }) => {
    const unitCard = CARD_TYPES.find(card => card.id === unit.cardId);
    const unitClass = `unit unit--${team} ${unit.isAlive ? '' : 'unit--dead'}`;
    const unitLabel = (
        <div data-test-id="unit-label" className="unit__label">
            {unitCard.label}
        </div>
    );

    const lifePercentage = (unit.defence * 100) / unitCard.stats.defence;
    const showStats = true; // lifePercentage < 100;
    const lifeBar = showStats && (
        <div data-test-id="unit-life-bar" className="unit__life-bar">
            <span className="unit__life-percent" style={{ width: `${lifePercentage}%` }}>
            </span>
        </div>
    );
    const unitIcon = <span className="unit__icon" title={`#${unit.id}`}></span>;

    return (
        <div className={unitClass}>
            {unitLabel}
            {unitIcon}
            {lifeBar}
        </div>
    );
};

Unit.propTypes = {
    unit: PropTypes.object,
    team: PropTypes.string
};

export default Unit;
