import React from 'react';
import { render } from '@testing-library/react';
import CardSelect from './CardSelect';
import {CARD_TYPES} from '../constants/cards';

describe('CardSelect', () => {
    const selectedCard = CARD_TYPES[0];

    test('container renders', () => {
        const { container } = render(<CardSelect selectedCard={selectedCard} action={() => {}} />);
        const elem = container.querySelector('[data-test-id="cards-select"]');

        expect(elem).toBeInTheDocument();
    });
});
