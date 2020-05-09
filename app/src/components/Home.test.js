import React from 'react';
import { render } from '@testing-library/react';
import Home from './Home';

test('renders Home title', () => {
    const { getByTestId } = render(<Home />);
    const titleElement = getByTestId('app-title');
    expect(titleElement).toBeInTheDocument();
});
