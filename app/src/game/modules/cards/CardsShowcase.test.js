import React from 'react';
import { render } from '@testing-library/react';
import CardsShowcase from '../cards/CardsShowcase';

describe('CardsShowcase', () => {
    test('it renders the cards-list', () => {
        const { getByTestId } = render(<CardsShowcase />);
        const cardsList = getByTestId('cards-list');

        expect(cardsList).toBeInTheDocument();
    });
});
