import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';

import DFPAdsProvider from '@univision/fe-commons/dist/components/ads/dfp/DFPAdsProvider';
import BKPIndicator from '@univision/fe-commons/dist/components/breakpoint/BreakPointIndicator';
import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import { pageData } from '@univision/fe-commons/dist/config/storyMocks';
import SectionAd from '.';

Store.dispatch(setPageData(pageData));

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

const props = {
  settings: {
    slotId: 0,
  },
};

storiesOf('Widgets/SectionAd', module)
  .add('default', () => (
    <AdContainer>
      <SectionAd {...props} />
    </AdContainer>
  ));
