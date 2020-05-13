import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import BattleEvent from './BattleEvent';

import eventsService from '../../services/events';

const BattleEvents = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        function updateEvents() {
            setEvents(eventsService.getEvents(events));
        }
        updateEvents();
    });

    return (
        <section className="events" data-testid="events-list">
            <h2>History</h2>
            {events.length > 0 && (
                <div className="events__list">
                    {events
                        .sort((a, b) => b.id - a.id)
                        .map(event => {
                            return <BattleEvent key={event.id} event={event} />;
                        })}
                </div>
            )}
        </section>
    );
};

BattleEvents.propTypes = {
    events: PropTypes.array
};

export default BattleEvents;
