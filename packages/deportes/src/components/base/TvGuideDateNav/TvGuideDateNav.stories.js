import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import TvGuideDateNav from '.';

const onPressAction = action('Date changed');

const currentDate = new Date().getDate();
const startDate = new Date();
startDate.setHours(5);
startDate.setMinutes(0);
storiesOf('Base/TvGuideDateNav', module)
  .add('default', () => (
    <TvGuideDateNav startDate={startDate} onPress={onPressAction} activeDate={currentDate} />
  ));
