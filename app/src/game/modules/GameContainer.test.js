import React from 'react';
import { render } from '@testing-library/react';
import GameContainer from './GameContainer';

describe('GameContainer:', () => {

  test('renders the game menu', () => {
    const { getByTestId } = render(<GameContainer />);
    const gameMenu = getByTestId('game-menu');

    expect(gameMenu).toBeInTheDocument();
  });
});

