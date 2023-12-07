import React from 'react';

import { storiesOf } from '@storybook/react';

import IconWrapper from '.';
import Styles from './IconWrapper.stories.scss';

storiesOf('Widgets/IconWrapper', module)
  .add('Default', () => (
    <div className={Styles.container}>
      <IconWrapper iconName="key" />
    </div>
  ))
  .add('variant `light` and className', () => (
    <div className={Styles.container}>
      <IconWrapper iconName="playnocircle" variant="light" className={Styles.icon} />
    </div>
  ));
