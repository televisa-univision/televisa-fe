import React from 'react';
import { storiesOf } from '@storybook/react';

import Placeholder from '.';
import mockData from './mockData.json';

storiesOf('Inline Slideshow / Placeholder', module)
  .add('default', () => {
    return <Placeholder {...mockData} />;
  });
