import React from 'react';
import { render } from '@testing-library/react';
import BattlegroundField from './BattlegroundField';

const mana = {user: 1, enemy: 1};
test('renders tile', () => {
    const { getByTestId } = render(
        <BattlegroundField
            userUnits={[]}
            enemyUnits={[]}
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

test('renders field', () => {
    const { getByTestId } = render(
        <BattlegroundField
            userUnits={[]}
            enemyUnits={[]}
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
    const field = getByTestId('battleground-field');

    expect(field).toBeInTheDocument();
});
