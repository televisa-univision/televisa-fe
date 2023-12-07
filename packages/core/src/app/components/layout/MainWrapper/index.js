import React from 'react';
import PropTypes from 'prop-types';

import features from '@univision/fe-commons/dist/config/features';
import { getKey } from '@univision/fe-commons/dist/utils/helpers';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import * as languages from '@univision/fe-commons/dist/utils/localization/languages';
import adHelper from '@univision/fe-commons/dist/utils/ads/adHelper';

import * as AdTypes from '@univision/fe-commons/dist/utils/ads/ad-types';

import DFPAdsProvider from '@univision/fe-commons/dist/components/ads/dfp/DFPAdsProvider';
import BKPIndicator from '@univision/fe-commons/dist/components/breakpoint/BreakPointIndicator';
import MainTracking from '@univision/fe-commons/dist/components/tracking/MainTracking';
import ErrorBoundary from '@univision/fe-commons/dist/components/ErrorBoundary';
import WithPage from '@univision/fe-commons/dist/components/WithPage/WithPage';

import Styles from './MainWrapper.scss';

/**
 * App Container Component used to wrap together all the main components
 * @param {Object} props React Props for this component
 * @param {Node} props.children react children
 * @param {boolean} props.dfpSupport determines if dfp is supported
 * @param {Object} props.state the page state from redux
 * @returns {JSX}
 */
function MainWrapper({
  children,
  connectTracking,
  dfpSupport,
  state,
}) {
  // Using `|| ${defaultValue}` because the API could return null for any of these properties, and
  // the getKey helper only uses fallback if the value it gets is undefined.
  const page = getKey(state, 'page') || {};
  const data = page.data || {};
  // We want contentType to explicitly be `null` if we get undefined as its value
  const contentType = data.type || null;
  const language = page.language || languages.ES;
  const disableAds = !dfpSupport || features.content.isSensitive(page);

  const Tracking = connectTracking ? WithPage(MainTracking) : MainTracking;

  localization.setLanguage(language);

  return (
    <div className="app-container">
      <ErrorBoundary>
        {!page.isSpa && <BKPIndicator />}
        <Tracking
          contentType={contentType}
          page={page}
        />
        {!disableAds ? (
          // this flag suppress dfp library calls
          // if content type is not showing any dfp ad
          // like video
          <DFPAdsProvider>
            <div className={Styles.specialAds}>
              {adHelper.getAd(AdTypes.CUSTOM_OFFERING_AD_1X1, { isLazyLoaded: false })}
              {adHelper.getAd(AdTypes.CUSTOM_OFFERING_AD_1X2, { isLazyLoaded: false })}
              {adHelper.getAd(AdTypes.CUSTOM_OFFERING_AD_1X5, { isLazyLoaded: false })}
            </div>
            {children}
          </DFPAdsProvider>
        ) : (
          children
        )}
      </ErrorBoundary>
    </div>
  );
}

/**
 * propTypes
 */
MainWrapper.propTypes = {
  children: PropTypes.node,
  connectTracking: PropTypes.bool,
  dfpSupport: PropTypes.bool,
  state: PropTypes.shape({
    page: PropTypes.shape({
      language: PropTypes.string,
      env: PropTypes.string,
      requestParams: PropTypes.object,
      data: PropTypes.shape({
        tracking: PropTypes.object,
        adSettings: PropTypes.object,
        type: PropTypes.string,
      }),
    }).isRequired,
  }),
};

MainWrapper.defaultProps = {
  dfpSupport: true,
  connectTracking: false,
};

export default MainWrapper;
