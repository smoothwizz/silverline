import React, { useState } from 'react';
import { CARDS } from '../../constants/cards';
import Card from '../cards/Card';
import CardSearchBar from '../cards/CardSearchBar';

const CardsShowcase = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const getCard = card => {
        return <Card key={card.id} card={card} mana={Infinity}></Card>;
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
            card.type.toLowerCase().indexOf(term) > -1
        );
    };

    return (
        <>
            <h2>All Cards</h2>
            <div data-testid="cards-list" className="cards-with-search">
                <CardSearchBar term={searchTerm} action={handleSearchChange} />
                <div className="cards-showcase">
                    {CARDS.filter(filterBySearchTerm)
                        .sort((a, b) => a.cost - b.cost)
                        .map(card => getCard(card))}
                </div>
            </div>
        </>
    );
};

export default CardsShowcase;
