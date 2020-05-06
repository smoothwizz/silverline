import React from 'react';
import { Link, Router } from '@reach/router';
import CardsShowcase from './CardsShowcase';
import BattlegroundContainer from './BattlegroundContainer';
import '../../styles/game.scss';

const GameContainer = () => (
    <>
        <nav className="game-menu">
            <span className="game-menu__toggle" data-test-id="game-menu">
                MENU
            </span>
            <ul className="game-menu__dropdown">
                <li>
                    <Link to="cards">All Cards</Link>
                </li>
                <li>
                    <Link to="battleground">Battleground</Link>
                </li>
            </ul>
        </nav>
        <Router>
            <CardsShowcase path="cards" />
            <BattlegroundContainer path="battleground" />
        </Router>
    </>
);

export default GameContainer;
