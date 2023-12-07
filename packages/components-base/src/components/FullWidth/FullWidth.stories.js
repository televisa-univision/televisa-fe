import React from 'react';

import { storiesOf } from '@storybook/react';

import Styles from './FullWidth.stories.scss';
import FullWidth from '.';

storiesOf('Layout/FullWidth', module)
  .add('at all breakpoints', () => {
    return (
      <div className={Styles.container}>
        <FullWidth>
          <div className={Styles.box}>
            <h1>Full width child</h1>
            <p>100% viewport width at all breakpoints. This is the default behavior</p>
          </div>
        </FullWidth>
      </div>
    );
  })
  .add('xs and down', () => {
    return (
      <div className={Styles.container}>
        <FullWidth breakpoints={['xs', 'xxs']}>
          <div className={Styles.box}>
            <h1>Mobile full width child</h1>
            <p>
              Resize window to see mobile behavior. overridden via <code>breakpoints</code> prop.
            </p>
          </div>
        </FullWidth>
      </div>
    );
  })
  .add('md only', () => {
    return (
      <div className={Styles.container}>
        <FullWidth breakpoints={['md']}>
          <div className={Styles.box}>
            <h1>Tablet full width child</h1>
            <p>
              Resize window to see tablet behavior. overridden via <code>breakpoints</code> prop.
            </p>
          </div>
        </FullWidth>
      </div>
    );
  });
