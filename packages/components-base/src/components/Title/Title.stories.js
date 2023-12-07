import React from 'react';
import { storiesOf } from '@storybook/react';

import Title from '.'; /* eslint-disable-line */

storiesOf('Text/Title', module)
  .add('Extra Small', () => <Title size="xsmall">This is a small heading</Title>)
  .add('Small', () => <Title size="small">This is a small heading</Title>)
  .add('Regular', () => <Title>This is a regular heading</Title>)
  .add('Large', () => <Title size="large">This is a large heading</Title>);
