// THIS IS A TESTING FILE FOR BALANCING HEROES
import React, { useState } from 'react';
import CardSelect from './CardSelect';
import Card from './Card';
import fightService from '../services/fight';
import gameService from '../services/game';


const FightSim = () => {
    const [cardA, setCardA] = useState(null);
    const [cardB, setCardB] = useState(null);
    const [unitA, setUnitA] = useState(null);
    const [unitB, setUnitB] = useState(null);
    const [fightLog, setFightLog] = useState('');

    const handleCardSelect = (card, type) => {
        if (type === 'cardA') {
            setCardA(card);
            setUnitA(gameService.createUnitFromCard(card, 0, 'user'));
        } else {
            setCardB(card);
            setUnitB(gameService.createUnitFromCard(card, 0, 'cpu'));
        }
    };

    const simFight = () => {
        const outcome = fightService.processFight(unitA, unitB);
        console.dir(outcome);
        setFightLog(outcome.fightLog);
    };

    return (
        <div>
            <h2>Fight Sim</h2>

            <h3>Card A</h3>
            <CardSelect
                mana={Infinity}
                selectedCard={cardA}
                action={card => handleCardSelect(card, 'cardA')}
            />

            <h3>Card B</h3>
            <CardSelect
                mana={Infinity}
                selectedCard={cardB}
                action={card => handleCardSelect(card, 'cardB')}
            />

            {cardA && cardB && (
                <div className="fight-sim">
                    <Card card = {cardA} />
                    <h3>vs</h3>
                    <Card card = {cardB} />
                </div>
            )}

            <button disabled={!unitA || !unitB} className="btn btn--primary" onClick={simFight}>
                Sim Fight
            </button>

            <div>
                <code>{fightLog}</code>
            </div>
        </div>
    );
};

export default FightSim;
