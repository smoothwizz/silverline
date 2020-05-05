import React from 'react';
import { render } from '@testing-library/react';
import gameService from '../services/game';
import CARD_TYPES from '../constants/cardTypes';

import Unit from './Unit';

describe('Unit:', () => {
    const unitMock = gameService.createUnitFromCard(CARD_TYPES[0], 0, 'user');
    test('renders learn react link', () => {
        const { container } = render(<Unit unit={unitMock} team="user" />);
        const elem = container.querySelector('[data-test-id="unit-label"]');

        expect(elem).toBeInTheDocument();
    });

    test('show life bar if card lost stats', () => {
        let unitWithLostStats = {
            ...unitMock,
            defence: unitMock.defence - 1
        };
        const { container } = render(<Unit unit={unitWithLostStats} team="user" />);
        const elem = container.querySelector('[data-test-id="unit-life-bar"]');

        expect(elem).toBeInTheDocument();
    });
});
