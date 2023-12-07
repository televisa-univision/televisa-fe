import React from 'react';
import PropTypes from 'prop-types';

import Image from '@univision/fe-components-base/dist/components/Image';
import Icon from '@univision/fe-icons/dist/components/Icon';

import localization from '../../../../../../utils/localization';
import Scorer from './Scorer';
import Styles from './TeamScorersCard.scss';

/**
 * Team Score Card component.
 * @param {Object} props React Props for this component
 * @returns {JSX}
 * @constructor
 */
const TeamScorersCard = (props) => {
  const {
    players,
    teamLogo,
    className,
  } = props;
  if (Array.isArray(players) && players.length > 0) {
    return (
      <div className={`${Styles.container} ${className}`}>
        <div className={Styles.header}>
          <div className={Styles.logoWrapper}>
            <Image src={teamLogo} className={Styles.logo} />
          </div>
          <div className={Styles.iconWrapper}>
            <Icon name="goal" size="small" />
          </div>
        </div>
        <div className={Styles.playersWrapper}>
          {players.map(player => (<Scorer key={player.id} {...player} />))}
        </div>
      </div>
    );
  }
  return (
    <div className={Styles.noInfo}>
      {localization.get('noInfo')}
    </div>
  );
};

/**
 * propTypes
 * @property {array} players array of scorer players
 * @property {string} teamLogo url of the team logo
 * @property {string} className of the component
 */
TeamScorersCard.propTypes = {
  players: PropTypes.array,
  teamLogo: PropTypes.string,
  className: PropTypes.string,
};

/**
 * Default Prop Values
 */
TeamScorersCard.defaultProps = {
  className: '',
};

export default TeamScorersCard;
