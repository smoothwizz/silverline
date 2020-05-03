import React from 'react';
import { Link, Router } from '@reach/router';
import CardsContainer from './CardsContainer';
import Battleground from './Battleground';
import '../../styles/game.scss';

const GameContainer = () => (
    <>
        <nav className="game-menu">
            <Link to="cards">My Cards</Link>
            <Link to="battleground">Battle</Link>
        </nav>
        <Router>
            <CardsContainer path="cards" />
            <Battleground path="battleground" />
        </Router>
    </>
);

export default GameContainer;
