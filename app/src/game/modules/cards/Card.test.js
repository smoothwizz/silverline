import React from 'react';
import { render } from '@testing-library/react';
import Card from '../cards/Card';
import {CARD_TYPES} from '../../constants/cards';

describe('Card', () => {
    const selectedCard = CARD_TYPES[0];

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
