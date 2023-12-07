import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { isValidArray } from '@univision/fe-commons/dist/utils/helpers';
import SquadStatsRow from '../SquadStatsRow';
import SquadStatsHeader from '../SquadStatsHeader';

import Styles from './SquadTable.scss';

/**
 * Squad table view
 * @param {array} playerList - The squad player lis data
 * @param {function} playerTracker - the tracking function for players
 * @returns {JSX}
 */
const SquadTable = ({ playerList, playerTracker }) => {
  if (isValidArray(playerList)) {
    return (
      <table className={Styles.table}>
        <thead>
          <SquadStatsHeader scopingLabel="Squad" />
        </thead>
        <tbody>
          {isValidArray(playerList)
        && playerList.map((content, ind) => (
          <SquadStatsRow
            className={classnames({ [Styles.light]: ind % 2 !== 0 })}
            key={content.id}
            playerTracker={playerTracker}
            {...content}
          />
        ))}
        </tbody>
      </table>
    );
  }
  return <div />;
};

/**
 * @property {Object} playerList - the squad player lis data
 * @property {function} playerTracker - the tracking function for players
 */
SquadTable.propTypes = {
  playerList: PropTypes.array,
  playerTracker: PropTypes.func,
};

SquadTable.defaultProps = {
  playerList: {},
};

export default SquadTable;
