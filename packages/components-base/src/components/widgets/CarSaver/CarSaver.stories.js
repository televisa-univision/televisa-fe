import React from 'react';

import { storiesOf } from '@storybook/react';

import CarSaver from '.';

storiesOf('Widgets/CarSaver', module)
  .add('horizontal', () => (
    <CarSaver orientation="horizontal" />
  ))
  .add('vertical', () => (
    <CarSaver orientation="vertical" />
  ));
