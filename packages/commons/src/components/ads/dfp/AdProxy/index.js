import React from 'react';
import PropTypes from 'prop-types';
import adHelper from '../../../../utils/ads/adHelper';

/**
 * Wrapper around ad helper getter
 * @param {string} type of ad
 * @param {boolean} isLazyLoaded condition to lazyload
 * @param {boolean} hasBg condition to show background
 * @param {string} trackingValue ad tracking value
 * @param {function} onRegisterSlot callback to listen slot ad register
 * @returns {Object}
 */
const AdProxy = ({
  className,
  type,
  isLazyLoaded,
  hasBg,
  trackingValue,
  onRegisterSlot,
}) => {
  if (!type) {
    return null;
  }

  const Ad = adHelper.getAd(type, {
    isLazyLoaded,
    hasBg,
    trackingValue,
    onRegisterSlot,
  });

  if (className) {
    return (
      <div className={className}>
        {Ad}
      </div>
    );
  }
  return Ad;
};

AdProxy.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  isLazyLoaded: PropTypes.bool,
  hasBg: PropTypes.bool,
  trackingValue: PropTypes.string,
  onRegisterSlot: PropTypes.func,
};

AdProxy.defaultProps = {
  isLazyLoaded: true,
  hasBg: false,
};

export default AdProxy;
