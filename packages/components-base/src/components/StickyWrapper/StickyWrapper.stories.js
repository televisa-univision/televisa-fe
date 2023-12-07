import React from 'react';

import { storiesOf } from '@storybook/react';
import Header from '../Header';
import StickyWrapper from '.';

storiesOf('Layout/StickyWrapper', module)
  .add('Default', () => (
    <StickyWrapper>
      <Header />
    </StickyWrapper>
  ));
