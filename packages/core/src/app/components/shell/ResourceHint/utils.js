import React from 'react';

import ResourceHint from './ResourceHint';
import hints from './resourceHints.json';

/**
 * Helper object for resource hints processing
 */
const resourceHints = {
  /**
   * Returns an array of ResourceHint components from data
   * in a json config file
   * @param {Object} hintsData data to be converted into resource hints
   * @returns {Array} Array of ResourceHint components from the json data
   */
  get(hintsData = hints) {
    const resourceHintsComponents = [];
    Object.keys(hintsData).forEach((type) => {
      resourceHintsComponents.push(hintsData[type].map((hint) => {
        return <ResourceHint {...hint} rel={type} />;
      }));
    });
    return resourceHintsComponents.length > 0 ? resourceHintsComponents : null;
  },
};

export default resourceHints;
