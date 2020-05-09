import React from 'react';
import { Router } from '@reach/router';
import Home from './components/Home';
import Header from './components/Header';
import GameContainer from './game/modules/GameContainer';

const App = () => (
    <>
        <Header />
        <main>
            <Router>
                <Home path="/" />
                <GameContainer path="game/*" />
            </Router>
        </main>
        <footer>MP 2020.</footer>
    </>
);

export default App;
