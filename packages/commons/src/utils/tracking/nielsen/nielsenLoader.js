import { getCurrentProtocol } from '../../helpers';

export const UVN_NIELSEN_LOADED = 'uvn_nielsen_loaded';

/**
 * Get SDK Object
 * @param {boolean} reloaded - if the sdk has been reloaded
 * @returns {Object}
 */
function getSdk(reloaded) {
  return {
    sdk: window.NOLCMB,
    reloaded,
  };
}

/**
 * Async loader of Nielsen sdk
 * @param {string} env where the app is running
 * @constructor
 */
export default function load(env) {
  return new Promise((resolve) => {
    if (window[UVN_NIELSEN_LOADED]) {
      resolve(getSdk(true));
    } else {
      const scriptTag = document.createElement('script');
      const srcDomain = env === 'prod' ? 'cdn-gl.imrworldwide.com' : 'secure-dcr-cert.imrworldwide.com';
      scriptTag.src = `${getCurrentProtocol()}//${srcDomain}/novms/js/2/ggcmb510.js`;
      scriptTag.async = true;
      scriptTag.type = 'text/javascript';
      /* istanbul ignore next */
      scriptTag.onerror = function scriptTagOnError() {
        resolve({});
      };
      /* istanbul ignore next */
      scriptTag.onload = function scriptTagOnLoad() {
        window[UVN_NIELSEN_LOADED] = true;
        resolve(getSdk(false));
      };
      document.getElementsByTagName('head')[0].appendChild(scriptTag);
    }
  });
}
