import React from 'react';
import { render } from '@testing-library/react';
import BattlegroundPanel from './BattlegroundPanel';
import LANES from '../constants/lanes';
import CARD_TYPES from '../constants/cardTypes';

test('renders panel', () => {
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
        isLoading: false
    };

    const { container } = render(
        <BattlegroundPanel
            error={''}
            lane={LANES[0]}
            card={CARD_TYPES[0]}
            events={[]}
            mana={1}
            conditions={conditions}
            actions={actions}
        />
    );
    const elem = container.querySelector('[data-test-id="game-bar"]');

    expect(elem).toBeInTheDocument();
});
