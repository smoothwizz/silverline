import React from 'react';
import PropTypes from 'prop-types';
import CardStats from './CardStats';
import { CARD_ICONS } from '../../constants/cards';

const Card = ({ card, mana, isSelected, selectCard, deployCard }) => {
    const cardClass =
        'card' +
        (isSelected ? ' card--selected' : '') +
        (card.cost > mana ? ' card--unavailable' : '');
    const getIcon = label => {
        if (Object.prototype.hasOwnProperty.call(CARD_ICONS, label)) {
            return CARD_ICONS[label];
        }

        return CARD_ICONS.default;
    };
    let containerProps;

    if (selectCard) {
        containerProps = {
            onClick: () => selectCard(card),
            key: card.id,
            className: cardClass
        };
    } else {
        containerProps = {
            key: card.id,
            className: cardClass
        };
    }

    return (
        <div {...containerProps}>
            <div data-testid="card" className="card-title">
                <span className="text--md">
                    {card.label}
                    <i>{getIcon(card.name)}</i>
                </span>
                <span className="text--xs">{card.type.toUpperCase()}</span>
            </div>
            <CardStats cardType={card.type} stats={card.stats} mana={card.cost} />
           
            {deployCard && (
                <button
                    disabled={card.cost > mana}
                    className="btn btn--primary btn-card-select"
                    onClick={() => deployCard(card)}>
                    Deploy
                </button>
            )}
        </div>
    );
};

Card.propTypes = {
    card: PropTypes.object.isRequired,
    mana: PropTypes.number,
    isSelected: PropTypes.bool,
    selectCard: PropTypes.func,
    deployCard: PropTypes.func
};

export default Card;
