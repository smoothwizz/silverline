import React from 'react';
import { render } from '@testing-library/react';
import CardSelect from './CardSelect';
import {CARDS} from '../../constants/cards';

describe('CardSelect', () => {
    const selectedCard = CARDS[0];

    test('container renders', () => {
        const { getByTestId } = render(<CardSelect selectedCard={selectedCard} action={() => {}} />);
        const elem = getByTestId('cards-select');

        expect(elem).toBeInTheDocument();
    });
});
