import React from 'react';
import PropTypes from 'prop-types';
import CardStats from './CardStats';

const Card = ({ card, mana, isSelected, selectCard, deployCard }) => {
    const cardClass =
        'card' +
        (isSelected ? ' card--selected' : '') +
        (card.cost > mana ? ' card--unavailable' : '');
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
            <div data-testid="card" className={`card-title card-title--${card.faction}`}>
                <span className="text--md">{card.label}</span>
                <span className="text--sm">{card.type.toUpperCase()}</span>
            </div>
            <CardStats stats={card.stats} mana={card.cost} />
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
