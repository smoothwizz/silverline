/**
 * Return a random integer between the two values (include them)
 *
 * @param {number} min
 * @param {number} max
 *
 * @returns {number}
 */
const getRandomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
};

/**
 * Make a copy of the object
 *
 * @param {object} object
 *
 * @returns {object}
 */
const copyObject = (object) => {
    return JSON.parse(JSON.stringify(object));
};

const utilsService = {
    copyObject,
    getRandomInteger
};

export default utilsService;

