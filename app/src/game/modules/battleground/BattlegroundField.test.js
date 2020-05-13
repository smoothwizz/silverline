import React from 'react';
import { render } from '@testing-library/react';
import BattlegroundField from './BattlegroundField';

test('renders tile', () => {
    const { getByTestId } = render(
        <BattlegroundField
            userUnits={[]}
            enemyUnits={[]}
            baseStrength={{ user: 10, enemy: 10 }}
            selectedLane={{ id: 1 }}
            actions={{}}
        />
    );
    const elem = getByTestId('tile-00');

    expect(elem).toBeInTheDocument();
});

test('renders base strength', () => {
    const { getByTestId } = render(
        <BattlegroundField
            userUnits={[]}
            enemyUnits={[]}
            baseStrength={{ user: 10, enemy: 10 }}
            selectedLane={{ id: 1 }}
            actions={{}}
        />
    );
    const userBase = getByTestId('team-base--user');
    const enemyBase = getByTestId('team-base--enemy');

    expect(userBase).toBeInTheDocument();
    expect(enemyBase).toBeInTheDocument();
});
