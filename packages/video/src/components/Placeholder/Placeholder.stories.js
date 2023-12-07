/* eslint-disable require-jsdoc */
import React from 'react';

import { storiesOf } from '@storybook/react';

import Placeholder from '.';

storiesOf('Widgets/Placeholder', module)
  .add('Default', () => (
    <Placeholder />
  ));
