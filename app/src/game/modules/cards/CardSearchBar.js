import React from 'react';
import PropTypes from 'prop-types';

const CardSearchBar = ({ term, action }) => {
    return (
        <div className="search-bar form-field">
            <input
                className="input"
                placeholder="Search for cards"
                type="text"
                value={term}
                onChange={action}
            />
        </div>
    );
};

CardSearchBar.propTypes = {
    term: PropTypes.string,
    action: PropTypes.func
};

export default CardSearchBar;
