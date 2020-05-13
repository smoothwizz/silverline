let nextId = 0,
    events = [];

/**
 * Add event
 *
 * @param {string} text
 * @param {string} type can be 'fight' 'generic'
 * @param {string=} log
 */
const addEvent = (text, type, log) => {
    log = log || '';
    const event = {
        id: nextId++,
        log: log,
        text: text,
        type: type
    };

    events = [event, ...events];
};

/**
 * Reset events values
 */
const reset = () => {
    events.length = 0;
};

/**
 * Get events
 */
const getEvents = () => {
    return events;
};

const eventsService = {
    addEvent,
    getEvents,
    reset
};

export default eventsService;
