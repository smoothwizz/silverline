/**
 * Process fight and return stats and log
 *
 * @param {object} unit
 * @param {object} opposingUnit
 *
 * @returns {object}
 */
const processFight = (unit, opposingUnit) => {
    let log = '',
        unitLife = unit.life,
        unitAttack = unit.attack,
        opposingUnitLife = opposingUnit.life,
        opposingUnitAttack = opposingUnit.attack;

    const addToLog = text => {
        log += text;
    };

    while (unitLife > 0 && opposingUnitLife > 0) {
        addToLog(
            `Unit (${unitAttack} ATK) attacks Opposing Unit (${opposingUnitLife} HP `
        );
        opposingUnitLife -= unitAttack;
        addToLog(`-> ${opposingUnitLife} HP). `);
        if (unitAttack > 1) {
            unitAttack--;
        }
        if (opposingUnitLife <= 0) {
            addToLog('Opposing Unit died. ');

            break;
        }

        addToLog(
            `Opposing Unit (${opposingUnitAttack} ATK) -> strikes back Unit (${unitLife} HP `
        );

        unitLife -= opposingUnitAttack;
        addToLog(`-> ${unitLife} HP). `);
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

    return { stats, log };
};

const fightService = {
    processFight
};

export default fightService;
