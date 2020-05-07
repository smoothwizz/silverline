import React from 'react';
import { render } from '@testing-library/react';
import FightSim from './FightSim';

describe('FightSim:', () => {

  test('renders the fight sim', () => {
    const { container } = render(<FightSim />);
    const fightSim = container.querySelector('[data-test-id="fight-sim"]');

    expect(fightSim).toBeInTheDocument();
  });
});

