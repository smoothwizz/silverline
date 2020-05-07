import fightService from './fight';
import gameService from './game';
import {CARD_TYPES} from '../constants/cards';

describe('service:FightService ', () => {
    test('fightService: processFight() returns a stats object and a log', () => {
        const unit = gameService.createUnitFromCard(CARD_TYPES[0], 0, 'user');
        const opposingUnit = gameService.createUnitFromCard(CARD_TYPES[1], 0, 'cpu');
        const {stats, log} = fightService.processFight(unit, opposingUnit);

        expect(typeof stats).toBe('object');
        expect (log.length > 0).toBe(true);
        expect(Number.isInteger(stats.unit.attack)).toBe(true);
        expect(Number.isInteger(stats.unit.life)).toBe(true);
        expect(Number.isInteger(stats.opposingUnit.attack)).toBe(true);
        expect(Number.isInteger(stats.opposingUnit.life)).toBe(true);
    });
});
