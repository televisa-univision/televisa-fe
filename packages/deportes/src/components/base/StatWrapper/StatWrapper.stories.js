import React from 'react';

import { storiesOf } from '@storybook/react';
import standingsExtractor from '@univision/shared-components/dist/extractors/standingsExtractor';

import StatWrapper from '.';
import standing from '../../../utils/mocks/standings.json';
import leagues from '../../../utils/mocks/leagues.json';
import Standings from '../../widgets/Standings';

const settings = {
  highlightedCompetitionSeasons: leagues,
};
const dataStanding = standingsExtractor(standing);

storiesOf('Base/StatWrapper', module)
  .add('default', () => (
    <StatWrapper>
      Widget Here!
    </StatWrapper>
  ))
  .add('with border', () => (
    <StatWrapper withBorder>
      Widget Here!
    </StatWrapper>
  ))
  .add('with standings widget', () => (
    <Standings
      standings={dataStanding}
      settings={settings}
    />
  ));
