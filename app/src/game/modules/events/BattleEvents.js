import React from 'react';
import PropTypes from 'prop-types';
import BattleEvent from './BattleEvent';

const BattleEvents = ({ events }) => {
    return (
        <div data-test-id="events-list" className="events-list">
            {events
                .sort((a, b) => b.id - a.id)
                .map(event => {
                    return (
                        <BattleEvent key={event.id} event={event} />
                    );
                })}
        </div>
    );
};

BattleEvents.propTypes = {
    events: PropTypes.array
};

export default BattleEvents;
