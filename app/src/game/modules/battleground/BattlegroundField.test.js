import React from 'react';
import { render } from '@testing-library/react';
import BattlegroundField from './BattlegroundField';

test('renders tile', () => {
    const { container } = render(
        <BattlegroundField
            userUnits={[]}
            cpuUnits={[]}
            baseStrength={{ user: 10, cpu: 10 }}
            selectedLane={{ id: 1 }}
        />
    );
    const elem = container.querySelector('[data-test-id="tile-00"]');

    expect(elem).toBeInTheDocument();
});

test('renders base strength', () => {
    const { container } = render(
        <BattlegroundField
            userUnits={[]}
            cpuUnits={[]}
            baseStrength={{ user: 10, cpu: 10 }}
            selectedLane={{ id: 1 }}
        />
    );
    const elem = container.querySelector('[data-test-id="base-strength-user"]');

    expect(elem).toBeInTheDocument();
});
