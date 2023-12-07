import React from 'react';
import PropTypes from 'prop-types';

import MainTracking from '@univision/fe-commons/dist/components/tracking/MainTracking';

/**
 * Nielsen tracking for AMP pages.
 * https://engineeringportal.nielsen.com/docs/DCR_Static_Google_AMP_Cloud_API
 * @param {Object} pageData The page data from API
 * @returns {XML}
 * @constructor
 */
const Nielsen = ({ page }) => {
  const trackingData = MainTracking.getNielsenConfig({ data: page?.data }) || {};
  const { common: { section, segA, segB } = {}, appId = '' } = trackingData;
  const dcrTags = {
    vars: {
      apid: appId.substring(1),
      apv: '1.0',
      apn: page?.site,
      section,
      segA: segA || '',
      segB: segB || '',
      segC: 'Google AMP',
    },
  };

  return (
    <amp-analytics type="nielsen">
      <script
        type="application/json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(dcrTags) }}
      />
    </amp-analytics>
  );
};

/**
 * propTypes
 * @property {Object} page - The page object from content API
 */
Nielsen.propTypes = {
  page: PropTypes.object,
};

export default Nielsen;
