import React from 'react';
import PropTypes from 'prop-types';
import { isValidArray } from '@univision/fe-commons/dist/utils/helpers';
import leagues from '../../../utils/mocks/competitions.json';
import tournaments from '../../../utils/mocks/tournaments.json';
import confederations from '../../../utils/mocks/confederations.json';
import LeagueGrid from '../../base/LeagueGrid';
import Styles from './LeaguesAndTournaments.scss';

/**
 * A lineup team displaying logo name and list of players
 * @param {Object} props The details of the players, lineup and  formation position
 * @returns {JSX}
 */
const LeaguesAndTournaments = (props) => {
  const { settings } = props;
  const {
    leagueData = [],
    tournamentData = [],
    showLeagues,
    showTournaments,
    styleType,
    showConfederations,
  } = settings;
  const league = isValidArray(leagueData) ? leagueData : leagues;
  const tournament = isValidArray(tournamentData) ? tournamentData : tournaments;
  return (
    <div>
      {showLeagues
        && <LeagueGrid title="popularLeagues" data={league} type={styleType} className={Styles.top} isTudn />
      }
      {showTournaments
        && <LeagueGrid title="popularTournaments" data={tournament} type={styleType} className={Styles.bottom} isTournamentGrid isTudn />
      }
      {showConfederations
        && <LeagueGrid title="confederations" data={confederations} type={styleType} className={Styles.bottom} isTournamentGrid isTudn />
      }
    </div>
  );
};

/**
 * propTypes
 * @property {array} leagueData data of Leagues
 * @property {array} tournamentData data of Tournaments
 * @property {string} showLeagues to show leagues
 * @property {string} showTournaments to show tornaments
 * @property {string} styleType design version: square or bar
 */
LeaguesAndTournaments.propTypes = {
  settings: PropTypes.object,
};

/**
 * Default Prop Values
 */
LeaguesAndTournaments.defaultProps = {
  settings: {
    styleType: 'square',
    showLeagues: false,
    showTournaments: false,
    showConfederations: false,
  },
};

export default LeaguesAndTournaments;
