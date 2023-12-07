import React from 'react';
import PropTypes from 'prop-types';

import { isValidArray, getUniqKey } from '@univision/fe-commons/dist/utils/helpers';

import classnames from 'classnames';

import CONFIG, { GROUP, DEFAULT } from './StandingsConfig';
import StandingsStatsHeader from '../StandingsStatsHeader';
import StandingsStatsBody from '../StandingsStatsBody';

import Styles from '../StandingsLayout.scss';

/**
 * A Standings mapping
 * @param {Object} props - The props for mapping standings data
 * @returns {JSX}
 */
const standingsMapping = (props) => {
  const {
    data,
    showButton,
    showMore, hasRelegation, showAll, isMobile, hasTooltip, leagueId, isTudn, isWorldCupMVP,
  } = props;
  if (isValidArray(data.sections)) {
    const configFallback = data.sections.length > 2 ? GROUP : DEFAULT;
    const config = CONFIG[leagueId] || CONFIG[configFallback];
    return data.sections
      .sort((a, b) => a.title.localeCompare(b.title))
      .map((st, index) => (
        <table
          key={getUniqKey(st.title)}
          className={classnames(
            Styles.table,
            { [Styles.hidden]: index > 2 && !showMore },
            { [Styles.noMargin]: index === data.sections.length - 1 },
            { [Styles.relegationBottom]: hasRelegation || showAll || !showButton },
          )}
        >
          <thead>
            <StandingsStatsHeader
              scopingLabel={st.title}
              competitionScope={st.competitionScope}
              hasRelegation={hasRelegation}
              isMobile={isMobile}
              hasTooltip={hasTooltip}
              hasPointsPerGame={config.hasPointsPerGame}
              isWorldCupMVP={isWorldCupMVP}
            />
          </thead>
          <tbody>
            <StandingsStatsBody
              statsArray={st.data}
              isFull={showAll}
              hasRelegation={hasRelegation}
              isMobile={isMobile}
              isTudn={isTudn}
              hasTopTeams={config.hasTopTeams}
              teamsToShow={config.show}
              topTeams={config.top}
              showMore={showMore}
              dashedBorder={config.dashed[index]}
              hasPointsPerGame={config.hasPointsPerGame}
              isWorldCupMVP={isWorldCupMVP}
            />
          </tbody>
        </table>
      ));
  }
  return <div />;
};

/**
 * @property {Object} data - the standings data
 * @property {bool} hasRelegation - true if we want to show relegation table
 * @property {bool} hasTooltip - true if we want to include tooltips on the headers
 * @property {bool} isMobile - true if in mobile device
 * @property {bool} isTudn - tudn theme support
 * @property {string} leagueId - the league id for the standings
 * @property {bool} showAll - true if we want to show the complete standings table
 * @property {bool} showButton - true if the button for expanding the table should be shown
 * @property {bool} showMore - true if we want to show more standings
 */
standingsMapping.propTypes = {
  data: PropTypes.object,
  hasRelegation: PropTypes.bool,
  hasTooltip: PropTypes.bool,
  isMobile: PropTypes.bool,
  isTudn: PropTypes.bool,
  leagueId: PropTypes.string,
  showAll: PropTypes.bool,
  showButton: PropTypes.bool,
  showMore: PropTypes.bool,
  isWorldCupMVP: PropTypes.bool,
};

standingsMapping.defaultProps = {
  data: {},
  hasRelegation: false,
  hasTooltip: false,
  isMobile: false,
  isTudn: false,
  showAll: false,
  showButton: false,
  showMore: false,
};

export default standingsMapping;
