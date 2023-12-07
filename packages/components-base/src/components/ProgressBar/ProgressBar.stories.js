import React from 'react';

import { storiesOf } from '@storybook/react';

import ProgressBar from '.';

const props = {
  percent: 50,
  strokeColor: 'green',
  trailColor: 'black',
  trailSize: 30,
  rounded: false,
};

storiesOf('Widgets/ProgressBar', module)
  .add('Default', () => (
    <div>
      <ProgressBar percent={80} />
      <br />
      <ProgressBar percent={40} />
    </div>
  ))
  .add('Rounded', () => (
    <div>
      <ProgressBar percent={20} rounded />
      <br />
      <ProgressBar percent={90} rounded />
    </div>
  ))
  .add('Custom Styles', () => (
    <div>
      <ProgressBar {...props} />
    </div>
  ));
