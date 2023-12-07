import React from 'react';
import { storiesOf } from '@storybook/react';

import standingsExtractor from '@univision/shared-components/dist/extractors/standingsExtractor';

import data from './__mocks__/teams.json';
import Teams from '.';

const props = standingsExtractor(data);

storiesOf('Widgets/WorldCup/Teams', module)
  .add('default', () => (<Teams {...props} />));
