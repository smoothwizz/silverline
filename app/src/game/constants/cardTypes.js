import CARDS_AUTUMN from './cardTypes/cardsAutumn';
import CARDS_SPRING from './cardTypes/cardsSpring';
import CARDS_SUMMER from './cardTypes/cardsSummer';
import CARDS_WINTER from './cardTypes/cardsWinter';

const CARD_TYPES = [
    ...CARDS_AUTUMN.map(card => ({...card, faction: 'aut'})),
    ...CARDS_SPRING.map(card => ({...card, faction: 'spr'})),
    ...CARDS_SUMMER.map(card => ({...card, faction: 'sum'})),
    ...CARDS_WINTER.map(card => ({...card, faction: 'win'}))
].map((card, index) => {
    return {
        ...card,
        id: index
    };
});

export default CARD_TYPES;
