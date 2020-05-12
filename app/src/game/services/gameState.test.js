import { currentState, initialState, actions } from './gameState';

describe('service:currentState ', () => {
    test('currentState: game state is an object', () => {
        expect(typeof currentState).toBe('object');
    });

    test('initialState: game state is an object', () => {
        expect(typeof currentState).toBe('object');
    });

    test('actions.addEvent() adds an event to the events list', () => {
        const initialEventsLength = currentState.events.length;
        const event = {
            text: 'test',
            log: 'log'
        };
        actions.addEvent(event);

        expect(currentState.events.length).toBe(initialEventsLength + 1);
        expect(initialState.events.length).toBe(0);
    });

    test('actions.addUnit() adds an unit to the units list', () => {
        const mockUnit = {
            id: 0,
            lane: 0,
            row: 0
        };
        const team = 'user';

        actions.addUnit(mockUnit, team);
        const createdUnit = currentState.units[team].find(unit => unit.id === mockUnit.id);

        expect(createdUnit.id).toBe(mockUnit.id);
        expect(currentState.units[team].length).toBe(1);
    });

    test('actions.incrementTurn() increases the turn with 1', () => {
        const initialTurn = currentState.turns;
        actions.incrementTurn();
        const result = currentState.turns;

        expect(result).toBe(initialTurn + 1);
    });

    test('actions.getUnitById() returns the correct unit', () => {
        const mockUnits = [
            { id: 0, lane: 2 },
            { id: 1, lane: 1 },
            { id: 2, lane: 3 },
            { id: 3, lane: 4 }
        ];
        actions.setUnits(mockUnits, 'user');

        const result = actions.getUnitById(2, 'user');
        const expectedResult = { id: 2, lane: 3 };

        expect(typeof result).toBe('object');
        expect(result.lane).toBe(expectedResult.lane);
    });

    test('actions.markUnitAsDead() sets given unit isAlive property to false', () => {
        const mockUnit = { id: 0, isAlive: true };
        actions.setUnits([mockUnit], 'user');
        actions.markUnitAsDead(mockUnit, 'user');

        const updatedUnit = actions.getUnitById(mockUnit.id, 'user');

        expect(updatedUnit.isAlive).toBe(false);
    });

    test('actions.moveUnits() moves the units on the board', () => {
        const mockUnits = [
            { id: 0, pace: 0, lane: 0, row: 0, isAlive: true },
            { id: 1, pace: 1, lane: 1, row: 0, isAlive: true },
            { id: 2, pace: 3, lane: 3, row: 0, isAlive: true },
            { id: 3, pace: 4, lane: 3, row: 0, isAlive: false }
        ];
        actions.setUnits(mockUnits, 'user');
        actions.moveUnits('user');

        const unitWithPaceZero = actions.getUnitById(0, 'user');
        const unitWithPaceOne = actions.getUnitById(1, 'user');
        const unitWithPaceThree = actions.getUnitById(2, 'user');
        const deadUnit = actions.getUnitById(3, 'user');

        expect(unitWithPaceZero.row).toBe(0);
        expect(unitWithPaceOne.row).toBe(1);
        expect(unitWithPaceThree.row).toBe(3);
        expect(deadUnit.row).toBe(0);
    });

    test('actions.removeDeadUnits() filters out units that are dead', () => {
        const mockUnits = {
            user: [
                { id: 0, isAlive: true },
                { id: 1, isAlive: true },
                { id: 2, isAlive: true },
                { id: 3, isAlive: false }
            ],
            enemy: [{ id: 0, isAlive: true }, { id: 1, isAlive: false }]
        };

        actions.setUnits(mockUnits.user, 'user');
        actions.setUnits(mockUnits.enemy, 'enemy');
        actions.removeDeadUnits();

        expect(currentState.units.user.length).toBe(3);
        expect(currentState.units.enemy.length).toBe(1);
        expect(actions.getUnitById(3, 'user')).toBe(false);
        expect(actions.getUnitById(1, 'enemy')).toBe(false);
    });

    test('actions.isGameOver() returns an boolean', () => {
        const result = actions.isGameOver();

        expect(typeof result).toBe('boolean');
    });

    test('actions.resetState() resets the state back to default', () => {
        const mockUnits = [{ id: 1 }, { id: 3 }];
        actions.setUnits(mockUnits, 'user');
        actions.resetState();

        expect(currentState.units.user.length).toBe(0);
    });

    test('actions.setBaseStrength() sets the base strength value correctly', () => {
        actions.setBaseStrength(2, 'user');
        actions.setBaseStrength(3, 'enemy');

        expect(currentState.baseStrength.user).toBe(2);
        expect(currentState.baseStrength.enemy).toBe(3);
    });

    test('actions.setGameOver() sets the gameOver correctly', () => {
        actions.setGameOver(true);
        const result = currentState.gameOver;
        const expectedResult = true;

        expect(typeof result).toBe('boolean');
        expect(result).toBe(expectedResult);
    });

    test('actions.setMana() sets the mana value correctly', () => {
        actions.setMana(2, 'user');
        actions.setMana(3, 'enemy');

        expect(currentState.mana.user).toBe(2);
        expect(currentState.mana.enemy).toBe(3);
    });

    test('actions.setUnits() sets the given units correctly', () => {
        const mockUnits = {
            user: [
                { id: 0, lane: 1, row: 0 },
                { id: 1, lane: 2, row: 0 },
                { id: 2, lane: 2, row: 0 },
                { id: 3, lane: 3, row: 1 }
            ],
            enemy: [{ id: 0, lane: 3, row: 0 }, { id: 1, lane: 1, row: 1 }]
        };

        actions.setUnits(mockUnits.user, 'user');
        actions.setUnits(mockUnits.enemy, 'enemy');

        expect(currentState.units.user.length).toBe(4);
        expect(currentState.units.enemy.length).toBe(2);
        expect(actions.getUnitById(3, 'user').lane).toBe(3);
        expect(actions.getUnitById(3, 'user').row).toBe(1);
        expect(actions.getUnitById(1, 'enemy').row).toBe(1);
    });

    test('actions.updateUnitLife() updates the given unit life', () => {
        const mockUnit = { id: 0, life: 1 };
        const updatedLife = 2;
        const mockUnits = [mockUnit, { id: 1, life: 10 }];

        actions.setUnits(mockUnits, 'user');
        actions.updateUnitLife(mockUnit, updatedLife, 'user');

        expect(actions.getUnitById(mockUnit.id, 'user').life).toBe(updatedLife);
    });
});
