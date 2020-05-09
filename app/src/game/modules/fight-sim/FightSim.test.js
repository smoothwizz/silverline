import React from 'react';
import { render } from '@testing-library/react';
import FightSim from './FightSim';

describe('FightSim:', () => {

  test('renders the fight sim', () => {
    const { getByTestId } = render(<FightSim />);
    const fightSim = getByTestId('fight-sim');
    expect(fightSim).toBeInTheDocument();
  });
});

