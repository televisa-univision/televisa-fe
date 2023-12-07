import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import BKPIndicator from '../BreakPointIndicator';
import ResponsiveLoader from '.';
import Styles from './ResponsiveLoader.stories.scss';

storiesOf('Responsive/ResponsiveLoader', module)
  .add(
    'with desktop breakpoint',
    withInfo('Limits render children on particular breakpoint')(() => (
      <div>
        <BKPIndicator />
        <p>Resize the window and reload to see that child div only renders in md breakpoint</p>
        <ResponsiveLoader breakpoints={['md']}>
          <div className={Styles.box}>Sample child div</div>
        </ResponsiveLoader>
      </div>
    ))
  );
