import React from 'react';
import { render } from '@testing-library/react';
import Field from './Field';

test('renders field', () => {
    const { container } = render(<Field userUnits={[]} cpuUnits={[]} />);
    const foo = container.querySelector('[data-test-id="tile-00"]')

    expect(foo).toBeInTheDocument();
});
