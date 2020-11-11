import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CARDS } from '../../constants/cards';
import Card from '../cards/Card';
import CardSearchBar from '../cards/CardSearchBar';
import { BsXCircle } from 'react-icons/bs';

const CardSelect = ({
    selectedCard,
    mana,
    selectCard,
    deployCard,
    isCardSelectMode,
    minimizeSelection
}) => {
    const [searchTerm, setSearchTerm] = useState('');

    const getCard = (card) => {
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

    const handleSearchChange = (event) => {
        const newTerm = event.target.value;

        setSearchTerm(newTerm);
    };

    const filterBySearchTerm = (card) => {
        const regex = new RegExp(searchTerm, 'i');

        if (searchTerm.length === 0) {
            return true;
        }

        return card.label.match(regex) || card.type.match(regex);
    };

    return (
        <div className={`cards-with-search ${isCardSelectMode ? '' : 'cards-with-search--hidden'}`}>
            <button
                className='btn btn--icon minimize-btn'
                onClick={minimizeSelection}>
                <BsXCircle />
            </button>
            <CardSearchBar term={searchTerm} action={handleSearchChange} />
            <div data-testid="cards-select" className="cards-select">
                {CARDS.filter(filterBySearchTerm)
                    .sort((a, b) => a.cost - b.cost)
                    .map((card) => getCard(card))}
            </div>
        </div>
    );
};

CardSelect.propTypes = {
    selectedCard: PropTypes.object,
    mana: PropTypes.number,
    selectCard: PropTypes.func,
    deployCard: PropTypes.func,
    isCardSelectMode: PropTypes.bool,
    minimizeSelection: PropTypes.func
};

export default CardSelect;
