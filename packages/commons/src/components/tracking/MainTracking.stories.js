import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import Store from '../../store/store';

import MainTracking from './MainTracking';

storiesOf('Tracking/MainTracking', module)
  .add(
    'Load tracking managers',
    withInfo('The tracking SDKs should be present in the Network tab')(() => (
      <div>
        <p>
          Open the Network tab and look for:
          <ul>
            <li>utag.js (tealium)</li>
            <li>PDB44FE12-8611-4D9B-8C88-18023F94B474.js (nielsen)</li>
            <li>beacon.js (comScore)</li>
          </ul>
        </p>
        <MainTracking contentType="test" page={Store.getState().page} />
      </div>
    ))
  );
