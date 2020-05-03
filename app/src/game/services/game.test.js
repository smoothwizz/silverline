import gameService from './game';
import CARD_TYPES from '../constants/cardTypes';
import LANES from '../constants/lanes';
import {LAST_ROW_INDEX} from '../constants/turn';

test('GameService: playTurn() adds an event', () => {});

test('GamService: deployUnit() adds an unit', () => {
    const defaultCard = CARD_TYPES[0];
    const lane = LANES[0];
    let unitsLength = {
        before: gameService.getUnits('user').length
    };
    const unit = gameService.deployUnit(lane, defaultCard);
    unitsLength.after = gameService.getUnits('user').length;

    expect(typeof unit).toBe('object');
    expect(unit.type).toBe(CARD_TYPES[0].type);
    expect(unitsLength.after).toBe(unitsLength.before + 1);
});

test('GameService: getDefaultCard() returns a card object', () => {
    let card = gameService.getDefaultCard();

    expect(typeof card).toBe('object');
});

test('GameService: playTurn() returns a state object', () => {
    let gameState = gameService.playTurn();

    expect(typeof gameState).toBe('object');
});

test('GameService: createUnitFromCard() returns an unit object', () => {
    let unit = gameService.createUnitFromCard(CARD_TYPES[0], 0, 'user');

    expect(unit.attack).toBe(CARD_TYPES[0].attack);
});

test('GameService: createUnitFromCard() for user a card on first row', () => {
    let unit = gameService.createUnitFromCard(CARD_TYPES[0], 0, 'user');

    expect(unit.row).toBe(0);
});

test('GameService: createUnitFromCard() for cpu a card on last row', () => {
    let unit = gameService.createUnitFromCard(CARD_TYPES[0], LAST_ROW_INDEX, 'cpu');

    expect(unit.row).toBe(LAST_ROW_INDEX);
});
