import React from 'react';
import PropTypes from 'prop-types';
import BattlegroundField from './BattlegroundField';
import BattlegroundPanel from './BattlegroundPanel';

const Battleground = ({ battlePanelProps, battleFieldProps }) => {
    return (
        <div className="battleground">
            <BattlegroundField {...battleFieldProps} />
            <BattlegroundPanel {...battlePanelProps} />
        </div>
    );
};

Battleground.propTypes = {
    battlePanelProps: PropTypes.object,
    battleFieldProps: PropTypes.object
};

export default Battleground;
