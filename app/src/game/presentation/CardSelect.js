import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CARD_TYPES from '../constants/cardTypes';
import CardStats from './CardStats';
const CardSelect = ({ selectedCard, mana, action }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const getCard = card => {
        const cardClass =
            'card' +
            (selectedCard.id === card.id ? ' card--selected' : '') +
            (card.cost > mana ? ' card--unavailable' : '');

        return (
            <div key={card.id} className={cardClass}>
                <div className={`card-title card-title--${card.faction}`}>
                    <h3>{card.label}</h3>
                    <span className="mana-cost">costs {card.cost}mana</span>
                </div>
                <CardStats stats={card.stats} />
                <button
                    disabled={card.cost > mana}
                    className="btn btn--primary btn-card-select"
                    onClick={() => action(card.id)}>
                    Select
                </button>
            </div>
        );
    };

    const handleSearchChange = event => {
        const newTerm = event.target.value;

        setSearchTerm(newTerm);
    };

    const filterBySearchTerm = card => {
        const term = searchTerm.toLowerCase();

        if (term.length === 0) {
            return true;
        }

        return (
            card.label.toLowerCase().indexOf(term) > -1 ||
            card.faction.toLowerCase().indexOf(term) > -1
        );
    };

    return (
        <div>
            <div className="form-field">
                <input
                    className="input"
                    placeholder="Search for cards"
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
            <div data-test-id="card-select" className="card-select">
                {CARD_TYPES.filter(filterBySearchTerm)
                    .sort((a, b) => a.cost - b.cost)
                    .map(card => getCard(card))}
            </div>
        </div>
    );
};

CardSelect.propTypes = {
    selectedCard: PropTypes.object,
    mana: PropTypes.number,
    action: PropTypes.func
};

export default CardSelect;
