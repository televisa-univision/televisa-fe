import React from 'react';
import PropTypes from 'prop-types';

import AdProxy from '@univision/fe-commons/dist/components/ads/dfp/AdProxy';

/**
 * Wrapper for dfp ads
 * @param {Object} settings to conf the widget
 * @returns {JSX}
 */
const Advertisement = ({ settings }) => <AdProxy {...settings} />;

Advertisement.propTypes = {
  settings: PropTypes.shape({
    type: PropTypes.string,
    isLazyLoaded: PropTypes.bool,
    hasBg: PropTypes.bool,
    callback: PropTypes.func,
    trackingValue: PropTypes.string,
  }),
};

export default Advertisement;
