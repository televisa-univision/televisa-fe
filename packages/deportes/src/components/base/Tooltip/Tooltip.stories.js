import React from 'react';

import { storiesOf } from '@storybook/react';

import Tooltip from '.';

storiesOf('Base/Tooltip', module)
  .addDecorator(story => (
    <div style={{ padding: '50px' }}>
      {story()}
    </div>
  ))
  .add('Default', () => (
    <Tooltip
      label="Tooltip here!"
    >
      <span>Hover Here</span>
    </Tooltip>
  ));
