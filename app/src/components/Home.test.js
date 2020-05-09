import React from 'react';
import { render } from '@testing-library/react';
import Home from './Home';

test('renders Home title', () => {
    const { container } = render(<Home />);
    const titleElement = container.querySelector('[data-test-id="app-title"]');
    expect(titleElement).toBeInTheDocument();
});
