import React from 'react';
import { render } from '@testing-library/react';
import CardsShowcase from './CardsShowcase';

describe('CardsShowcase', () => {
    test('it renders all stats', () => {
        const { container } = render(<CardsShowcase />);
        const cardsList = container.querySelector('[data-test-id="cards-list"]');

        expect(cardsList).toBeInTheDocument();
    });
});
