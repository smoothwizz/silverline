import React from 'react';
import { render } from '@testing-library/react';
import BattlegroundPanel from './BattlegroundPanel';
import LANES from '../../constants/lanes';
import {CARD_TYPES} from '../../constants/cards';

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
        isDeployUnitDisabled: false,
        isEndTurnDisabled: false,
        isEnemyTurn: false,
        isLoading: false,
        isGameOver: false
    };

    test('container renders', () => {
        const { getByTestId } = render(
            <BattlegroundPanel
                alert={{ text: '', type: 'error' }}
                selectedLane={LANES[0]}
                selectedCard={CARD_TYPES[0]}
                mana={1}
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
                selectedCard={CARD_TYPES[0]}
                mana={1}
                conditions={{...conditions, isGameOver: true}}
                actions={actions}
            />
        );
        const elem = getByTestId('restart-game');

        expect(elem).toBeInTheDocument();
    });
});
