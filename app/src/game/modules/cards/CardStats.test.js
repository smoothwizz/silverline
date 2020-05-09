import React from 'react';
import { render } from '@testing-library/react';
import CardStats from './CardStats';

describe('CardStats', () => {
    const mockStats = {
        attack: 1,
        life: 1,
        pace: 1
    }

    test('it renders all stats', () => {
        const { getByTestId } = render(<CardStats stats={mockStats} />);
        const statAttack = getByTestId('stat-attack');
        const statLife = getByTestId('stat-life');
        const statPace = getByTestId('stat-pace');
        const statMana = getByTestId('stat-mana');

        expect(statAttack).toBeInTheDocument();
        expect(statLife).toBeInTheDocument();
        expect(statPace).toBeInTheDocument();
        expect(statMana).toBeInTheDocument();
    });
});
