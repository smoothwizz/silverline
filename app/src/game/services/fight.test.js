import fightService from './fight';
import gameService from './game';
import {CARDS} from '../constants/cards';

describe('service:FightService ', () => {
    test('fightService: processFight() returns a stats object and a log', () => {
        const unit = gameService.createUnitFromCard(CARDS[0], 0, 'user');
        const opposingUnit = gameService.createUnitFromCard(CARDS[1], 0, 'enemy');
        const {stats, log} = fightService.processFight(unit, opposingUnit);

        expect(typeof stats).toBe('object');
        expect (log.length > 0).toBe(true);
        expect(Number.isInteger(stats.unit.attack)).toBe(true);
        expect(Number.isInteger(stats.unit.life)).toBe(true);
        expect(Number.isInteger(stats.opposingUnit.attack)).toBe(true);
        expect(Number.isInteger(stats.opposingUnit.life)).toBe(true);
    });
});
