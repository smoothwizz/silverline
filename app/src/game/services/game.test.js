import gameService from './game';
import {CARDS} from '../constants/cards';
import LANES from '../constants/lanes';
import { LAST_ROW_INDEX } from '../constants/turn';

describe('service:GameService ', () => {
    test('GameService: playTurn() adds an event', () => {});

    test('deployUnit() adds an unit', () => {
        const defaultCard = CARDS[0];
        const lane = LANES[0];
        let unitsLength = {
            before: gameService.getUnits('user').length
        };
        const unit = gameService.deployUnit(lane, defaultCard);
        unitsLength.after = gameService.getUnits('user').length;

        expect(typeof unit).toBe('object');
        expect(unit.cardId).toBe(CARDS[0].id);
        expect(unitsLength.after).toBe(unitsLength.before + 1);
    });

    test('getDefaultCard() returns a card object', () => {
        const card = gameService.getDefaultCard();

        expect(typeof card).toBe('object');
    });

    test('playUserTurn() returns a state object', () => {
        const currentState = gameService.playUserTurn();

        expect(typeof currentState).toBe('object');
    });

    test('playEnemyTurn() returns a state object', () => {
        const currentState = gameService.playEnemyTurn();

        expect(typeof currentState).toBe('object');
    });

    test('createUnitFromCard() returns an unit object', () => {
        const unit = gameService.createUnitFromCard(CARDS[0], 0, 'user');

        expect(unit.attack).toBe(CARDS[0].stats.attack);
    });

    test('createUnitFromCard() for user a card on first row', () => {
        const unit = gameService.createUnitFromCard(CARDS[0], 0, 'user');

        expect(unit.row).toBe(0);
    });

    test('createUnitFromCard() for enemy a card on last row', () => {
        const unit = gameService.createUnitFromCard(CARDS[0], 0, 'enemy');

        expect(unit.row).toBe(LAST_ROW_INDEX);
    });

    test('reset() is defined', () => {
        expect(typeof gameService.reset).toBe('function');
    });
});
