import React from 'react';
import { render } from '@testing-library/react';
import BattleEvents from './BattleEvents';

describe('FightSim:', () => {

  test('renders the events list', () => {
    const { getByTestId } = render(<BattleEvents events={[]} />);
    const eventsList = getByTestId('events-list');

    expect(eventsList).toBeInTheDocument();
  });
});

