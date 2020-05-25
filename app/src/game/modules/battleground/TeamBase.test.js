import React from 'react';
import { render } from '@testing-library/react';

import TeamBase from './TeamBase';

describe('Base:', () => {
    test('renders Base', () => {
        const mockProps = {
            mana: 1,
            team: 'user',
            life: 10
        };
        const { getByTestId } = render(<TeamBase {...mockProps} />);
        const userBase = getByTestId('team-base--user');

        expect(userBase).toBeInTheDocument();
    });
});
