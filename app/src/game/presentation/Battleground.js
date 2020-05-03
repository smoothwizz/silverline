import React, { useState } from 'react';

import CARD_TYPES from '../constants/cardTypes';
import { INITIAL_MANA_PER_TURN, INITIAL_BASE_STRENGTH } from '../constants/turn';
import LANES from '../constants/lanes';

import gameService from '../services/game';
import Field from './Field';

const defaultCard = CARD_TYPES[0];
const defaultLane = LANES[0];
const defaultBaseStrength = {
    user: INITIAL_BASE_STRENGTH,
    cpu: INITIAL_BASE_STRENGTH
};

const TURN_DURATION = 1500; // ms

const Battleground = () => {
    const [events, setEvents] = useState([]);
    const [userUnits, setUserUnits] = useState([]);
    const [cpuUnits, setCpuUnits] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [mana, setMana] = useState(INITIAL_MANA_PER_TURN);
    const [lane, setLane] = useState(defaultLane);
    const [card, setCard] = useState(defaultCard);
    const [baseStrength, setBaseStrength] = useState(defaultBaseStrength);
    /**
     * Validate card add
     *
     * @returns boolean
     */
    const isAddValid = () => {
        const isManaEnough = mana - card.cost >= 0;
        if (!isManaEnough) {
            setError('Not enough mana to deploy this card.');

            return false;
        }

        const unitExistsOnLane =
            userUnits.filter(unit => {
                return unit.lane === lane.id && unit.row === 0;
            }).length > 0;
        if (unitExistsOnLane) {
            setError('You can only deploy one card on each lane.');

            return false;
        }

        return true;
    };

    const deployUnit = () => {
        if (!isAddValid()) {
            return;
        }
        let updatedMana = mana - card.cost;
        let addedUnit = gameService.deployUnit(lane, card);
        setUserUnits(userUnits.concat(addedUnit));

        setMana(updatedMana);
    };

    const endTurn = () => {
        setIsLoading(true);
        const gameState = gameService.playTurn();
        setBaseStrength(gameState.baseStrength);

        setTimeout(
            function() {
                setCpuUnits(gameState.units.cpu);
                setIsLoading(false);
                setUserUnits(gameState.units.user);
                setMana(gameState.mana.user);
                setEvents(gameState.events);
            },
            TURN_DURATION
        );
    };

    const handleLaneSelect = event => {
        const laneType = event.target.value;
        const selectedLane = LANES.find(lane => lane.value === laneType);

        setLane(selectedLane);
    };

    const handleCardSelect = event => {
        const selectedType = event.target.value;
        const card = CARD_TYPES.find(card => card.type === selectedType);

        setCard(card);
    };

    const isDeployUnitDisabled =
        isLoading || baseStrength.user < 0 || baseStrength.cpu < 0 || mana <= 0;
    const isEndTurnDisabled = isLoading || baseStrength.user < 0 || baseStrength.cpu < 0;

    return (
        <div className="battleground">
            <h1> Battleground </h1>
            {error && <div className="alert error">{error}</div>}

            <div className="user-bar">
                Mana {mana}
                <select value={lane.value} onChange={handleLaneSelect}>
                    {LANES.map(lane => (
                        <option key={lane.id} value={lane.value}>
                            {lane.label}
                        </option>
                    ))}
                </select>
                <select value={card.type} onChange={handleCardSelect}>
                    {CARD_TYPES.map(card => (
                        <option key={card.id} value={card.type}>
                            {card.label}
                        </option>
                    ))}
                </select>
                <button
                    disabled={isDeployUnitDisabled}
                    className="btn btn--primary"
                    onClick={deployUnit}
                >
                    Deploy Unit
                </button>
                <button disabled={isEndTurnDisabled} className="btn btn--primary" onClick={endTurn}>
                    End Turn
                </button>
                {isLoading ? 'isLoading' : 'isNotLoading'}
                <code>{JSON.stringify(events)}</code>
            </div>
            <h2>USER {baseStrength.user < 0 ? 'CPU WINS' : baseStrength.user}</h2>
            <Field userUnits={userUnits} cpuUnits={cpuUnits}></Field>
            <h2>CPU {baseStrength.cpu < 0 ? 'USER WINS' : baseStrength.cpu}</h2>
        </div>
    );
};

export default Battleground;
