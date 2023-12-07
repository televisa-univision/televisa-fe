import { ADSWIZZ_FILE_URL } from '../../../constants/ads';

/**
 * Async loader of Adswizz tag on client
 * @param {function} resolve callback function
 * @param {function} reject callback function
 */
const adsWizzScriptLoader = (resolve, reject) => {
  /* eslint-disable */
  !function () {
    if (typeof window.adswizzSDK !== 'undefined') return;
    const scriptTag = document.createElement('script');
    scriptTag.src = ADSWIZZ_FILE_URL;
    scriptTag.async = true;
    scriptTag.type = 'text/javascript';
    scriptTag.onerror = function scriptTagOnError(err) {
      reject(err);
    };
    scriptTag.onload = function scriptTagOnLoad() {
      resolve(window.adswizzSDK);
    };
    document.getElementsByTagName('head')[0].appendChild(scriptTag);
  }();
};

/**
 * Async loader of Adswizz tag on client
 * @constructor
 */
export default function loadAdsWizzScript() {
  return new Promise((resolve, reject) => {
    adsWizzScriptLoader(resolve, reject);
  });
}
