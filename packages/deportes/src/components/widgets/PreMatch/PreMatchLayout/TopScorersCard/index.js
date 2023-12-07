import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import localization from '../../../../../utils/localization';
import StatWrapper from '../../../../base/StatWrapper';
import PreMatchTitle from '../../PreMatchTitle';
import TeamScorersCard from './TeamScorersCard';

import Styles from './TopScorersCard.scss';

/**
 * List of top scorers per team
 * @param {Object} props an array of teams
 * @returns {JSX}
 */
const TopScorersCard = (props) => {
  const { topScorers, isBlack } = props;
  return (
    <StatWrapper withBorder={!isBlack} className={`${Styles.container}`}>
      <PreMatchTitle title={localization.get('scorers')} />
      {Array.isArray(topScorers) && topScorers.length > 0 ? (
        <div className={Styles.scorers}>
          {topScorers.map((teamPlayers, index) => (
            <TeamScorersCard
              {...teamPlayers}
              key={teamPlayers.id}
              className={classnames({ [Styles.withBorder]: index === 0 })}
            />
          ))}
        </div>
      ) : (
        <div className={Styles.noInfo}>{localization.get('noInfo')}</div>
      )}
    </StatWrapper>
  );
};

/**
 * @property {array} topScorers array of topScorers by team
 */
TopScorersCard.propTypes = {
  topScorers: PropTypes.array,
  isBlack: PropTypes.bool,
};

TopScorersCard.defaultProps = {
  topScorers: [],
  isBlack: false,
};

export default TopScorersCard;
