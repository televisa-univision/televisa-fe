import React from 'react';

import { storiesOf } from '@storybook/react';
import Styles from './LiveLabel.stories.scss';
import supportedLiveLabels from './data/config.json';

import LiveLabel from '.';

const defaultProps = {
  icon: 'dot',
  type: 'liveblog',
  videoType: 'livestream',
};

const positions = [
  'center',
  'topLeft',
  'topRight',
  'bottomRight',
  'bottomLeft',
];

const sizes = [
  'small',
  'large',
  'extralarge',
];

const Stories = storiesOf('Widgets/LiveLabel', module);

// sizes
sizes.forEach(size => (
  Stories
    .add(`size: ${size}`, () => (
      <div className={Styles.container}>
        <LiveLabel
          size={size}
          type={defaultProps.type}
        />
      </div>
    ))
));

// positions
positions.forEach(position => (
  Stories
    .add(`pos: ${position}`, () => (
      <div className={Styles.container}>
        <LiveLabel
          authRequired
          position={position}
          type={defaultProps.type}
        />
      </div>
    ))
));

// types
Object.keys(supportedLiveLabels).forEach(liveLabel => (
  Stories
    .add(`type: ${liveLabel}`, () => (
      <LiveLabel type={liveLabel} />
    ))
));

Stories
  .add('w/ auth', () => (
    <div className={Styles.container}>
      <LiveLabel
        authRequired
        type={defaultProps.type}
      />
    </div>
  ))
  .add('w/ auth large', () => (
    <div className={Styles.container}>
      <LiveLabel
        authRequired
        size="large"
        type="livestream"
      />
    </div>
  ));
