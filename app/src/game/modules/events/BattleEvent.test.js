import React from 'react';
import { render } from '@testing-library/react';
import BattleEvent from './BattleEvent';

describe('FightSim:', () => {
    test('renders the event', () => {
        const event = {
            text: 'some text',
            log: 'some log'
        };
        const { getByText, container } = render(<BattleEvent event={event} />);
        const eventElement = container.querySelector('[data-testid="event"]');
        expect(eventElement).toBeInTheDocument();
        const textElement = getByText(/some text/i);
        expect(textElement).toBeInTheDocument();
        const logTrigger = container.querySelector('[data-testid="log-toggle"]');
        expect(logTrigger).toBeInTheDocument();
    });
});
