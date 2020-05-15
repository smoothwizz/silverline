import CARD_TYPES from './cardTypes';

const CARDS_LIST = [
    {
        cost: 1,
        label: 'Minion',
        stats: {
            life: 1,
            attack: 1,
            pace: 1
        },
        type: CARD_TYPES.infantry
    },
    {
        cost: 2,
        label: 'Swordsman',
        stats: {
            life: 1,
            attack: 2,
            pace: 1
        },
        type: CARD_TYPES.infantry
    },
    {
        cost: 3,
        label: 'Legionary',
        stats: {
            life: 1,
            attack: 3,
            pace: 1
        },
        type: CARD_TYPES.infantry
    },
    {
        cost: 2,
        label: 'Bowman',
        stats: {
            life: 1,
            attack: 1,
            pace: 2
        },
        type: CARD_TYPES.archer
    },
    {
        cost: 3,
        label: 'Crossbowman',
        stats: {
            life: 1,
            attack: 3,
            pace: 2
        },
        type: CARD_TYPES.archer
    },
    {
        cost: 4,
        label: 'Longbowman',
        stats: {
            life: 2,
            attack: 4,
            pace: 2
        },
        type: CARD_TYPES.archer
    },
    {
        cost: 2,
        label: 'Horseman',
        stats: {
            life: 3,
            attack: 1,
            pace: 1
        },
        type: CARD_TYPES.cavalry
    },
    {
        cost: 3,
        label: 'Knight',
        stats: {
            life: 5,
            attack: 2,
            pace: 1
        },
        type: CARD_TYPES.cavalry
    },
    {
        cost: 4,
        label: 'Royal Knight',
        stats: {
            life: 7,
            attack: 3,
            pace: 1
        },
        type: CARD_TYPES.cavalry
    },
    {
        cost: 5,
        label: 'Defense Tower',
        stats: {
            life: 20,
            attack: 1,
            pace: 0
        },
        type: CARD_TYPES.structure
    },
    {
        cost: 5,
        label: 'Battering Ram',
        stats: {
            life: 1,
            attack: 6,
            pace: 0.5
        },
        type: CARD_TYPES.siege
    },
    {
        cost: 5,
        label: 'Ballista',
        stats: {
            life: 2,
            attack: 8,
            pace: 0.5
        },
        type: CARD_TYPES.siege
    },
    {
        cost: 7,
        label: 'Eagle',
        stats: {
            life: 4,
            attack: 4,
            pace: 3
        },
        type: CARD_TYPES.special
    },
    {
        cost: 9,
        label: 'Assassin',
        stats: {
            life: 1,
            attack: 4,
            pace: 3
        },
        type: CARD_TYPES.special
    },
    {
        cost: 10,
        label: 'King',
        stats: {
            life: 10,
            attack: 5,
            pace: 1
        },
        type: CARD_TYPES.special
    },
];

export default CARDS_LIST;
