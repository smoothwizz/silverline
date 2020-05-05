import React from 'react';
import { render } from '@testing-library/react';
import CardStats from './CardStats';

describe('CardStats', () => {
    const mockStats = {
        attack: 1,
        defence: 1,
        pace: 1
    }

    test('it renders all stats', () => {
        const { container } = render(<CardStats stats={mockStats} />);
        const statAttack = container.querySelector('[data-test-id="stat-attack"]');
        const statDefence = container.querySelector('[data-test-id="stat-defence"]');
        const statPace = container.querySelector('[data-test-id="stat-pace"]');

        expect(statAttack).toBeInTheDocument();
        expect(statDefence).toBeInTheDocument();
        expect(statPace).toBeInTheDocument();
    });
});
