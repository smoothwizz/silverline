import React from 'react';
import CARDS_LIST from './cardsList';
import {
    GiLightningBow,
    GiCrossbow,
    GiSwordBrandish,
    GiHoodedAssassin,
    GiBallista,
    GiSiegeRam,
    GiBowArrow,
    GiStoneTower,
    GiEagleEmblem,
    GiHorseHead,
    GiBlackKnightHelm,
    GiMountedKnight,
    GiCrossedSwords,
    GiWizardStaff,
    GiHummingbird,
    GiSwordman
} from 'react-icons/gi';
import { FaHatWizard, FaChessKing } from 'react-icons/fa';

const CARDS = CARDS_LIST.map((card, index) => {
    return {
        ...card,
        id: index
    };
});

const MAX_CARD_HEALTH = 8;

const CARD_ICONS = {
    assassin: <GiHoodedAssassin />,
    ballista: <GiBallista />,
    battering_ram: <GiSiegeRam />,
    bowman: <GiBowArrow />,
    dark_wizard: <FaHatWizard />,
    defense_tower: <GiStoneTower />,
    eagle: <GiEagleEmblem />,
    horseman: <GiHorseHead />,
    king: <FaChessKing />,
    knight: <GiMountedKnight />,
    light_wizard: <GiWizardStaff />,
    crossbowman: <GiCrossbow />,
    minion: <GiSwordBrandish />,
    hummingbird: <GiHummingbird />,
    royal_archer: <GiLightningBow />,
    royal_knight: <GiBlackKnightHelm />,
    swordsman: <GiSwordman />,
    default: <GiCrossedSwords />
};

export { CARDS, CARD_ICONS, MAX_CARD_HEALTH };
