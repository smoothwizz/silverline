import React from 'react';
import { render } from '@testing-library/react';
import ScoreBar from './ScoreBar';

const mana = { user: 1, enemy: 1 };
test('renders ScoreBar', () => {
    const { getByTestId } = render(
        <ScoreBar mana={mana} isGameOver={false} baseStrength={{ user: 10, enemy: 10 }} />
    );
    const elem = getByTestId('scorebar');

    expect(elem).toBeInTheDocument();
});

test('renders base strength', () => {
    const { getByTestId } = render(
        <ScoreBar mana={mana} isGameOver={false} baseStrength={{ user: 10, enemy: 10 }} />
    );
    const userBase = getByTestId('team-base--user');
    const enemyBase = getByTestId('team-base--enemy');

    expect(userBase).toBeInTheDocument();
    expect(enemyBase).toBeInTheDocument();
});
