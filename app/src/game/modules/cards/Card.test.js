import React from 'react';
import { render } from '@testing-library/react';
import Card from '../cards/Card';
import {CARDS} from '../../constants/cards';

describe('Card', () => {
    const selectedCard = CARDS[0];

    test('renders card', () => {
        const props = {
            card: selectedCard,
            mana: Infinity
        };

        const { getByTestId } = render(<Card {...props} />);
        const elem = getByTestId('card');

        expect(elem).toBeInTheDocument();
    });
});
