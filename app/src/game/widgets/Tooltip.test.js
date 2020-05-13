import React from 'react';
import { render } from '@testing-library/react';
import Tooltip from './Tooltip';

describe('GameContainer:', () => {
    test('renders the tooltip', () => {
        const { getByTestId } = render(<Tooltip text="Test" isIconVisible={false} />);
        const tooltip = getByTestId('tooltip');

        expect(tooltip).toBeInTheDocument();
    });

    test('renders the tooltip with all props', () => {
        const { getByTestId } = render(
            <Tooltip text="Test" toggleText="Click Here" type="game" isIconVisible={false} />
        );
        const tooltip = getByTestId('tooltip');

        expect(tooltip).toBeInTheDocument();
    });
});
