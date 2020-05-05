import React from 'react';
import { render } from '@testing-library/react';
import BattlegroundPanel from './BattlegroundPanel';
import LANES from '../constants/lanes';
import CARD_TYPES from '../constants/cardTypes';

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
        const { container } = render(
            <BattlegroundPanel
                alert={{ text: '', type: 'error' }}
                selectedLane={LANES[0]}
                selectedCard={CARD_TYPES[0]}
                events={[]}
                mana={1}
                conditions={conditions}
                actions={actions}
            />
        );
        const elem = container.querySelector('[data-test-id="game-bar"]');

        expect(elem).toBeInTheDocument();
    });

    test('if game is over show restart button', () => {
        const { container } = render(
            <BattlegroundPanel
                alert={{ text: '', type: 'error' }}
                selectedLane={LANES[0]}
                selectedCard={CARD_TYPES[0]}
                events={[]}
                mana={1}
                conditions={{...conditions, isGameOver: true}}
                actions={actions}
            />
        );
        const elem = container.querySelector('[data-test-id="restart-game"]');

        expect(elem).toBeInTheDocument();
    });
});
