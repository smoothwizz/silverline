import React from 'react';
import { render } from '@testing-library/react';
import BattlegroundField from './BattlegroundField';

test('renders tile', () => {
    const { getByTestId } = render(
        <BattlegroundField
            userUnits={[]}
            cpuUnits={[]}
            baseStrength={{ user: 10, cpu: 10 }}
            selectedLane={{ id: 1 }}
        />
    );
    const elem = getByTestId('tile-00');

    expect(elem).toBeInTheDocument();
});

test('renders base strength', () => {
    const { getByTestId } = render(
        <BattlegroundField
            userUnits={[]}
            cpuUnits={[]}
            baseStrength={{ user: 10, cpu: 10 }}
            selectedLane={{ id: 1 }}
        />
    );
    const elem = getByTestId('base-strength-user');

    expect(elem).toBeInTheDocument();
});
