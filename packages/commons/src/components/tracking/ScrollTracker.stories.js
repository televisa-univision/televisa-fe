import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';

import ScrollTracker from './ScrollTracker';
import Styles from './ScrollTracker.stories.scss';

storiesOf('Tracking/ScrollTracker', module)
  .add(
    'Tracks the scroll position',
    withInfo('This will log to the console when half and full scroll is reached')(() => (
      <ScrollTracker onFullScroll={action('full scroll')} onHalfScroll={action('half scroll')}>
        <div id={Styles.container}>
          <p>This will log an action when half scroll and full scroll is reached.</p>
          <p>Scroll down... ↓</p>
          <p>Scroll down... ↓</p>
          <p>Scroll down... ↓</p>
          <p>Scroll down... ↓</p>
          <p>Scroll down... ↓</p>
          <p>Scroll down... ↓</p>
          <p>Scroll down... ↓</p>
          <p>Scroll down... ↓</p>
          <p>Scroll down... ↓</p>
          <p>Scroll down... ↓</p>
          <p>Scroll down... ↓</p>
          <p>Scroll down... ↓</p>
          <p>Scroll down... ↓</p>
          <p>Scroll down... ↓</p>
          <p>Scroll down... ↓</p>
          <p>Scroll down... ↓</p>
          <p>Scroll down... ↓</p>
          <p>Scroll down... ↓</p>
          <p>Scroll down... ↓</p>
          <p>Scroll down... ↓</p>
          <p>Scroll down... ↓</p>
          <p>Scroll down... ↓</p>
          <p>Scroll down... ↓</p>
          <p>Scroll down... ↓</p>
          <p>Scroll down... ↓</p>
          <p>Scroll down... ↓</p>
          <p>Scroll down... ↓</p>
          <p>Scroll down... ↓</p>
          <p>Scroll down... ↓</p>
          <p>Scroll down... ↓</p>
          <p>Scroll down... ↓</p>
          <p>Scroll down... ↓</p>
          <p>Scroll down... ↓</p>
          <p>Scroll down... ↓</p>
          <p>Scroll down... ↓</p>
          <p>Scroll down... ↓</p>
          <p>Scroll down... ↓</p>
          <p>Scroll down... ↓</p>
          <p>Scroll down... ↓</p>
          <p>Scroll down... ↓</p>
          <p>Scroll down... ↓</p>
          <p>Scroll down... ↓</p>
          <p>Scroll down... ↓</p>
          <p>Scroll down... ↓</p>
          <p>Scroll down... ↓</p>
          <p>Scroll down... ↓</p>
          <p>Scroll down... ↓</p>
          <p>Scroll down... ↓</p>
        </div>
      </ScrollTracker>
    ))
  );
