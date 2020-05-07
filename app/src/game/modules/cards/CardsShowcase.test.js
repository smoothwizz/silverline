import React from 'react';
import { render } from '@testing-library/react';
import CardsShowcase from '../cards/CardsShowcase';

describe('CardsShowcase', () => {
    test('it renders the cards-list', () => {
        const { container } = render(<CardsShowcase />);
        const cardsList = container.querySelector('[data-test-id="cards-list"]');

        expect(cardsList).toBeInTheDocument();
    });
});
