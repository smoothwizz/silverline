import React from 'react';
import PropTypes from 'prop-types';
import CardStats from './CardStats';

const Card = ({ card, mana, isSelected, action }) => {
    const cardClass =
        'card' +
        (isSelected ? ' card--selected' : '') +
        (card.cost > mana ? ' card--unavailable' : '');
    let containerProps;

    if (action) {
        containerProps = {
            onClick: () => action(card),
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
            <div data-testid="card" className={`card-title card-title--${card.faction}`}>
                <span className="text--md">{card.label}</span>
            </div>
            <CardStats stats={card.stats} mana={card.cost} />
            {action && (
                <button
                    disabled={card.cost > mana}
                    className="btn btn--primary btn-card-select"
                    onClick={() => action(card)}>
                    Select
                </button>
            )}
        </div>
    );
};

Card.propTypes = {
    card: PropTypes.object.isRequired,
    mana: PropTypes.number,
    isSelected: PropTypes.bool,
    action: PropTypes.func
};

export default Card;
