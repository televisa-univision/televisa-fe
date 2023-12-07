import { GPT_FILE_URL } from '../../../constants/ads';

/**
 * Inits googletag
 *
 * @returns {Promise} Resolved promise with googletag
 */
export const initGPTScript = () => {
  window.googletag = window.googletag || {};
  window.googletag.cmd = window.googletag.cmd || [];
  return Promise.resolve(window.googletag);
};

/**
 * Async loader of gpt tag on client
 * @param {function} resolve callback function
 * @param {function} reject callback function
 */
const doloadGPTScript = (resolve, reject) => {
  /* eslint-disable */
  if (typeof window.googletag !== 'undefined' && window.googletag.cmd) {
    // Avoid loading the library if already loaded check
    // /packages/core/src/app/components/shell/Assets/index.js
    initGPTScript();
  } else {
    initGPTScript();
    const scriptTag = document.createElement('script');
    scriptTag.src = GPT_FILE_URL;
    scriptTag.async = true;
    scriptTag.type = 'text/javascript';
    scriptTag.onerror = function scriptTagOnError(errs) {
      reject(errs);
    };
    scriptTag.onload = function scriptTagOnLoad() {
      resolve(window.googletag);
    };
    document.getElementsByTagName('head')[0].appendChild(scriptTag);
  }
};

/**
 * Async loader of gpt tag on client
 * @constructor
 */
export default function loadGPTScript() {
  return new Promise((resolve, reject) => {
    doloadGPTScript(resolve, reject);
  });
}
