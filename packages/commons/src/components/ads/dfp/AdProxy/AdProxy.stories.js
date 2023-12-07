import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import DFPAdsProvider from '../DFPAdsProvider';
import BKPIndicator from '../../../breakpoint/BreakPointIndicator';
import { pageData } from '../../../../config/storyMocks';
import AdProxy from '.';
import * as AdTypes from '../../../../utils/ads/ad-types';

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

storiesOf('Ads/AdProxy', module)
  .add('with default props', withInfo('This is the basic usage with a list as child.')(() => (
    <AdContainer>
      <AdProxy type={AdTypes.TOP_AD} />
    </AdContainer>
  )))
  .add('with backgorund', withInfo('This is the basic usage with a list as child.')(() => (
    <AdContainer>
      <AdProxy type={AdTypes.TOP_AD} hasBg />
    </AdContainer>
  )));
