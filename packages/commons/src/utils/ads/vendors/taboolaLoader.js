import { TABOOLA_FILE_URL } from '../../../constants/ads';

/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/**
 * Async loader of taboola tag on client
 * @param {function} resolve callback function
 * @param {function} reject callback function
 */
const doloadTaboolaScript = (resolve, reject) => {
  /* eslint-disable */
  // *Global* command queue for the page
  window._taboola = window._taboola || [];

  !function (e, f, u, i) {
    if (!document.getElementById(i)) {
      e.async = 1;
      e.src = u;
      e.type = 'text/javascript';
      e.id = i;
      e.onerror = function scriptTagOnError(errs) {
        reject(errs);
      };
      e.onload = function scriptTagOnLoad() {
        resolve(window._taboola);
      };
      f?.parentNode.insertBefore(e, f);
    }
    // Fill in your Publisher ID (an alphabetic string), as provided by Taboola:
  }(document.createElement('script'), document.getElementsByTagName('script')[0], TABOOLA_FILE_URL, 'tb_loader_script');

  if (window.performance && typeof window.performance.mark == 'function') {
    window.performance.mark('tbl_ic');
  }
}

/**
 * Async loader of taboola tag on client
 * @constructor
 */
export default function loadTaboolaScript() {
  return new Promise((resolve, reject) => {
    doloadTaboolaScript(resolve, reject);
  });
}
