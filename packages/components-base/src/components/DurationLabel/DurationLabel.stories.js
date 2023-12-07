import React from 'react';

import { storiesOf } from '@storybook/react';
import Styles from './DurationLabel.stories.scss';

import DurationLabel from '.';

const props = {
  duration: '31:02',
  position: 'bottomRight',
};

const variants = [
  'light',
  'dark',
];

const positions = [
  'topLeft',
  'topRight',
  'bottomRight',
  'bottomLeft',
];

const sizes = [
  'small',
  'medium',
  'large',
];

const Stories = storiesOf('Widgets/DurationLabel', module);

// variants
variants.forEach(variant => (
  Stories
    .add(`variant: ${variant}`, () => (
      <div className={Styles.container}>
        <DurationLabel
          contentProps={props}
          variant={variant}
        />
      </div>
    ))
));

// sizes
sizes.forEach(size => (
  Stories
    .add(`size: ${size}`, () => (
      <div className={Styles.container}>
        <DurationLabel
          contentProps={props}
          size={size}
        />
      </div>
    ))
));

// positions
positions.forEach(position => (
  Stories
    .add(`pos: ${position}`, () => (
      <div className={Styles.container}>
        <DurationLabel
          contentProps={props}
          position={position}
        />
      </div>
    ))
));
