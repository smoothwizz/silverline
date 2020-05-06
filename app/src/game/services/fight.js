/**
 * Process fight and return stats and log
 *
 * @param {object} unit
 * @param {object} opposingUnit
 *
 * @returns {object}
 */
const processFight = (unit, opposingUnit) => {
    let fightLog = '',
        stats = {
            unit: {
                life: unit.life,
                attack: unit.attack
            },
            opposingUnit: {
                life: opposingUnit.life,
                attack: opposingUnit.attack
            }
        };

    const addToLog = text => {
        fightLog += text;
    };

    while ((stats.unit.life > 0) & (stats.opposingUnit.life > 0)) {
        addToLog(
            `Unit (${stats.unit.attack} ATK) attacks Opposing Unit (${stats.opposingUnit.life} HP)`
        );
        stats.opposingUnit.life -= stats.unit.attack;
        addToLog(`remains with ${stats.opposingUnit.life} HP. `);
        if (stats.unit.attack > 1) {
            stats.unit.attack--;
        }
        addToLog(
            `Unit now has ${stats.unit.attack} ATK. ` +
                `Opposing Unit (${stats.opposingUnit.attack} ATK) strikes back Unit (${stats.unit.life} HP) `
        );
        stats.unit.life -= stats.opposingUnit.attack;
        addToLog(`remains with ${stats.unit.life} HP. `);
        if (stats.opposingUnit.attack > 1) {
            stats.opposingUnit.attack--;
        }
        addToLog(`Opposing Unit now has ${stats.opposingUnit.attack} ATK.`);
    }

    return { stats, fightLog };
};

const fightService = {
    processFight
};

export default fightService;
