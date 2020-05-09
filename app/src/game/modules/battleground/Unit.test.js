import React from 'react';
import { render } from '@testing-library/react';
import gameService from '../../services/game';
import {CARD_TYPES} from '../../constants/cards';

import Unit from './Unit';

describe('Unit:', () => {
    const unitMock = gameService.createUnitFromCard(CARD_TYPES[0], 0, 'user');
    test('renders unit label', () => {
        const { getByTestId } = render(<Unit unit={unitMock} team="user" />);
        const elem = getByTestId('unit-label');

        expect(elem).toBeInTheDocument();
    });

    test('show health bar if card lost stats', () => {
        let unitWithLostStats = {
            ...unitMock,
            life: unitMock.life - 1
        };
        const { getByTestId } = render(<Unit unit={unitWithLostStats} team="user" />);
        const elem = getByTestId('unit-health-bar');

        expect(elem).toBeInTheDocument();
    });
});
