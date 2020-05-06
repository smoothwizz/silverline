import React from 'react';
import { render } from '@testing-library/react';
import GameContainer from './GameContainer';

describe('GameContainer:', () => {

  test('renders the game menu', () => {
    const { container } = render(<GameContainer />);
    const gameMenu = container.querySelector('[data-test-id="game-menu"]');

    expect(gameMenu).toBeInTheDocument();
  });
});

