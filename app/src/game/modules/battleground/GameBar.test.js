import React from 'react';
import { render } from '@testing-library/react';
import ActionBar from './GameBar';

describe('ActionBar', () => {
    test('container renders', () => {
        const props = {
            selectedLane: {id: 1},
            userMana: 1,
            conditions: {},
            actions: {}
        };

        const { getByTestId } = render(<ActionBar {...props} />);
        const elem = getByTestId('game-bar');

        expect(elem).toBeInTheDocument();
    });
});
