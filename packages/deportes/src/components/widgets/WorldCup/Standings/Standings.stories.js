import React from 'react';
import { storiesOf } from '@storybook/react';

import standingsExtractor from '@univision/shared-components/dist/extractors/standingsExtractor';

import Standings from '.';
import data from './__mocks__/standings.json';

const props = {
  ...standingsExtractor(data),
  viewMoreLink: 'https://univision.com',
};

storiesOf('Widgets/WorldCup/Standings', module)
  .add('default', () => {
    return <Standings {...props} />;
  });
