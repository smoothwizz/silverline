/**
 * Return a random integer between the two values (include them)
 *
 * @param {number} min
 * @param {number} max
 *
 * @returns {number}
 */
const getRandomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Get percentage as integer
 *
 * @param {number} part
 * @param {number} total
 */
const getPercentage = (part, total) => {
    if (Number.isNaN(part) || Number.isNaN(total)) {
        return false;
    }

    return parseInt((part / total) * 100);
};

/**
 * Make a copy of the object
 *
 * @param {object} object
 *
 * @returns {object}
 */
const copyObject = object => {
    return JSON.parse(JSON.stringify(object));
};

const utilsService = {
    copyObject,
    getPercentage,
    getRandomInteger
};

export default utilsService;
