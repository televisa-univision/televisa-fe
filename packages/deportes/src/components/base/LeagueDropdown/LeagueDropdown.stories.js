import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import leagues from '../../../utils/mocks/leagues.json';
import LeagueDropdown from '.';
import Styles from './LeagueDropdown.stories.scss';

const onChangeAction = action('League changed');
const teamStats = {
  leagues,
};

storiesOf('Base/LeagueDropdown/default', module)
  .add('default', () => (
    <LeagueDropdown {...teamStats} />))
  .add('with league active', () => (
    <LeagueDropdown {...teamStats} currentLeague="199" />))
  .add('with callback onChange', () => (
    <LeagueDropdown {...teamStats} onChange={onChangeAction} />))
  .add('with custom class and label', () => (
    <LeagueDropdown
      defaultLabel="-- Ligas --"
      className={Styles.dropdown}
      {...teamStats}
    />
  ));

storiesOf('Base/LeagueDropdown/black', module)
  .add('default', () => (
    <LeagueDropdown {...teamStats} isBlack />))
  .add('with league active', () => (
    <LeagueDropdown {...teamStats} currentLeague="199" isBlack />))
  .add('with callback onChange', () => (
    <LeagueDropdown {...teamStats} onChange={onChangeAction} isBlack />))
  .add('with custom class and label', () => (
    <LeagueDropdown
      defaultLabel="-- Ligas --"
      className={Styles.dropdown}
      {...teamStats}
      isBlack
    />
  ));

storiesOf('Base/LeagueDropdown/tudn', module)
  .add('default', () => (
    <LeagueDropdown {...teamStats} isTudn />))
  .add('with league active', () => (
    <LeagueDropdown {...teamStats} currentLeague="199" isTudn />))
  .add('with callback onChange', () => (
    <LeagueDropdown {...teamStats} onChange={onChangeAction} isTudn />))
  .add('with custom class and label', () => (
    <LeagueDropdown
      defaultLabel="-- Ligas --"
      className={Styles.dropdown}
      {...teamStats}
      isTudn
    />
  ));
