import gameService from './game';
import {CARD_TYPES} from '../constants/cards';
import LANES from '../constants/lanes';
import { LAST_ROW_INDEX } from '../constants/turn';

describe('service:GameService ', () => {
    test('GameService: playTurn() adds an event', () => {});

    test('deployUnit() adds an unit', () => {
        const defaultCard = CARD_TYPES[0];
        const lane = LANES[0];
        let unitsLength = {
            before: gameService.getUnits('user').length
        };
        const unit = gameService.deployUnit(lane, defaultCard);
        unitsLength.after = gameService.getUnits('user').length;

        expect(typeof unit).toBe('object');
        expect(unit.cardId).toBe(CARD_TYPES[0].id);
        expect(unitsLength.after).toBe(unitsLength.before + 1);
    });

    test('getDefaultCard() returns a card object', () => {
        const card = gameService.getDefaultCard();

        expect(typeof card).toBe('object');
    });

    test('playUserTurn() returns a state object', () => {
        const gameState = gameService.playUserTurn();

        expect(typeof gameState).toBe('object');
    });

    test('playEnemyTurn() returns a state object', () => {
        const gameState = gameService.playEnemyTurn();

        expect(typeof gameState).toBe('object');
    });

    test('createUnitFromCard() returns an unit object', () => {
        const unit = gameService.createUnitFromCard(CARD_TYPES[0], 0, 'user');

        expect(unit.attack).toBe(CARD_TYPES[0].stats.attack);
    });

    test('createUnitFromCard() for user a card on first row', () => {
        const unit = gameService.createUnitFromCard(CARD_TYPES[0], 0, 'user');

        expect(unit.row).toBe(0);
    });

    test('createUnitFromCard() for cpu a card on last row', () => {
        const unit = gameService.createUnitFromCard(CARD_TYPES[0], 0, 'cpu');

        expect(unit.row).toBe(LAST_ROW_INDEX);
    });

    test('reset() for cpu a card on last row', () => {
        const unit = gameService.createUnitFromCard(CARD_TYPES[0], 0, 'cpu');

        expect(unit.row).toBe(LAST_ROW_INDEX);
    });
});
