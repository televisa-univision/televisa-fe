import React from 'react';
import PropTypes from 'prop-types';

/**
 * Tracking from apps flyer to IOS native smartBanner
 * @param {Object} props - the component props
 * @access public
 * @returns {?JSX}
 */
const SmartIosTracking = ({ appId, trackingId }) => {
  if (appId && trackingId) {
    return (
      <img
        src={`https://app.appsflyer.com/id${appId}?pid=ios_smart_banner&c=${trackingId}`}
        height="1"
        width="1"
        border="0"
        alt=""
        style={{ position: 'absolute' }}
      />
    );
  }
  return null;
};

/**
 * propTypes
 * @property {string} appId - IOS app Id
 * @property {string} trackingId - appsflyer tracking Id
 */
SmartIosTracking.propTypes = {
  appId: PropTypes.string,
  trackingId: PropTypes.string,
};

export default SmartIosTracking;
