// THIS IS A TESTING FILE FOR BALANCING HEROES
import React, { useState } from 'react';
import CardSelect from '../battleground/CardSelect';
import fightService from '../../services/fight';
import gameService from '../../services/game';

const FightSim = () => {
    const [cardA, setCardA] = useState(null);
    const [cardB, setCardB] = useState(null);
    const [fightLog, setFightLog] = useState('');

    const handleCardSelect = (card, type) => {
        if (type === 'cardA') {
            setCardA(card);
        } else {
            setCardB(card);
        }
    };

    const simFight = () => {
        const unitA = gameService.createUnitFromCard(cardA, 0, 'user');
        const unitB = gameService.createUnitFromCard(cardB, '0', 'cpu');
        const outcome = fightService.processFight(unitA, unitB);
        setFightLog(outcome.log);
    };

    return (
        <div data-testid="fight-sim" className="fight-sim">
            <h2>Fight Sim</h2>

            <div className="fight-sim__card-select">
                <CardSelect
                    mana={Infinity}
                    selectedCard={cardA}
                    action={card => handleCardSelect(card, 'cardA')}
                />

                <CardSelect
                    mana={Infinity}
                    selectedCard={cardB}
                    action={card => handleCardSelect(card, 'cardB')}
                />
            </div>
            <button
                disabled={!cardA || !cardB}
                className="btn btn--primary btn--centered"
                onClick={simFight}>
                Sim Fight
            </button>
            {fightLog.length > 0 && <code className="fight-log">{fightLog}</code>}
        </div>
    );
};

export default FightSim;
