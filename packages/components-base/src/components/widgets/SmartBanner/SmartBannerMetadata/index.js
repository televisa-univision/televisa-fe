import React from 'react';
import PropTypes from 'prop-types';

import { getTracking } from '@univision/fe-commons/dist/utils/smartapp';

import Head from '../../../HeadHelmet';

/**
 * Meta tag to smartBanner on IOS
 * @param {Object} props - the component props
 * @access public
 * @returns {?JSX}
 */
const SmartBannerMetadata = ({ appId, deepLink, trackingId }) => {
  // Only add in SSR and on IOS
  if (typeof window !== 'undefined' || !appId) {
    return null;
  }

  const deepLinkParam = deepLink ? `, app-argument=${deepLink}` : '';

  return (
    <Head>
      <meta
        name="apple-itunes-app"
        content={`app-id=${appId}${deepLinkParam}${getTracking(trackingId)}`}
      />
    </Head>
  );
};

/**
 * propTypes
 * @property {string} appId - IOS app Id
 * @property {string} [deepLink] - app deepLink to open (Only native IOS)
 * @property {string} [trackingId] - appsflyer tracking Id
 */
SmartBannerMetadata.propTypes = {
  appId: PropTypes.string,
  deepLink: PropTypes.string,
  trackingId: PropTypes.string,
};

export default SmartBannerMetadata;
