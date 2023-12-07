/**
 * Async loader of indexExchange tag on client
 * @param {function} resolve callback function
 * @param {function} reject callback function
 */
const doloadScript = (resolve, reject) => {
  /*
    do this after loading all
    googletag.cmd.push(() => {
      if (typeof window.headertag === 'undefined' ||
      window.headertag.apiReady !== true) {
      window.headertag = googletag;
    }
  });
  */
  if (typeof window.headertag !== 'undefined') {
    resolve(window.headertag);
  }
  const scriptTag = document.createElement('script');
  scriptTag.src = `${document.location.protocol}//js-sec.indexww.com/ht/htw-univision.js`;
  scriptTag.async = true;
  scriptTag.type = 'text/javascript';
  scriptTag.onerror = function scriptTagOnError(errs) {
    reject(errs);
  };
  scriptTag.onload = function scriptTagOnLoad() {
    resolve(window.headertag);
  };
  document.getElementsByTagName('head')[0].appendChild(scriptTag);
};

/**
 * Promise creator
 * @constructor
 */
export default function loadIndexScript() {
  return new Promise((resolve, reject) => {
    doloadScript(resolve, reject);
  });
}
