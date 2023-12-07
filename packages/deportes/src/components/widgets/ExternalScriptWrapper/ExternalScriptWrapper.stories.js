import React from 'react';

import { storiesOf } from '@storybook/react';

import ExternalScriptWrapper from '.';

storiesOf('Widgets/ExternalScriptWrapper', module)
  .add('with league ranking', () => (
    <ExternalScriptWrapper competition="199" season="2017" type="ranking" />
  ))
  .add('with squad type', () => (
    <ExternalScriptWrapper competition="5" season="2016" team="178" type="squad" />
  ))
  .add('with team stats type', () => (
    <ExternalScriptWrapper competition="5" season="2016" team="178" type="stats" />
  ))
  .add('with team player ranking type', () => (
    <ExternalScriptWrapper competition="339" season="112018" team="659" type="player" />
  ))
  .add('with player stats type', () => (
    <ExternalScriptWrapper competition="4" season="2017" team="632" type="playerStats" />
  ))
  .add('with team comparison type', () => (
    <ExternalScriptWrapper competition="4" season="2013" teamCompare="632,832" type="teamCompare" />
  ))
  .add('with heatmap type', () => (
    <ExternalScriptWrapper competition="4" season="2017" match="958022" type="heatmap" />
  ))
  .add('with heatmap and team comparison', () => (
    <ExternalScriptWrapper
      competition="4"
      season="2017"
      match="958022"
      teamCompare="632,832"
      type="compareHeatmap"
    />
  ));
