import CARD_TYPES from './cardTypes';

const CARDS_LIST = [
    {
        cost: 1,
        name: 'minion',
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
        name: 'swordsman',
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
        name: 'bowman',
        label: 'Bowman',
        stats: {
            life: 1,
            attack: 3,
            pace: 1
        },
        type: CARD_TYPES.archer
    },
    {
        cost: 4,
        name: 'crossbowman',
        label: 'Crossbowman',
        stats: {
            life: 2,
            attack: 4,
            pace: 1
        },
        type: CARD_TYPES.archer
    },
    {
        cost: 2,
        name: 'horseman',
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
        name: 'knight',
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
        name: 'royal_knight',
        label: 'Royal Knight',
        stats: {
            life: 7,
            attack: 3,
            pace: 1
        },
        type: CARD_TYPES.cavalry
    },
    {
        cost: 4,
        name: 'royal_archer',
        label: 'Royal Archer',
        stats: {
            life: 3,
            attack: 6,
            pace: 1
        },
        type: CARD_TYPES.archer
    },
    {
        cost: 5,
        name: 'defense_tower',
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
        name: 'battering_ram',
        label: 'Battering Ram',
        stats: {
            life: 1,
            attack: 6,
            pace: 1
        },
        type: CARD_TYPES.siege
    },
    {
        cost: 6,
        name: 'ballista',
        label: 'Ballista',
        stats: {
            life: 2,
            attack: 6,
            pace: 1
        },
        type: CARD_TYPES.siege
    },
    {
        cost: 7,
        name: 'eagle',
        label: 'Eagle',
        stats: {
            life: 4,
            attack: 3,
            pace: 2
        },
        type: CARD_TYPES.special
    },
    {
        cost: 7,
        name: 'hummingbird',
        label: 'Hummingbird',
        stats: {
            life: 1,
            attack: 1,
            pace: 3
        },
        type: CARD_TYPES.special
    },
    {
        cost: 9,
        name: 'assassin',
        label: 'Assassin',
        stats: {
            life: 1,
            attack: 3,
            pace: 3
        },
        type: CARD_TYPES.special
    },
    {
        cost: 10,
        name: 'king',
        label: 'King',
        stats: {
            life: 10,
            attack: 5,
            pace: 1
        },
        type: CARD_TYPES.special
    },
    {
        cost: 5,
        name: 'light_wizard',
        label: 'Light Wizard',
        stats: {
            life: 1,
            attack: 0,
            pace: 0
        },
        type: CARD_TYPES.buffer
    },
    {
        cost: 5,
        name: 'dark_wizard',
        label: 'Dark Wizard',
        stats: {
            life: 0,
            attack: 1,
            pace: 0
        },
        type: CARD_TYPES.buffer
    }
];

export default CARDS_LIST;
