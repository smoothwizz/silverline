import React from 'react';
import { Router } from '@reach/router';
import Header from './components/Header';
import GameContainer from './game/presentation/GameContainer';

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

const Home = () => (
    <div>
        <h2>Welcome</h2>
    </div>
);

export default App;
