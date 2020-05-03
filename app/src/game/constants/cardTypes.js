const CARD_TYPES = [
    {
        id: 0,
        type: 'minion',
        label: 'Minions',
        defence: 1,
        attack: 1,
        cost: 1
    },
    {
        id: 1,
        type: 'archer',
        label: 'Archer',
        defence: 0,
        attack: 2,
        cost: 1
    },
    {
        id: 2,
        type: 'knight',
        label: 'Knight',
        defence: 2,
        attack: 1,
        cost: 2
    },
    {
        id: 3,
        label: 'Hero',
        type: 'hero',
        defence: 4,
        attack: 4,
        cost: 4
    }
];

export default CARD_TYPES;
