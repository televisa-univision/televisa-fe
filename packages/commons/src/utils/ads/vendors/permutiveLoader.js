/* eslint-disable */
import { PERMUTIVE_PROJECT_ID, PERMUTIVE_PUBLIC_API_KEY } from '../../../constants/ads';
import Store from '../../../store/store';
import { getCommonTracking } from '../../../store/storeHelpers';
import { getKey, isValidFunction } from '../../helpers';
import SessionStorage from '../../helpers/SessionStorage';

export const getPermutiveSchema = (data) => {
  let commonTracking;
  if (data) {
    commonTracking = data;
  } else {
    commonTracking = getCommonTracking(Store);
  }

  const type = getKey(commonTracking, 'content_type', '');
  const vertical = getKey(commonTracking, 'content_vertical', '');
  const tags = getKey(commonTracking, 'all_tags', []);
  const market = getKey(commonTracking, 'brand_market', '');
  const section = getKey(commonTracking, 'section', '');
  const parentSection = getKey(commonTracking, 'section_level1', '');
  const mvpdData = SessionStorage.getObject('mvpdData');
  const mvpdAuthenticated = getKey(mvpdData, 'loggedIn', false);

  return {
    page: {
      content: {
        type,
        vertical,
        tags,
      },
      user: {
        mvpdAuthenticated,
        authenticatedSub: false, // TODO: passed user_type (this is used for Uforia, AVOD, and UNOW where we have subscribed users)
      },
      market,
      section,
      parentSection,
      socialShare: 0, // TODO: probably needs to be sent on click with the social_share event
    }
  }
}

/**
 * Waits that provided function becomes true
 * otherwise resolves the promise once the timeOutMs
 * is expired
 * @param {function} readyFunction provided function used to check if values is resolved
 * @param {number} timeoutMs miliseconds that will wait as max time as fallback
 * @returns {Promise}
 */
async function readyWithTimeout(readyFunction, timeoutMs) {
  return new Promise((resolve) => {
    const timeWas = new Date();
    const wait = setInterval(() => {
      if (isValidFunction(readyFunction) && !!readyFunction()) {
        clearInterval(wait);
        resolve();
      } else if (new Date() - timeWas > timeoutMs) {
        console.warn('_pdfps not resolved after', new Date() - timeWas, 'ms');
        clearInterval(wait);
        resolve();
      }
    }, 100);
  });
};

/**
 * Async loader of Permutive
 * @param {function} resolve callback function
 * @param {function} reject callback function
 */
const doloadPermutiveScript = (resolve, reject) => {
  if (window.permutive) {
    resolve(window.permutive);
  } else {
    !function (n, e, o, r, i) {
      if (!e) {
        e = e || {}, window.permutive = e, e.q = [], e.config = i || {}, e.config.projectId = o, e.config.apiKey = r, e.config.environment = e.config.environment || 'production';
        for (var t = ['addon', 'identify', 'track', 'trigger', 'query', 'segment', 'segments', 'ready', 'on', 'once', 'user', 'consent'], c = 0; c < t.length; c++) {
          var f = t[c];
          e[f] = function (n) {
            return function () {
              var o = Array.prototype.slice.call(arguments, 0);
              e.q.push({
                functionName: n,
                arguments: o
              })
            }
          }(f)
        }
      }
    }(document, window.permutive, PERMUTIVE_PROJECT_ID, PERMUTIVE_PUBLIC_API_KEY, {});

    window.googletag = window.googletag || {}, window.googletag.cmd = window.googletag.cmd || [], window.googletag.cmd.push(function () {
      if (0 === window.googletag.pubads().getTargeting('permutive').length) {
        var g = window.localStorage.getItem('_pdfps');
        window.googletag.pubads().setTargeting('permutive', g ? JSON.parse(g) : [])
      }
    });

    // send schema to the initial pageview event
    permutive.addon("web", getPermutiveSchema());
    // callback to be dispatched once permutive is loaded
    window.permutive.readyWithTimeout = readyWithTimeout;

    // init script
    const scriptTag = document.createElement('script');
    scriptTag.src = `https://cdn.permutive.com/${PERMUTIVE_PROJECT_ID}-web.js`;
    scriptTag.async = true;
    scriptTag.type = 'text/javascript';
    scriptTag.onerror = function scriptTagOnError(errs) {
      reject(errs);
    };
    scriptTag.onload = function scriptTagOnLoad() {
      resolve(window.permutive);
    };
    document.getElementsByTagName('head')[0].appendChild(scriptTag);
  }
};

/**
 * Async loader of IAS on client
 * @constructor
 */
export default function loadPermutiveScript() {
  return new Promise((resolve, reject) => {
    doloadPermutiveScript(resolve, reject);
  });
}
