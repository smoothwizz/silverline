import React from 'react';
import { Link, Router } from '@reach/router';
import CardsContainer from './CardsContainer';
import BattlegroundContainer from './BattlegroundContainer';
import '../../styles/game.scss';

const GameContainer = () => (
    <>
        <nav className="game-menu">
            <span className="game-menu__toggle">MENU</span>
            <ul className="game-menu__dropdown">
                <li>
                    <Link to="cards">My Cards</Link>
                </li>
                <li>
                    <Link to="battleground">Battle</Link>
                </li>
            </ul>
        </nav>
        <Router>
            <CardsContainer path="cards" />
            <BattlegroundContainer path="battleground" />
        </Router>
    </>
);

export default GameContainer;
