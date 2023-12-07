import React from 'react';
import { storiesOf } from '@storybook/react';

import {
  TROPICAL_RAIN_FOREST,
} from '@univision/fe-commons/dist/utils/styled/constants';

import TitleBack from '.';

storiesOf('Clickable/TitleBack', module)
  .addDecorator(story => (
    <div className="uvs-container">
      {story()}
    </div>
  ))
  .add('Default', () => (
    <TitleBack label="Hello World" />
  ))
  .add('Chage color ex. TUDN', () => (
    <TitleBack label="Hello World" color={TROPICAL_RAIN_FOREST} />
  ));
