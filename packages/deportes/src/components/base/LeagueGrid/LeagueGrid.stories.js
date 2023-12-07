import React from 'react';

import { storiesOf } from '@storybook/react';

import data from '../../../utils/mocks/competitions.json';
import LeagueGrid from '.';

storiesOf('Base/LeagueGrid', module)
  .addDecorator(story => <div className="uvs-container">{story()}</div>)
  .add('default league grid', () => (
    <LeagueGrid
      title="Ligas Populares"
      data={data}
    />
  ))
  .add('TUDN league grid', () => (
    <LeagueGrid
      title="TUDN Ligas Populares"
      isTudn
      data={data}
    />
  ));
