import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';

import DFPAdsProvider from '@univision/fe-commons/dist/components/ads/dfp/DFPAdsProvider';
import BKPIndicator from '@univision/fe-commons/dist/components/breakpoint/BreakPointIndicator';
import { pageData } from '@univision/fe-commons/dist/config/storyMocks';
import * as AdTypes from '@univision/fe-commons/dist/utils/ads/ad-types';
import Advertisement from '.';

/**
 * Set up wrapper
 * @param {Object} props to use
 * @returns {JSX}
 */
const AdContainer = ({ children }) => (
  <div>
    <BKPIndicator />
    <DFPAdsProvider
      env={pageData.env}
      settings={pageData.data.adSettings}
      requestParams={pageData.data.requestParams}
    >
      {children}
    </DFPAdsProvider>
  </div>
);

AdContainer.propTypes = {
  children: PropTypes.node,
};

const settings = {
  type: AdTypes.TOP_AD,
  hasBg: true,
};

storiesOf('Widgets/Advertisement', module)
  .add('with background', () => (
    <AdContainer>
      <Advertisement settings={settings} />
    </AdContainer>
  ));
