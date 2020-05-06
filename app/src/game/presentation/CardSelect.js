import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CARD_TYPES } from '../constants/cards';
import Card from './Card';

const CardSelect = ({ selectedCard, mana, action }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const getCard = card => {
        const isSelected = card.id === selectedCard.id;

        return (
            <Card
                key={card.id}
                card={card}
                mana={mana}
                isSelected={isSelected}
                action={action}></Card>
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
        <div className="cards-with-search">
            <div className="form-field">
                <input
                    className="input"
                    placeholder="Search for cards"
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
            <div data-test-id="cards-select" className="cards-select">
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
