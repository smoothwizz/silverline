import eventsService from "./events";

describe('service: eventsService ', () => {
    test('addEvent() adds an event to the events list', () => {
        const event = {
            text: 'test',
            type: 'generic',
            log: 'log'
        };
        eventsService.addEvent({...event});
        expect(eventsService.getEvents().length).toBe(1);
        eventsService.reset();
    });

    test('getEvents() returns a list of events', () => {
        const event = {
            text: 'test',
            type: 'generic',
            log: 'log'
        };
        eventsService.addEvent({...event});
        expect(eventsService.getEvents().length).toBe(1);
        eventsService.reset();
    });

    test('getEvents() returns a list of events', () => {
        const event = {
            text: 'test',
            type: 'generic',
            log: 'log'
        };
        eventsService.addEvent({...event});
        expect(eventsService.getEvents().length).toBe(1);
        eventsService.reset();
        expect(eventsService.getEvents().length).toBe(0);
    });
});
