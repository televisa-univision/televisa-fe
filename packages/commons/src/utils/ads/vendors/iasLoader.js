/* eslint-disable no-underscore-dangle */
/**
 * Async loader of IAS on client
 * @param {function} resolve callback function
 * @param {function} reject callback function
 */
const doloadIASScript = (resolve, reject) => {
  window.__iasPET = window.__iasPET || {};
  window.__iasPET.queue = window.__iasPET.queue || [];
  window.__iasPET.pubId = '927244';

  const scriptTag = document.createElement('script');
  scriptTag.src = `${document.location.protocol}//cdn.adsafeprotected.com/iasPET.1.js`;
  scriptTag.async = true;
  scriptTag.type = 'text/javascript';
  scriptTag.onerror = function scriptTagOnError(errs) {
    reject(errs);
  };
  scriptTag.onload = function scriptTagOnLoad() {
    resolve(window.googletag);
  };
  document.getElementsByTagName('head')[0].appendChild(scriptTag);
};

/**
 * Async loader of IAS on client
 * @constructor
 */
export default function loadIASScript() {
  return new Promise((resolve, reject) => {
    doloadIASScript(resolve, reject);
  });
}
