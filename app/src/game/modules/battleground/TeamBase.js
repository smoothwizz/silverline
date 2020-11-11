import React from 'react';
import PropTypes from 'prop-types';
import { INITIAL_BASE_STRENGTH } from '../../constants/turn';
import utilsService from '../../services/utils';
import Tooltip from '../../widgets/Tooltip';

const TeamBase = ({ mana, life, team, isGameOver }) => {
    const isBaseDestroyed = isGameOver && life <= 0;
    const lifePercentage = isBaseDestroyed
        ? 0
        : utilsService.getPercentage(life, INITIAL_BASE_STRENGTH);

    return (
        <div
            data-testid={`team-base--${team}`}
            className={`team-base team-base--${team}`}>
            <h3 className="team-base__title">
                <Tooltip
                    text={`${mana} mana`}
                    toggleText={`${team === 'user' ? 'Your' : 'Enemy'} Base`}
                    isIconVisible={false}
                    type="game"
                />
            </h3>
            <div className="team-base__health">
                <span
                    className="team-base__health-percentage"
                    style={{ width: `${lifePercentage}%` }}>
                    <span className="team-base__health-text">{`${life}/${INITIAL_BASE_STRENGTH}`}</span>
                </span>
            </div>
        </div>
    );
};

TeamBase.propTypes = {
    mana: PropTypes.number,
    life: PropTypes.number.isRequired,
    team: PropTypes.string.isRequired,
    isGameOver: PropTypes.bool
};

export default TeamBase;
