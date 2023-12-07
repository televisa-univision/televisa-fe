import React from 'react';

import { storiesOf } from '@storybook/react';

import leagues from '../../../utils/mocks/competitions.json';
import tournaments from '../../../utils/mocks/tournaments.json';
import LeaguesAndTournamnets from '.';

const props = {
  settings: {
    leagueData: leagues,
    tournamentData: tournaments,
    showTournaments: true,
    showLeagues: true,
  },
};

storiesOf('Widgets/LeaguesAndTournaments', module)
  .add('leagues and tournaments: square', () => (
    <LeaguesAndTournamnets {...props} />))
  .add('leagues and tournaments: bar', () => (
    <LeaguesAndTournamnets {...{
      settings: Object.assign({
        styleType: 'bar',
      }, props.settings),
    }}
    />
  ));

const props2 = {
  settings: {
    leagueData: leagues,
    tournamentData: tournaments,
    showConfederations: true,
  },
};

storiesOf('Widgets/Confederations', module)
  .add('Confederations: square', () => (
    <LeaguesAndTournamnets {...props2} />))
  .add('Confederations: bar', () => (
    <LeaguesAndTournamnets {...{
      settings: Object.assign({
        styleType: 'bar',
      }, props2.settings),
    }}
    />
  ));
