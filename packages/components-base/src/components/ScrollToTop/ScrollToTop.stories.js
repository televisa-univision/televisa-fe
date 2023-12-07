/* eslint-disable require-jsdoc */
import React from 'react';

import { storiesOf } from '@storybook/react';

import ScrollToTop from '.';

const Wrapper = props => (
  <div style={{ height: '200vh' }}>
    <p>Scroll down to view</p>
    <p><em>Note: this component is only visible on narrow viewports.</em></p>
    <ScrollToTop {...props} />
  </div>
);

storiesOf('Clickable/ScrollToTop', module)
  .add('Default', () => <Wrapper showAtOffset={50} />);
