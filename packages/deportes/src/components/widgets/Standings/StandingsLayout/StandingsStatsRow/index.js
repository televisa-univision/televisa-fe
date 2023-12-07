import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { getKey } from '@univision/fe-commons/dist/utils/helpers';

import Team from '@univision/shared-components/dist/components/v2/Team';

import Styles from './StandingsStatsRow.scss';

/**
 * A Stat row consisting of team name and stats
 * @param {Object} props The details of the players, lineup and  formation position
 * @returns {JSX}
 */
const StandingsStatsRow = (props) => {
  const {
    stats, position, className, isFull, hasRelegation, isMobile, isTudn, hasPointsPerGame,
  } = props;
  const ra = `${getKey(stats, 'ra')}`;
  return (
    <tr className={classnames(className, Styles.statsSmall, 'uvs-font-a-regular', { [Styles.stats]: !isMobile })}>
      <td className={classnames('uvs-font-a-bold', Styles.counterSmall, { [Styles.counter]: !isMobile })}>
        {position + 1}.
      </td>
      <td className={Styles.team}>
        {isMobile ? (
          <Team
            name={stats.team.name}
            className={`teamMobile ${Styles.teamSizeSmall}`}
            size="small"
            isAbbreviated
            truncateAt={35}
          />
        ) : (
          <Team
            name={stats.team.name}
            className={`teamDesktop ${Styles.teamSizeSmall} ${Styles.teamSize}`}
            isAbbreviated={false}
            size="medium"
            truncateAt={165}
          />
        )}
      </td>
      <td className={Styles.outcome} key="rank-compare">
        <div
          className={classnames(Styles.rank, {
            [Styles.up]: stats.rankCompare > 0,
            [Styles.rankCollapsed]: !isFull && !isMobile,
            [Styles.down]: stats.rankCompare < 0,
            [Styles.hide]: hasRelegation,
            [Styles.isTudn]: isTudn,
          })}
        />
      </td>
      <td
        className={classnames(
          Styles.outcome,
          'uvs-font-a-bold',
          { [Styles.hide]: !hasRelegation }
        )}
        key="relegation-average"
      >
        {`${isMobile && hasRelegation && ra.length > 2 ? ra.substring(0, 3) : ra}%`}
      </td>
      <td className={`${Styles.outcome} uvs-font-a-bold`} key="standing-points">
        {stats.pt}
      </td>
      <td className={classnames(Styles.outcome, 'uvs-font-a-bold', { [Styles.hide]: !hasPointsPerGame || hasRelegation })} key="points-per-game">
        {stats.ppg}
      </td>
      <td className={classnames(Styles.outcome, { [Styles.hide]: hasPointsPerGame && isMobile })} key="events-played">
        {stats.pj}
      </td>
      <td className={classnames(Styles.outcome, { [Styles.hide]: hasRelegation })} key="wins">
        {stats.pg}
      </td>
      <td className={classnames(Styles.outcome, { [Styles.hide]: hasRelegation })} key="ties">
        {stats.pe}
      </td>
      <td className={classnames(Styles.outcome, { [Styles.hide]: hasRelegation })} key="losses">
        {stats.pp}
      </td>
      <td className={classnames(Styles.outcome, { [Styles.hide]: hasRelegation || isMobile })} key="goals-scored">
        {stats.ga}
      </td>
      <td className={classnames(Styles.outcome, { [Styles.hide]: hasRelegation || isMobile })} key="goals-against">
        {stats.gc}
      </td>
      <td className={classnames(Styles.outcome, 'uvs-font-a-bold', { [Styles.hide]: hasPointsPerGame && isMobile })} key="goal-difference">
        {stats.dg}
      </td>
    </tr>
  );
};

/**
 * @property {Object} stats - the stats to render
 * @property {string} className - modifier class
 * @property {number} position - of the team
 * @property {bool} isTudn - tudn theme support
 * @property {bool} isFull - is full version
 */
StandingsStatsRow.propTypes = {
  stats: PropTypes.object,
  className: PropTypes.string,
  position: PropTypes.number,
  isTudn: PropTypes.bool,
  isFull: PropTypes.bool,
  hasRelegation: PropTypes.bool,
  isMobile: PropTypes.bool,
  hasPointsPerGame: PropTypes.bool,
};

StandingsStatsRow.defaultProps = {
  stats: {},
  className: '',
  isFull: false,
  hasRelegation: false,
  isMobile: false,
};

export default StandingsStatsRow;
