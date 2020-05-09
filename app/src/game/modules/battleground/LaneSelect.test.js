import React from 'react';
import { render } from '@testing-library/react';
import LaneSelect from './LaneSelect';
import LANES from '../../constants/lanes';

describe('LaneSelect', () => {
    const selectedLane = LANES[0];

    test('container renders', () => {
        const { getByTestId } = render(<LaneSelect selectedLane={selectedLane} action={() => {}} />);
        const elem = getByTestId('lane-select');

        expect(elem).toBeInTheDocument();
    });
});
