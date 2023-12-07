import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';
import isValidValue from '@univision/fe-utilities/helpers/common/isValidValue';

import StandingsStatsRow from '../StandingsStatsRow';
import Styles from '../StandingsLayout.scss';

/**
 * A Standings Stats body consisting of an array of team stats
 * @param {Object} props - The component props
 * @returns {?JSX}
 */
const StandingsStatsBody = ({
  statsArray, showAll, hasRelegation, isMobile, teamsToShow, showMore, hasTopTeams, topTeams,
  isTudn, dashedBorder, hasPointsPerGame,
  isWorldCupMVP,
}) => {
  return (isValidArray(statsArray)
    ? statsArray
      .sort((a, b) => {
        if (hasPointsPerGame) {
          return b.ppg - a.ppg;
        }
        return hasRelegation ? a.ra - b.ra : b.pt - a.pt;
      })
      .map((content, ind) => {
        const isTop = ind < topTeams + 1 && !hasRelegation && hasTopTeams;
        return (
          <StandingsStatsRow
            className={classnames(Styles.borderHighlight, {
              [Styles.light]: ind % 2 !== 0,
              [Styles.hidden]: ind > teamsToShow && !showMore,
              [Styles.top]: !isWorldCupMVP && isTop,
              [Styles.topMpv]: isWorldCupMVP && isTop,
              [Styles.relegation]: hasRelegation && ind === 0,
              [Styles.isTudn]: isTudn,
              [Styles.dashedBorder]: isValidValue(dashedBorder) && ind === dashedBorder,
            })}
            key={content.key}
            stats={content}
            position={ind}
            isFull={showAll}
            hasRelegation={hasRelegation}
            isMobile={isMobile}
            isTudn={isTudn}
            hasPointsPerGame={hasPointsPerGame}
            isWorldCupMVP={isWorldCupMVP}
          />
        );
      }) : null
  );
};

/**
 * @property {Object} statsArray - the stats to render
 * @property {number} dashedBorder - the row number to apply dashed border
 * @property {bool} isFull - is full version
 * @property {bool} hasRelegation - if stats include relegation
 * @property {bool} isMobile - if in mobile
 * @property {bool} isTudn - tudn theme support
 * @property {number} teamsToShow - how many team stats to show
 * @property {number} topTeams - top teams qualified to next phase
 * @property {bool} showMore - true if it needs to show more stats
 * @property {bool} hasTopTeams - if stats have top teams
 * @property {bool} hasPointsPerGame - if stats have points per game
 */
StandingsStatsBody.propTypes = {
  dashedBorder: PropTypes.number,
  statsArray: PropTypes.array,
  isFull: PropTypes.bool,
  hasRelegation: PropTypes.bool,
  isMobile: PropTypes.bool,
  isTudn: PropTypes.bool,
  teamsToShow: PropTypes.number,
  topTeams: PropTypes.number,
  showMore: PropTypes.bool,
  hasTopTeams: PropTypes.bool,
  hasPointsPerGame: PropTypes.bool,
  isWorldCupMVP: PropTypes.bool,
};

StandingsStatsBody.defaultProps = {
  statsArray: [],
  isFull: false,
  hasRelegation: false,
  isMobile: false,
  isTudn: false,
};

export default StandingsStatsBody;
