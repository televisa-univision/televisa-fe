/* eslint-disable require-jsdoc */
import React from 'react';

import { storiesOf } from '@storybook/react';

import TimeLabel from '.';

storiesOf('Text/TimeLabel', module)
  .add('Spanish', () => <TimeLabel language="es" />)
  .add('English', () => <TimeLabel />);
