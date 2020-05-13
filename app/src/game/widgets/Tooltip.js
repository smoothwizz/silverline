import React from 'react';
import PropTypes from 'prop-types';
import { FaInfoCircle } from 'react-icons/fa';

const Tooltip = ({ text, toggleText, isIconVisible, type }) => {
    if (!toggleText) {
        isIconVisible = true;
    }

    return (
        <div data-testid="tooltip" className={`tooltip ${type === 'game' ? 'tooltip--game' : ''}`}>
            {isIconVisible && <FaInfoCircle className="tooltip__toggle"></FaInfoCircle>}
            {toggleText}
            <span className="tooltip__text">{text}</span>
        </div>
    );
};

Tooltip.propTypes = {
    text: PropTypes.string.isRequired,
    isIconVisible: PropTypes.bool.isRequired,
    toggleText: PropTypes.string,
    type: PropTypes.string
};

export default Tooltip;
