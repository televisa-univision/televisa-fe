import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import FWAdStandAlone from './FWAdStandAlone';
import { pageData } from '../../../../config/storyMocks';
import Styles from './FWAdStandAlone.stories.scss';
import * as AdTypes from '../../../../utils/ads/ad-types';

storiesOf('Ads/FWAdStandAlone', module)
  .add(
    'Facilitate calls for creative like SLED',
    withInfo('This is the basic usage with props for SLED ad.')(() => (
      <div>
        <p>
          The component will render an iframe that calls the FreeWheel server.
        </p>
        <p className={Styles.italic}>
          Review the network tab to see a call to https://1b656.v.fwmrm.net/ad/g/1
        </p>
        <FWAdStandAlone
          width="1"
          height="3"
          adType={AdTypes.SLED_AD}
          pageData={pageData}
        />
      </div>
    ))
  );
