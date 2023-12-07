/* eslint-disable no-underscore-dangle */
import { getCurrentProtocol } from '../../helpers';

/**
 * Loads the Com Score SDK
 * @param {Object} comScoreConfig Univision configuration for ComScore
 * @param {boolean} isStandardTracking flag to indicate if it is a standard tracking
 * @constructor
 */
export default function load(comScoreConfig, isStandardTracking) {
  return new Promise((resolve, reject) => {
    if (window.COMSCORE) {
      resolve(window.COMSCORE);
    } else {
      // For standard Com Score tracking, we need to populate the _comscore variable.
      if (isStandardTracking) {
        window._comscore = window._comscore || [];
        window._comscore.push(comScoreConfig());
      }

      const protocol = getCurrentProtocol();
      const scriptTag = document.createElement('script');
      const srcSubDomain = protocol === 'https:' ? 'sb' : 'b';

      scriptTag.src = `${protocol}//${srcSubDomain}.scorecardresearch.com/beacon.js`;
      scriptTag.async = true;
      scriptTag.type = 'text/javascript';

      /* istanbul ignore next */
      scriptTag.onerror = function scriptTagOnError(errors) {
        reject(errors);
      };
      /* istanbul ignore next */
      scriptTag.onload = function scriptTagOnLoad() {
        // This variable is created by the Com Score SDK once is loaded
        resolve(window.COMSCORE);
      };
      document.getElementsByTagName('head')[0].appendChild(scriptTag);
    }
  });
}
