import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import localization from '@univision/fe-commons/dist/utils/localization/deportes';
import DateTime from '@univision/shared-components/dist/components/v2/DateTime';
import Image from '@univision/fe-components-base/dist/components/Image';
import Link from '@univision/fe-components-base/dist/components/Link';

import Styles from './SquadStatsRow.scss';

/**
 * A Squad row consisting of player name and stats
 * @param {Object} props The details of the player
 * @returns {JSX}
 */
const SquadStatsRow = (props) => {
  const {
    className,
    dateOfBirth,
    height,
    playerTracker,
    playerUrl,
    position,
    name,
    nationality,
    number,
    weight,
  } = props;
  return (
    <tr className={classnames(className, Styles.stats, 'uvs-font-a-regular')}>
      <td className={`uvs-font-a-bold ${Styles.number}`}>
        {number !== 'Unknown' ? number : '--'}
      </td>
      <td className={`${Styles.name} uvs-font-a-bold`}>
        <Link useExplicitNavigation href={playerUrl || null} onClick={playerUrl && playerTracker}>
          {name}
        </Link>
      </td>
      <td className={classnames(Styles.outcome)} key="position">
        {localization.get(`${position}Abbr`)}
      </td>
      <td className={`${Styles.outcome} ${Styles.nationality}`} key="nationality">
        <Image
          src={`https://secure.omo.akamai.opta.net/image.php?secure=true&h=secure.omo.akamai.opta.net&sport=football&entity=flags&description=countries&dimensions=150&id=${nationality}`}
        />
      </td>
      <td className={`${Styles.outcome} ${Styles.hideMobile}`} key="dob">
        {dateOfBirth !== 'Unknown' ? (
          <DateTime
            className={Styles.date}
            date={dateOfBirth}
            format="DD/MM/YY"
            capitalize
          />
        ) : '--'}
      </td>
      <td className={`${Styles.outcome} ${Styles.hideMobile}`} key="height">
        {height !== 'Unknown' ? `${height} cm` : '--'}
      </td>
      <td className={`${Styles.outcome} ${Styles.hideMobile}`} key="weight">
        {weight !== 'Unknown' ? `${weight} kg` : '--'}
      </td>
    </tr>
  );
};

/**
 * @property {string} className - modifier class
 * @property {string} dateOfBirth - squad players date of birth
 * @property {string} height - squad player height
 * @property {function} playerTracker - the tracking function for players
 * @property {string} playerUrl - the squad player url
 * @property {string} position - squad player position
 * @property {string} name - squad player name
 * @property {string} nationality - squad player nationality
 * @property {number} number - squad player team number
 * @property {bool} weight - squad player weight
 */
SquadStatsRow.propTypes = {
  className: PropTypes.string,
  dateOfBirth: PropTypes.string,
  height: PropTypes.string,
  playerTracker: PropTypes.func,
  playerUrl: PropTypes.string,
  position: PropTypes.string,
  name: PropTypes.string,
  nationality: PropTypes.string,
  number: PropTypes.string,
  weight: PropTypes.string,
};

SquadStatsRow.defaultProps = {
  className: '',
};

export default SquadStatsRow;
