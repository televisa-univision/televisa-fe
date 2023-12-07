import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { isValidArray, camelCase } from '@univision/fe-commons/dist/utils/helpers';
import localization from '@univision/fe-commons/dist/utils/localization/deportes';
import Tooltip from '../../../../base/Tooltip/index';

import standingHeader from '../../../../../config/WidgetHeaderConfig/widgetHeader.config';

import Styles from './StandingsStatsHeader.scss';

const TOURNAMENT = localization.get('tournament');

/**
 * Adss abbreviation for mls group name in mobile
 * @param {string} groupName The groupName
 * @param {bool} isMobile if we are in mobile size
 * @returns {string}
 */
const abrreviateGroupName = (groupName, isMobile) => {
  if (groupName === 'groupEast' && isMobile) {
    return localization.get(`${groupName}Mobile`);
  }
  if (groupName === 'groupWest' && isMobile) {
    return localization.get(`${groupName}Mobile`);
  }
  return localization.get(groupName);
};
/**
 * A Standings row header
 * @param {Object} props The scoping label and competition scope
 * @returns {JSX}
 */
const StandingsStatsHeader = (props) => {
  const {
    scopingLabel,
    competitionScope, hasRelegation, isMobile, hasTooltip, hasPointsPerGame, isWorldCupMVP,
  } = props;
  const compScope = localization.get(competitionScope);
  let headers = hasRelegation ? standingHeader(localization.get('relegation'))
    : standingHeader(compScope);
  if (isValidArray(headers)) {
    headers = headers.map((content, idx) => (
      <th
        key={`header-${content}`}
        className={classnames(
          {
            [Styles.teamSizeTopSmall]: idx === 0,
            [Styles.teamSizeTop]: idx === 0 && !isMobile,
            [Styles.stat]: idx > 0,
            [Styles.hide]: (idx === 8 && isMobile) || (idx === 9 && isMobile)
            || ((idx > 7 || idx === 4) && isMobile && hasPointsPerGame)
            || (idx === 3 && !hasPointsPerGame && compScope === TOURNAMENT),
            [Styles.highlight]: idx === 3 && hasPointsPerGame,
          },
        )}
        scope="col"
      >
        {idx === 0 && scopingLabel === '' && content[0]}
        {idx === 0
          && scopingLabel !== ''
          && scopingLabel
          && abrreviateGroupName(camelCase(scopingLabel), isMobile)}
        {hasTooltip && idx > 0 && <Tooltip label={content[1]}>{content[0]}</Tooltip>}
        {!hasTooltip && idx > 0 && content[0]}
      </th>
    ));
    return (
      <tr className={classnames(Styles.standingsTopSmall, {
        [Styles.standingsTop]: !isMobile,
        [Styles.headColor]: !isWorldCupMVP,
        [Styles.headColorMvp]: isWorldCupMVP,
      })}
      >
        {headers}
      </tr>
    );
  }
  return <div />;
};

/**
 * @property {array} scopingLabel - Type of scope
 * @property {array} competitionScope - Group or tournament scope
 * @property {array} hasRelegation - if has relegation of the team
 * @property {bool} hasPointsPerGame - if stats have points per game
 */
StandingsStatsHeader.propTypes = {
  scopingLabel: PropTypes.string,
  competitionScope: PropTypes.string,
  hasRelegation: PropTypes.bool,
  isMobile: PropTypes.bool,
  hasTooltip: PropTypes.bool,
  hasPointsPerGame: PropTypes.bool,
  isWorldCupMVP: PropTypes.bool,
};

StandingsStatsHeader.defaultProps = {
  scopingLabel: '',
  competitionScope: '',
  hasRelegation: false,
  isMobile: false,
  hasTooltip: false,
};

export default StandingsStatsHeader;
