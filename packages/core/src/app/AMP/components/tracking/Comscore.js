import React from 'react';
import { comScoreConfig } from '@univision/fe-commons/dist/utils/tracking/comScore/comScoreManager';
/**
 * Comscore tracking for AMP pages.
 * @param {Object} pageData The page data from API
 * @returns {XML}
 * @constructor
 */
const Comscore = () => {
  const comscoreData = {
    vars: {
      c2: comScoreConfig().c2,
    },
    extraUrlParams: {
      comscorekw: 'amp',
    },
  };

  return (
    <amp-analytics type="comscore">
      <script
        type="application/json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(comscoreData) }}
      />
    </amp-analytics>
  );
};

export default Comscore;
