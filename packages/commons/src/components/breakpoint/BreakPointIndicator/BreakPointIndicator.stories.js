import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import BKPIndicator from '.';
import BreakPoint from '../../../utils/breakpoint/breakPointMediator';
import Styles from './BreakPointIndicator.stories.scss';

storiesOf('Responsive/BreakPointIndicator', module).add(
  'default',
  withInfo('Combination of BreakPointIndicator component and BreakPointIndicator module.')(() => (
    <div>
      <BKPIndicator />
      <p>Resize the window and reload to see the different breakpoint values:</p>
      <p>
        <span className={Styles.label}> device:</span>
        {' '}
        <span>{BreakPoint.getDevice()}</span>
      </p>
      <p>
        <span className={Styles.label}>breakPoint:</span>
        <span>{BreakPoint.getValue()}</span>
      </p>
      <p>
        <span className={Styles.label}>width:</span>
        {' '}
        <span>{BreakPoint.getWidth()}</span>
      </p>
    </div>
  ))
);
