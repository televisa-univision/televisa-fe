import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import MatchInfoCards from './MatchInfoCards';
import LatestMatchesCard from './LatestMatchesCard';
import TopScorersCard from './TopScorersCard';

import Styles from './PreMatchLayout.scss';

/**
 * PreMatchLayout component.
 * @param {Object} props React Props for this component
 * @returns {JSX}
 * @constructor
 */
const PreMatchLayout = (props) => {
  const {
    infoCards,
    previousEncounters,
    topScorers,
    className,
    matchCard,
    previousCard,
    scorersCard,
    isBlack,
  } = props;
  return (
    <div className={`row no-gutters ${Styles.container} ${className}`}>
      {matchCard && (
        <div
          className={classnames(
            Styles.card,
            'col-xs-12',
            'col-sm-12',
            { [Styles.col]: isBlack },
            { 'col-md-4': previousCard && scorersCard },
            { 'col-md-6': previousCard && !scorersCard }
          )}
        >
          <MatchInfoCards isBlack={isBlack} infoCards={infoCards} />
        </div>
      )}
      {previousCard && (
        <div
          className={classnames(
            Styles.card,
            'col-xs-12',
            { [Styles.col]: isBlack },
            { 'col-sm-12': !scorersCard },
            { 'col-sm-6': scorersCard },
            { 'col-md-4': scorersCard },
            { 'col-md-6': !scorersCard }
          )}
        >
          <LatestMatchesCard isBlack={isBlack} events={previousEncounters} isSmall={scorersCard} />
        </div>
      )}
      {scorersCard && (
        <div className={classnames('col-xs-12 col-sm-6 col-md-4', { [Styles.col]: isBlack })}>
          <TopScorersCard isBlack={isBlack} topScorers={topScorers} />
        </div>
      )}
    </div>
  );
};
/**
 * propTypes
 * @property {array} schedule with the match info
 */
PreMatchLayout.propTypes = {
  infoCards: PropTypes.object,
  previousEncounters: PropTypes.array,
  topScorers: PropTypes.array,
  className: PropTypes.string,
  matchCard: PropTypes.bool,
  previousCard: PropTypes.bool,
  scorersCard: PropTypes.bool,
  isBlack: PropTypes.bool,
};

/**
 * Default Prop Values
 */
PreMatchLayout.defaultProps = {
  infoCards: {},
  className: '',
  matchCard: false,
  previousCard: false,
  scorersCard: false,
  isBlack: false,
};
export default PreMatchLayout;
