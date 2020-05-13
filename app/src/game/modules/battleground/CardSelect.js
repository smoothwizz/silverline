import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CARD_TYPES } from '../../constants/cards';
import Card from '../cards/Card';
import CardSearchBar from '../cards/CardSearchBar';

const CardSelect = ({ selectedCard, mana, selectCard, deployCard }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const getCard = card => {
        const isSelected = selectedCard ? card.id === selectedCard.id : false;

        return (
            <Card
                key={card.id}
                card={card}
                mana={mana}
                isSelected={isSelected}
                selectCard={selectCard}
                deployCard={deployCard}></Card>
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
            card.type.toLowerCase().indexOf(term) > -1 ||
            card.faction.toLowerCase().indexOf(term) > -1
        );
    };

    return (
        <div className="cards-with-search">
            <CardSearchBar term={searchTerm} action={handleSearchChange} />
            <div data-testid="cards-select" className="cards-select">
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
    selectCard: PropTypes.func,
    deployCard: PropTypes.func
};

export default CardSelect;
