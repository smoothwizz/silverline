import utilsService from './utils';

test('UtilsService: getRandomInteger() returns an integer between min and max', () => {
    const min = 1,
        max = 3,
        randomValue = utilsService.getRandomInteger(1, 3);

    expect(Number.isInteger(randomValue)).toBe(true);
    expect(randomValue >= min).toBe(true);
    expect(randomValue <= max).toBe(true);
});

test('UtilsService: copyObject() returns a copied object', () => {
    let initialObject = {
            test: 'initial'
        },
        copyObject = utilsService.copyObject(initialObject);

    initialObject.test = 'modified';

    expect(typeof copyObject).toBe('object');
    expect(copyObject.test).toBe('initial');
});

test('UtilsService: getPercentage() returns an integer', () => {
    const part = 40,
          total= 80,
          percent = utilsService.getPercentage(part, total);

    expect(Number.isInteger(percent)).toBe(true);
    expect(percent).toBe(50);
});
