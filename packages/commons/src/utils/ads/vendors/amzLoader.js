import { AWS_FILE_URL } from '../../../constants/ads';
/**
 * Async loader of amazon tag on client
 * @param {function} resolve callback function
 * @param {function} reject callback function
 */
const doloadScript = (resolve, reject) => {
  /* eslint-disable */
  if (typeof window.apstag === 'undefined') {
    ! function (a9, a, p, s, t, A, g) {
      if (a[a9]) return;

      function q(c, r) { a[a9]._Q.push([c, r]) }
      a[a9] = {
        init: function () { q("i", arguments) },
        fetchBids: function () { q("f", arguments) },
        setDisplayBids: function () { },
        _Q: []
      };
      A = p.createElement(s);
      A.async = !0;
      A.src = t;
      A.type = 'text/javascript';
      g = p.getElementsByTagName(s)[0];
      g.parentNode.insertBefore(A, g);
      A.onerror = function scriptTagOnError(errs) {
        reject(errs);
      };
      A.onload = function scriptTagOnLoad() {
        resolve(a[a9]);
      };
    }("apstag", window, document, "script", AWS_FILE_URL);
  }
  /* eslint-enable */
  window.apstag.init({
    pubID: '3087',
    adServer: 'googletag',
  });
  resolve(window.apstag);
};

/**
 * Async loader of gpt tag on client
 * @constructor
 */
export default function loadAMZscript() {
  return new Promise((resolve, reject) => {
    doloadScript(resolve, reject);
  });
}
