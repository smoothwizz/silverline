import React from 'react';
import { render } from '@testing-library/react';
import BattlegroundField from './BattlegroundField';

const mana = {user: 1, enemy: 1};
test('renders tile', () => {
    const { getByTestId } = render(
        <BattlegroundField
            mana={mana}
            userUnits={[]}
            enemyUnits={[]}
            baseStrength={{ user: 10, enemy: 10 }}
            selectedLane={{ id: 1 }}
            selectedCard={{
                cost: 1,
                label: 'Minion',
                stats: {
                    life: 1,
                    attack: 1,
                    pace: 1
                },
                type: 'infantry'
            }}
            actions={{}}
        />
    );
    const elem = getByTestId('tile-00');

    expect(elem).toBeInTheDocument();
});

test('renders base strength', () => {
    const { getByTestId } = render(
        <BattlegroundField
            mana={mana}
            userUnits={[]}
            enemyUnits={[]}
            baseStrength={{ user: 10, enemy: 10 }}
            selectedLane={{ id: 1 }}
            selectedCard={{
                cost: 1,
                label: 'Minion',
                stats: {
                    life: 1,
                    attack: 1,
                    pace: 1
                },
                type: 'infantry',
            }}
            actions={{}}
        />
    );
    const userBase = getByTestId('team-base--user');
    const enemyBase = getByTestId('team-base--enemy');

    expect(userBase).toBeInTheDocument();
    expect(enemyBase).toBeInTheDocument();
});
