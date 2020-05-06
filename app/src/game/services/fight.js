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
        unitLife = unit.life,
        unitAttack = unit.attack,
        opposingUnitLife = opposingUnit.life,
        opposingUnitAttack = opposingUnit.attack;

    const addToLog = text => {
        console.log(text);
        fightLog += text;
    };

    while (unitLife > 0 && opposingUnitLife > 0) {
        addToLog(
            `Unit (${unitAttack} ATK -> ${unitAttack -
                1} ATK) attacks Opposing Unit (${opposingUnitLife} HP `
        );
        opposingUnitLife -= unitAttack;
        addToLog(`-> ${opposingUnitLife} HP.) `);
        if (unitAttack > 1) {
            unitAttack--;
        }
        if (opposingUnitLife <= 0) {
            addToLog('Opposing Unit died. ');

            break;
        }

        addToLog(
            `Opposing Unit (${opposingUnitAttack} ATK -> ${opposingUnitAttack -
                1} ATK) strikes back Unit (${unitLife} HP `
        );

        unitLife -= opposingUnitAttack;
        addToLog(`-> ${unitLife} HP.) `);
        if (opposingUnitAttack > 1) {
            opposingUnitAttack--;
        }

        if (unitLife <= 0) {
            addToLog('Unit died. ');

            break;
        }
    }

    const stats = {
        unit: {
            life: unitLife,
            attack: unitAttack
        },
        opposingUnit: {
            life: opposingUnitLife,
            attack: opposingUnitAttack
        }
    };

    return { stats, fightLog };
};

const fightService = {
    processFight
};

export default fightService;
