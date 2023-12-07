import React from 'react';
import { storiesOf } from '@storybook/react';

import TropicalSystemsMap from '.';

storiesOf('Widgets/Weather/TWC', module)
  .add('TropicalSystemsMap with title', () => {
    return <TropicalSystemsMap settings={{ title: 'Sistemas Tropicales' }} />;
  })
  .add('TropicalSystemsMap with no title', () => {
    return <TropicalSystemsMap />;
  });
