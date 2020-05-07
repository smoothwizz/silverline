import React from 'react';
import { Link, Router } from '@reach/router';
import CardsShowcase from './CardsShowcase';
import BattlegroundContainer from './BattlegroundContainer';
import FightSim from './FightSim';
import '../../styles/game.scss';

const GameContainer = () => (
    <>
        <nav className="game-menu">
            <span className="game-menu__toggle" data-test-id="game-menu">
                MENU
            </span>
            <ul className="game-menu__dropdown">
                <li>
                    <Link to="./">All Cards</Link>
                </li>
                <li>
                    <Link to="sim">Fight Sim</Link>
                </li>
                <li>
                    <Link to="battleground">Battleground</Link>
                </li>
            </ul>
        </nav>
        <Router>
            <CardsShowcase path="/" />
            <FightSim path="sim"></FightSim>
            <BattlegroundContainer path="battleground" />
        </Router>
    </>
);

export default GameContainer;
