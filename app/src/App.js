import React from 'react';
import { Router } from '@reach/router';
import Home from './components/Home';
import Header from './components/Header';
import CardsShowcase from './game/modules/cards/CardsShowcase';
import BattlegroundContainer from './game/modules/battleground/BattlegroundContainer';
import FightSim from './game/modules/fight-sim/FightSim';

const App = () => (
    <>
        <Header />
        <main>
            <Router>
                <Home path="/" />
                <BattlegroundContainer path="game" />
                <CardsShowcase path="cards" />
                <FightSim path="sim"></FightSim>
            </Router>
        </main>
        <footer>MP 2020.</footer>
    </>
);

export default App;
