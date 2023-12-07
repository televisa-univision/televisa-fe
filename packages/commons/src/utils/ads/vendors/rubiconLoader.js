// eslint-disable-next-line import/no-extraneous-dependencies
import { RUBICON_FILE_URL } from '@univision/fe-commons/dist/constants/ads';
import { exists } from '../../helpers';

/**
 * Async loader of Rubicon prebid.js script on client
 * @param {function} resolve callback function
 * @param {function} reject callback function
 */
const load = (resolve, reject) => {
  if (exists(window.pbjs)) {
    resolve(window.pbjs);
  } else {
    const cdn = document.createElement('script');
    cdn.async = true;
    // get the environment variable so we know which script to call, either production or test
    cdn.src = RUBICON_FILE_URL;
    cdn.type = 'text/javascript';

    cdn.onerror = (errs) => {
      reject(errs);
    };
    cdn.onload = () => {
      resolve(window.pbjs);
    };

    // add script to <head> tag as high as possible
    const headTag = document.getElementsByTagName('head')[0];
    // headTag.insertBefore(cdn, headTag.firstChild);
    headTag.appendChild(cdn);

    window.pbjs = window.pbjs || {};
    window.pbjs.que = window.pbjs.que || [];
  }
};

/**
 * Promise creator
 * @constructor
 */
export default function loadRubiconScript() {
  return new Promise((resolve, reject) => {
    load(resolve, reject);
  });
}
