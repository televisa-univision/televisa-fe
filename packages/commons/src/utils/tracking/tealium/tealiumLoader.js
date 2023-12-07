import { getCurrentProtocol } from '../../helpers';

/**
 * Tealium script loader
 * @param {string} site to be used
 * @param {string} account to be used
 * @param {string} env where the app is running
 */
export default function load(site, account, env) {
  /* eslint-disable */
  try {
    (function (a, b, c, d) {
      a = `${getCurrentProtocol()}//tags.tiqcdn.com/utag/${site}/${account}/${env}/utag.js`;
      b = document;
      c = 'script';
      d = b.createElement(c);
      d.src = a;
      d.type = 'text/javascript';
      d.async = true;
      a = b.getElementsByTagName('head')[0];
      a.parentNode.insertBefore(d, a);
    })();
  } catch (e) {
  }
}
