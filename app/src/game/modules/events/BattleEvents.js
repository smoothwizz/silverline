import React from 'react';
import PropTypes from 'prop-types';

const BattleEvents = ({ events }) => {
    return (
        <div className="events-list">
            {events
                .sort((a, b) => b.id - a.id)
                .map(event => {
                    return (
                        <span className="event" key={event.id}>
                            {event.text}
                        </span>
                    );
                })}
        </div>
    );
};

BattleEvents.propTypes = {
    events: PropTypes.array
};

export default BattleEvents;
