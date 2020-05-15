import CARDS_LIST from './cardsList';

const CARDS = CARDS_LIST.map((card, index) => {
    return {
        ...card,
        id: index
    };
});

const MAX_CARD_HEALTH = 8;

export {CARDS, MAX_CARD_HEALTH};
