import React from 'react';
import { render } from '@testing-library/react';
import BattleEvents from './BattleEvents';

describe('FightSim:', () => {

  test('renders the events list', () => {
    const { container } = render(<BattleEvents events={[]} />);
    const eventsList = container.querySelector('[data-test-id="events-list"]');

    expect(eventsList).toBeInTheDocument();
  });
});

