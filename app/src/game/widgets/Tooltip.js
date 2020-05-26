import React from 'react';
import PropTypes from 'prop-types';
import { FaInfoCircle } from 'react-icons/fa';

const Tooltip = ({ text, toggleText, isIconVisible, type }) => {
    return (
        <div data-testid="tooltip" className={`tooltip ${type ? `tooltip--${type}` : ''}`}>
            {isIconVisible && <FaInfoCircle className="tooltip__toggle"></FaInfoCircle>}
            {toggleText}
            <span className="tooltip__text">{text}</span>
        </div>
    );
};

Tooltip.propTypes = {
    text: PropTypes.string.isRequired,
    isIconVisible: PropTypes.bool.isRequired,
    toggleText: PropTypes.any,
    type: PropTypes.string
};

export default Tooltip;
