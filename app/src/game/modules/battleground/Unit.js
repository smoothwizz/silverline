import React from 'react';
import PropTypes from 'prop-types';
import { CARDS, CARD_ICONS, MAX_CARD_HEALTH } from '../../constants/cards';
import utilsService from '../../services/utils';
import Tooltip from '../../widgets/Tooltip';

const Unit = ({ unit, team }) => {
    const unitCard = CARDS.find(card => card.id === unit.cardId);
    const unitClass = `unit unit--${team} ${unit.isAlive ? '' : 'unit--dead'}`;
    const getIcon = label => {
        if (Object.prototype.hasOwnProperty.call(CARD_ICONS, label)) {
            return CARD_ICONS[label];
        }

        return CARD_ICONS.default;
    };

    const unitLabel = (
        <div data-testid="unit-label" className="unit__icon" title={`#${unit.id} ${unitCard.label}`}>
            <Tooltip
                text={`${unit.life} HP / ${unit.attack} ATK`}
                toggleText={getIcon(unitCard.name)}
                isIconVisible={false}
                type="game"
            />
        </div>
    );

    const healthFromMaxPercent = utilsService.getPercentage(unit.life, MAX_CARD_HEALTH);
    const healthPercentage = utilsService.getPercentage(unit.life, unitCard.stats.life);
    const showStats = true; // healthPercentage < 100;
    const healthBar = showStats && (
        <div className="health-bar-container">
            <div
                data-testid="unit-health-bar"
                className="health-bar"
                style={{ width: `${healthFromMaxPercent}%` }}>
                <span className="health-percent" style={{ width: `${healthPercentage}%` }}></span>
            </div>
        </div>
    );

    return (
        <div className={unitClass}>
            {unitLabel}
            {healthBar}
        </div>
    );
};

Unit.propTypes = {
    unit: PropTypes.object,
    team: PropTypes.string
};

export default Unit;
