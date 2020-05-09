import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaCaretRight, FaCaretDown } from 'react-icons/fa';

const BattleEvent = ({ event }) => {
    const [isLogVisible, setIsLogVisible] = useState(false);

    const toggleLog = () => {
        setIsLogVisible(isVisible => !isVisible);
    };

    const logToggle = (
        <button
            data-testid="log-toggle"
            className="btn btn--text event-toggle"
            onClick={toggleLog}>
            {isLogVisible ? <FaCaretDown /> : <FaCaretRight />}
        </button>
    );

    const log = isLogVisible && <p className="event__log">{event.log}</p>;

    return (
        <div data-testid="event" className="event">
            {event.log.length > 0 && logToggle}
            {event.text}
            {event.log.length > 0 && log}
        </div>
    );
};

BattleEvent.propTypes = {
    event: PropTypes.object.isRequired
};

export default BattleEvent;
