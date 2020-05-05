import React from 'react';
import PropTypes from 'prop-types';
import CARD_TYPES from '../constants/cardTypes';

const CardSelect = ({ selectedCard, action }) => {
    return (
        <select data-test-id="card-select" value={selectedCard.id} onChange={action}>
            {CARD_TYPES.map(card => (
                <option key={card.id} value={card.id}>
                    {card.label}
                </option>
            ))}
        </select>
    );
};

CardSelect.propTypes = {
    selectedCard: PropTypes.object,
    action: PropTypes.func
};

export default CardSelect;
