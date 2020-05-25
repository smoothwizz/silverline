import React from 'react';
import { render } from '@testing-library/react';
import BattlegroundPanel from './BattlegroundPanel';
import LANES from '../../constants/lanes';
import { CARDS } from '../../constants/cards';

describe('BattlegroundPanel', () => {
    const actions = {
        handleCardSelect: () => {
            return;
        },
        handleLaneSelect: () => {
            return;
        },
        deployUnit: () => {
            return;
        },
        endTurn: () => {
            return;
        }
    };

    const conditions = {
        isAddValid: false,
        isEndTurnDisabled: false,
        isEnemyTurn: false,
        isLoading: false,
        isGameOver: false
    };

    const mana = { user: 1, cpu: 2 };

    test('container renders', () => {
        const { getByTestId } = render(
            <BattlegroundPanel
                alert={{ text: '', type: 'error' }}
                selectedLane={LANES[0]}
                selectedCard={CARDS[0]}
                mana={mana}
                conditions={conditions}
                actions={actions}
            />
        );
        const elem = getByTestId('game-bar');

        expect(elem).toBeInTheDocument();
    });

    test('if game is over show restart button', () => {
        const { getByTestId } = render(
            <BattlegroundPanel
                alert={{ text: '', type: 'error' }}
                selectedLane={LANES[0]}
                selectedCard={CARDS[0]}
                mana={mana}
                conditions={{ ...conditions, isGameOver: true }}
                actions={actions}
            />
        );
        const elem = getByTestId('restart-game');

        expect(elem).toBeInTheDocument();
    });
});
