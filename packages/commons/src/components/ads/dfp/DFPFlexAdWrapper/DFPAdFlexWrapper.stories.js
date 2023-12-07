import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import DFPAdsProvider from '../DFPAdsProvider';
import BKPIndicator from '../../../breakpoint/BreakPointIndicator';
import { pageData } from '../../../../config/storyMocks';
import DFPAdFlexWrapper from '.';
import * as AdTypes from '../../../../utils/ads/ad-types';
import Styles from './DFPAdFlexWrapper.stories.scss';

storiesOf('Ads/DFPAdFlexWrapper', module)
  .add('with a list', withInfo('This is the basic usage with a list as child.')(() => (
    <div className={Styles.container}>
      <BKPIndicator />
      <DFPAdsProvider
        env={pageData.env}
        settings={pageData.data.adSettings}
        requestParams={pageData.data.requestParams}
      >
        <DFPAdFlexWrapper adType={AdTypes.WIDGET_AD}>
          <ul className={Styles.list}>
            <li>A</li>
            <li>B</li>
            <li>C</li>
          </ul>
        </DFPAdFlexWrapper>
      </DFPAdsProvider>
    </div>
  )));
