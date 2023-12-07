import React from 'react';

import { storiesOf } from '@storybook/react';

import MatchInfoCard from '.';

storiesOf('Widgets/PreMatch/PreMatchLayout/MatchInfoCards/MatchInfoCard', module)
  .add('with field icon', () => (
    <MatchInfoCard type="field" info="Estadio Azteca" />))
  .add('with cup icon', () => (
    <MatchInfoCard type="cup" info="Liga Mx - Jornada 8" />))
  .add('with screen icon', () => (
    <MatchInfoCard type="screen" info="Galavision" />))
  .add('with fault icon', () => (
    <MatchInfoCard type="fault" info="Archundia" />))
  .add('with screen icon no data', () => (
    <MatchInfoCard type="screen" info="" />))
  .add('with screen icon and data', () => (
    <MatchInfoCard type="screen" info="UDN" logo="https://neulionsmbnyc-a.akamaihd.net/u/univisionnow2/thumbs/channels/68_es.png" />));
