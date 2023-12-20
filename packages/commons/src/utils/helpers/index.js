import nodeUrl from 'url';
import _uniqBy from 'lodash.uniqby';

import _isClientSide from '@univision/fe-utilities/helpers/common/isClientSide';
import _isEqual from '@univision/fe-utilities/helpers/common/isEqual';
import _isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';
import _isValidObject from '@univision/fe-utilities/helpers/common/isValidObject';
import _isValidString from '@univision/fe-utilities/helpers/common/isValidString';
import _isValidFunction from '@univision/fe-utilities/helpers/common/isValidFunction';
import _isValidPromise from '@univision/fe-utilities/helpers/common/isValidPromise';
import _isValidNumber from '@univision/fe-utilities/helpers/common/isValidNumber';
import _isValidValue from '@univision/fe-utilities/helpers/common/isValidValue';
import _toCamelCase from '@univision/fe-utilities/helpers/string/toCamelCase';
import _getKey from '@univision/fe-utilities/helpers/object/getKey';
import _getCookie from '@univision/fe-utilities/helpers/content/getCookie';
import _setCookie from '@univision/fe-utilities/helpers/content/setCookie';

import { TUDN_DEFAULT_HOST } from '../../constants/sites';
import { EVENT_PUSH_SPA_STATE } from '../../constants/spa';
// eslint-disable-next-line import/no-cycle
import Store from '../../store/store';
// eslint-disable-next-line import/no-cycle
import { getConfig, isSpa } from '../../store/storeHelpers';
// eslint-disable-next-line import/no-cycle
import request from '../api/request';
// eslint-disable-next-line import/no-cycle
import features from '../../config/features';
// eslint-disable-next-line import/no-cycle
import clientLogging from '../logging/clientLogging';

import { globalComponents } from '../../config';

import breakPointList from '../../config/breakPointList';

/**
 *
 *  WARNING!!!!!!!:
 *  all these helpers are deprecated, use `fe-utilities` instead.
 *
 */

/**
 * Helper function to determine if a given property exists
 * @deprecated use just if(value)
 * @param {Object} property Property being tested
 * @returns {boolean}
 */
export function exists(property) {
  if (typeof property !== 'undefined' && property) {
    return true;
  }
  return false;
}

/**
 * Helper function to check if key is not null and defined
 * @param {Object} obj to te tested
 * @param {string} key to be checked
 * @returns {boolean}
 */
export function hasKey(obj, key) {
  let tempObj = obj;
  if (typeof key !== 'string') {
    return false;
  }
  return key.split('.').every((x) => {
    if (typeof tempObj !== 'object' || tempObj === null || !(x in tempObj) || !tempObj[x]) {
      return false;
    }
    tempObj = tempObj[x];
    return true;
  });
}

/**
 * Checks to see if given url is relative (i.e., without a host/protocol)
 * @param {string} url to test
 * @returns {bool} if url is relative
 */
export function isRelativeUrl(url) {
  if (typeof url !== 'string') {
    return false;
  }
  return !/^(?:[a-z]+:|\/\/|[a-z]+\.)/i.test(url);
}

/**
 * Checks to see if given url is ABSOLUTe (i.e., with a host/protocol)
 * @param {string} url to test
 * @returns {bool} if url is ABSOLUTE, not relative
 */
export function isAbsoluteUrl(url) {
  return !isRelativeUrl(url);
}

/**
 * Helper to determine if array is valid and not valid
 * @deprecated use `fe-utilities` instead
 * @param {array} array to be checked
 * @returns {boolean}
 */
export const isValidArray = _isValidArray;

/**
 * Helper to determine if object is valid and not valid
 * @deprecated use `fe-utilities` instead
 * @param {Object} obj object to be checked
 * @returns {boolean}
 */
export const isValidObject = _isValidObject;

/**
 * Check if this is a mailto url
 * @param {string} href the original href prop
 * @returns {boolean}
 */
export function isMailToUrl(href) {
  return /^(mailto):.+/.test(href);
}

/**
 * Get site domain from current href link
 * @param {string} href URL to get domain
 * @param {Object} sites available domain sites
 * @returns {string}
 */
export function getSiteDomainFromHref(href, sites) {
  if (!isValidObject(sites)) {
    return null;
  }
  return href && href.includes(TUDN_DEFAULT_HOST)
    ? sites.tudn : sites.univision;
}

/**
 * Check if url is in *univision.com domain
 * @param {string} href the original href prop
 * @returns {boolean}
 * @deprecated
 */
export function isInUnivisionDomain(href) {
  return !!href && (/(.univision.com|.tudn.com)/.test(href) || href.startsWith('/'));
}

/**
 * Check if two URLs are in the same univision domain.
 * @param {string} firstUrl First URL to check
 * @param {string} secondUrl Second URL to check
 * @returns {boolean}
 * @deprecated
 */
export function areInSameUnivisionDomain(firstUrl, secondUrl) {
  if (isRelativeUrl(firstUrl) || isRelativeUrl(secondUrl)) {
    return true;
  }
  const univisionRegex = /.univision.com|localhost|execute-api.us-east-1.amazonaws.com/;
  const tudnRegex = /.tudn.com|localhost|execute-api.us-east-1.amazonaws.com/;
  const bothInUnivision = univisionRegex.test(firstUrl) && univisionRegex.test(secondUrl);
  const bothInTudn = tudnRegex.test(firstUrl) && tudnRegex.test(secondUrl);
  return bothInUnivision || bothInTudn;
}

/**
 * Converts a relative URL to an absolute one
 * @param {string} uri Potential relative URL that needs converting
 * @param {string} domain Domain to use on the absolute URL
 * @returns {string}
 */
export function toAbsoluteUrl(uri, domain) {
  if (typeof uri === 'string') {
    // Only make absolute a relative url
    if (uri && typeof domain === 'string' && isRelativeUrl(uri)) {
      if (uri === '/') {
        return domain || uri;
      }
      if (uri.startsWith('/')) {
        return `${domain}${uri}`;
      }
      return `${domain}/${uri}`;
    }
    return uri;
  }
  return null;
}

/**
 * Changes url protocol from https to http
 * @param {string} url Url to be changed from https to http
 * @returns {string} http url
 */
export function toHttp(url) {
  if (exists(url)) {
    if (url.indexOf('http://') >= 0) {
      return url;
    }
    return url.replace(new RegExp('https://', 'g'), 'http://');
  }
  return null;
}

/**
 * Converts an absolute URL to a relative one
 * @param {string} absoluteUrl Url to be converted
 * @returns {string}
 */
export function toRelativeUrl(absoluteUrl) {
  if (typeof absoluteUrl === 'string' && absoluteUrl.length > 0) {
    const noDomainUrlRegexp = /^.*\/\/[^/]+/;
    return absoluteUrl.replace(noDomainUrlRegexp, '') || '/';
  }
  return null;
}

/* alphabetise fuctions below */

/**
 * Validate if one array exist inside the other
 * Ex: arrayIncludes([a, b, c] , [a, b]) -> true
 * @param {Array} baseArray base array
 * @param {Array} checkArray array to be checked
 * @returns {boolean}
 */
export function arrayIncludes(baseArray, checkArray) {
  if (isValidArray(baseArray) && isValidArray(checkArray)) {
    const checkArrayClean = checkArray.filter(item => item !== '*' && item !== '');
    const baseArrayClean = baseArray.filter(item => item !== '' && item !== '*');
    return checkArrayClean.every((item, i) => item === baseArrayClean[i]);
  }
  return false;
}

/**
 * Capitalise first letter of string ('hello' -> 'Hello')
 * @param {string} str to transform
 * @returns {string}
 */
export function capFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Convert string to camel case
 * @deprecated use `fe-utilities` instead
 * @param {string} value an text/value to convert
 * @returns {string}
 */
export const camelCase = _toCamelCase;

/**
 * Method to remove all falsy values: undefined, null, 0, false, NaN and "" from array
 * @param {Array} actual of the page
 * @returns {Array}
 */
export function cleanArray(actual) {
  const newArray = [];
  for (let i = 0; i < actual.length; i += 1) {
    if (actual[i]) {
      newArray.push(actual[i]);
    }
  }
  return newArray;
}

/**
 * Get the URL without domain and /* on the end
 * @param {string} url - the URL to clean
 * @access public
 * @returns {string}
 */
export function cleanUrl(url) {
  if (typeof url === 'string') {
    const cleanUrlRegexp = /(\/|\*|\/\*)$/;
    return toRelativeUrl(url.replace(cleanUrlRegexp, '')) || url;
  }
  return url;
}

/**
 * Creates a deep clone of data
 * @param {*} data value to clone
 * @returns {*} Returns the deep cloned value
 */
export function cloneDeep(data) {
  return JSON.parse(JSON.stringify(data));
}

/**
 * Decodes a given base16-encoded string
 * @param {string} hexEncoded base16-encoded string
 * @returns {string}
 */
export function decodeHex(hexEncoded) {
  let decoded = '';
  for (let i = 0; i < hexEncoded.length; i += 2) {
    decoded += String.fromCharCode(parseInt(hexEncoded.substr(i, 2), 16));
  }
  return decodeURIComponent(decoded);
}

/**
 * Animation easing function
 * @param {number} currentTime current time
 * @param {number} startValue start value
 * @param {number} change in value (delta)
 * @param {number} duration duration (ms)
 * @returns {number}
 */
export function easeInOutQuad(currentTime, startValue, change, duration) {
  let time = currentTime;

  time /= duration / 2;

  if (time < 1) {
    return (change / 2) * time * time + startValue;
  }
  time -= 1;
  return (-change / 2) * (time * (time - 2) - 1) + startValue;
}

/**
 * Encodes a given string to base16
 * @param {string} string to encode
 * @returns {string} base16-encoded string
 */
export function encodeHex(string) {
  const toEncode = encodeURIComponent(string);
  let encoded = '';
  for (let i = 0; i < toEncode.length; i += 1) {
    encoded += toEncode.charCodeAt(i).toString(16);
  }
  return encoded;
}

/**
 * Get the background image for a slide
 * @param {Object} props the props to check for the image url
 * @param {string} key the key to search for
 * @returns {Object}
 */
export function getBackgroundImage(props, key) {
  if (hasKey(props, key)) {
    return {
      backgroundImage: `url(${_getKey(props, key)})`,
    };
  }

  return {};
}

/**
 * Determines if passed value is a string.
 * @deprecated use `fe-utilities` instead
 * @param {any} maybeString - value that needs to be validated
 * @returns {boolean} - returns true if value is a string, false otherwise
 */
export const isValidString = _isValidString;

/**
 * Determines if passed value is a valid url.
 * @param {string} possibleUrl - value that needs to be validated
 * @returns {boolean} - returns true if value is a url, false otherwise
 */
export function isValidURL(possibleUrl) {
  const pattern = new RegExp('^(https?:\\/\\/)?'
    + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'
    + '((\\d{1,3}\\.){3}\\d{1,3}))'
    + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'
    + '(\\?[;&a-z\\d%_.~+=-]*)?'
    + '(\\#[-a-z\\d_]*)?$', 'i');
  return isValidString(possibleUrl) && !!pattern.test(possibleUrl);
}

/**
 * Helper function to get key if exist otherwise returns undefined
 * @deprecated use `fe-utilities` instead
 * @param {Object} obj - The object to query
 * @param {Array|string} path - The path of the property to get
 * @param {*} [fallback = undefined] - fallback value
 * @param {boolean} [strict = false] - if is set to true, it will accept null as valid
 * @returns {*}
 */
export const getKey = _getKey;

/**
 * Returns a cookie by name from document.cookie
 * @deprecated use `fe-utilities` instead
 * @param {string} name cookie name
 * @returns {string}
 */
export const getCookie = _getCookie;

/**
 * sets a cookie by name for document.cookie
 * @deprecated use `fe-utilities` instead
 * @param {string} name cookie name
 * @param {string} value for cookie
 * @param {string} days how many days before expire
 */
export const setCookie = _setCookie;

/**
 * Calls window.location.protocol and returns its value
 * @returns {string} the current web protocol
 */
export function getCurrentProtocol() {
  return window.location.protocol;
}

/**
 * Returns the first element which is present in both arrays.
 * @param {Array} firstArray First array to iterate
 * @param {Array} secondArray Second array to iterate
 * @returns {*} the first element which is present in both arrays, if any.
 */
export function getFirstMatch(firstArray, secondArray) {
  if (Array.isArray(firstArray) && Array.isArray(secondArray)) {
    return firstArray.find(
      expectedElement => secondArray.some(element => expectedElement === element)
    );
  }
  return null;
}

/**
 * Returns distance from top of the viewport to the top of the scrollbar.
 * Value will vary as you scroll downward.
 * @returns {number}
 */
export function getScrollTop() {
  let scrollTop;
  if (exists(global.window)) {
    scrollTop = document.body.scrollTop || window.scrollY || document.documentElement.scrollTop;
  }

  return scrollTop || 0;
}

/**
 * Extracts the social networks listed in the given networksName array
 * from the given content.socialNetworks object.
 * If content.socialNetworks is already an array, it will return a copy of the same array.
 * @param {Object} content Object with social networks
 * @param {Array} networksName Name of the social networks to extract
 * @returns {Array}
 */
export function getSocialNetworks(content, networksName = []) {
  const socialNetworks = [];

  if (hasKey(content, 'socialNetworks')) {
    if (Array.isArray(content.socialNetworks)) {
      socialNetworks.push(...content.socialNetworks);
    } else if (isValidArray(networksName)) {
      networksName.forEach((name) => {
        if (hasKey(content, `socialNetworks.${name}Url`)) {
          socialNetworks.push({
            name: name.toLowerCase(),
            href: content.socialNetworks[`${name}Url`].url,
          });
        }
      });
    }
  }

  return socialNetworks;
}

/**
 * Gets twitter handle from twitter URL
 * @param {string} twitterUrl Url to be converted
 * @returns {string}
 */
export function getTwitterHandle(twitterUrl) {
  if (exists(twitterUrl)) {
    return (twitterUrl.substr(twitterUrl.lastIndexOf('/') + 1).split('?'))[0];
  }
  return null;
}

/**
 * Simple unique key generator
 * @param {*} prefix - the identifier prefix to the key
 * @returns {string}
 */
export const getUniqKey = (prefix) => {
  return `${prefix || 'key'}${Date.now()}${Math.random().toString(36).substr(2, 10)}`;
};

/**
 * Returns the widget type
 * @param {Object} widget from API
 * @returns {string}
 */
export function getWidgetType(widget) {
  // Checking widget null too otherwise widget.type will fail
  if (widget) {
    return hasKey(widget, 'settings.genericWidget.type')
      ? widget.settings.genericWidget.type
      : widget.type;
  }
  return null;
}

/**
 * Helper to remove particular keys from objects
 * @param {(Object[]|Object)} contents - Object or Array with the content
 * @param {string[]} removeKeys - Keys to remove
 * @returns {(Object[]|Object)}
 */
export function cleanObject(contents, removeKeys) {
  if (!isValidArray(removeKeys)) {
    return contents;
  }

  const self = {
    remove: (obj) => {
      if (!isValidObject(obj)) {
        return obj;
      }
      const newContent = {};
      const keys = Object.keys(obj);
      for (let i = 0, len = keys.length; i < len; i += 1) {
        const key = keys[i];
        if (!removeKeys.includes(key)) {
          newContent[key] = obj[key];
        }
      }
      return newContent;
    },
  };

  if (isValidArray(contents)) {
    return contents.map((obj) => {
      return self.remove(obj);
    });
  }
  return self.remove(contents);
}

/**
 * Helper to keep particular keys from objects
 * @param {(Object[]|Object)} contents - Object or Array with the content
 * @param {string[]} keepKeys - Keys to keep all the rest will be ignored
 * @returns {(Object[]|Object)}
 */
export function pickObject(contents, keepKeys) {
  if (!isValidArray(keepKeys)) {
    return contents;
  }

  const self = {
    clean: (obj) => {
      if (!isValidObject(obj)) {
        return obj;
      }
      const newContent = {};
      const keys = Object.keys(obj);
      for (let i = 0, len = keys.length; i < len; i += 1) {
        const key = keys[i];
        const value = obj[key];

        if (keepKeys.includes(key)) {
          newContent[key] = value;
        } else if (isValidObject(value) || isValidArray(value)) {
          newContent[key] = pickObject(value, keepKeys);
        }
      }
      return newContent;
    },
  };

  if (isValidArray(contents)) {
    return contents.map((obj) => {
      return self.clean(obj);
    });
  }
  return self.clean(contents);
}

/**
 * Performs comparison between two values to determine if they are
 * equivalent, if 'partial' is true performs compare no deep in objects/arrays.
 * @deprecated use from `fe-utilities` instead
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} shallow If true make a non-deep comparison in objects/arrays.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
export const isEqual = _isEqual;

/**
 * Tests if an element is present in a given array
 * @param {Object} element to search in the array
 * @param {Array} array of elements
 * @returns {boolean} true if the element is in the array
 */
export function isInArray(element, array) {
  return exists(array) && array.indexOf(element) >= 0;
}

/**
 * Returns true if the element is in the viewport
 * @param {Node} element DOM element to check
 * @param {number} bottom position of the element to check against in the viewport
 * @param {number} top position of the element to check against in the viewport
 * @returns {boolean}
 */
export function isInViewport(element, bottom = 0, top) {
  if (!exists(global.window) || !exists(element)) {
    return false;
  }
  const bounds = element.getBoundingClientRect();
  return bounds.top < (top || window.innerHeight) && bounds.bottom > bottom;
}

/**
 * convert a long array into an array of arrays
 * @param   {Array} _list         the starting array
 * @param   {number} [count=2]     how many columns are desired
 * @param   {number} [threshold=5] the minimum number of links before splitting occurs
 * @returns {Array}               an array of arrays(columns)
 */
export function partitionArray(_list, count = 2, threshold = 5) {
  if (_list.length <= threshold) return [{ key: 0, contents: _list }];
  const columns = [];
  const list = [..._list];
  const itemsPerColumn = Math.ceil(list.length / count);
  let i = 0;
  while (i < count) {
    columns.push({ key: i, contents: list.splice(0, itemsPerColumn) });
    i += 1;
  }
  return columns;
}

/**
 * Sanitize the html text
 * @param {string} text to sanitize
 * @returns {string}
 */
export function sanitizeHtml(text) {
  return text.replace(/<(.|\n)*?>/g, '');
}

/**
 * scrolls an element to a given position (in px),
 * will animate if duration > 0
 * @param {Node} element to scroll
 * @param {number} to scroll destination
 * @param {number} duration of animation
 * @param {number} increment step value for scrolling
 */
export function scrollTo(element, to, duration = 400, increment = 20) {
  const localElement = element;
  const start = localElement.scrollTop;
  const change = to - start;
  let currentTime = 0;

  if (!duration) {
    localElement.scrollTop = to;
  } else {
    /**
     * animates scrolling, requires local vars
     */
    const animateScroll = () => {
      currentTime += increment;
      const val = easeInOutQuad(currentTime, start, change, duration);

      localElement.scrollTop = val;
      if (currentTime < duration) {
        requestAnimationFrame(animateScroll);
      }
    };

    animateScroll();
  }
}

/**
 * Changes protocol on urls to https
 * @param {Object} pagePayload JSON object with api data
 * @returns {Object} pagePayload with https urls
 */
export function secureImagesInData(pagePayload) {
  if (exists(pagePayload)) {
    let pageString = JSON.stringify(pagePayload);
    pageString = pageString.replace(new RegExp('http://', 'g'), 'https://');
    return JSON.parse(pageString);
  }

  return null;
}

/**
 * Helper function to convert string to safe class name for css
 * @param {string} name as string
 * @returns {string} classname
 */
export const safeClassName = (name) => {
  const from = 'ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç';
  const to = 'AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc';
  const mapping = {};

  for (let i = 0, j = from.length; i < j; i += 1) {
    mapping[from.charAt(i)] = to.charAt(i);
  }

  const ret = [];
  for (let i = 0, j = name.length; i < j; i += 1) {
    const c = name.charAt(i);
    if (Object.prototype.hasOwnProperty.call(mapping, name.charAt(i))) {
      ret.push(mapping[c]);
    } else {
      ret.push(c);
    }
  }

  return ret
    .join('')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, (s) => {
      const c = s.charCodeAt(0);
      if (c === 32) return '-';
      return `__${`000${c.toString(16)}`.slice(-4)}`;
    });
};

/**
 * insert new links by position
 * @param {Array} defaultLinks default links
 * @param {Array} linksToInsert links to insert
 * @returns {Array}
 */
export function insertLinksByPosition(defaultLinks, linksToInsert) {
  const links = cloneDeep(defaultLinks);
  linksToInsert.forEach((newLink) => {
    let linkToAdd = newLink;
    const start = hasKey(newLink, 'position') ? newLink.position : 0;
    if (start) {
      const { position, ...data } = newLink;
      linkToAdd = data;
    }
    links.splice(start, 0, linkToAdd);
  });
  return links;
}

/**
 * remove links by position
 * @param {Array} linksToModify links to modify
 * @param {Array} linksPosition links position to remove
 * @returns {Array}
 */
export function removeLinksByPosition(linksToModify, linksPosition) {
  const links = cloneDeep(linksToModify);
  linksPosition.forEach((position) => {
    links.splice(position, 1);
  });
  return links;
}

/**
 * Changes url protocol from http to https
 * @param {string } url Url to be changed from http to https
 * @returns {string} https url
 */
export function secureUrl(url) {
  if (exists(url)) {
    if (url.indexOf('https://') >= 0) {
      return url;
    }
    return url.replace(new RegExp('http://', 'g'), 'https://');
  }
  return null;
}

/**
 * Returns a truncated string With an ellipsis attached
 * @deprecated use `truncate` which has a clearer definition and is easier to
 * use.
 * @param {string} str String to be truncated
 * @param {string} maxChars Max length in characters for truncated string
 * @param {string} append What should be appended to the truncated string
 * @param {bool} onlyFullWords Should crop in the middle of a word or not
 * @param {bool} checkFeature should truncate if false
 * @returns {string}
 */
export const truncateString = (
  str,
  maxChars = globalComponents.truncate.description,
  append = '…',
  onlyFullWords = true,
  checkFeature = true,
) => {
  if (!exists(str) || typeof str !== 'string' || (checkFeature && !features.widgets.truncateText)) {
    return str;
  }
  // include one extra char for appended char if `onlyFullWords` is true
  const charLimit = onlyFullWords ? maxChars + 1 : maxChars;
  if (str.length <= charLimit) {
    return str;
  }

  let sub = str;
  sub = sub.substr(0, charLimit - append.length);
  // grab whole words if onlyFullWord is true
  sub = onlyFullWords ? sub.substr(0, sub.lastIndexOf(' ')) : sub;
  // ensure last char is not a space
  sub = sub.charAt(sub.length - 1) === ' ' ? sub.substr(0, sub.length - 1) : sub;
  return sub + append;
};

/**
 * Returns a truncated string with a placeholder attached at the end.
 * @param {string} str String to be truncated.
 * @param {Object} options optional
 * @param {string} options.maxChars Max length in characters for truncated
 * string.
 * @param {string} options.append What should be appended to the truncated
 * string.
 * @param {bool} options.onlyFullWords Should crop in the middle of a word or
 * not.
 * @param {bool} options.checkFeature should truncate if false.
 * @returns {string}
 */
export const truncate = (str, {
  maxChars = globalComponents.truncate.description,
  append = '…',
  onlyFullWords = true,
  checkFeature = true,
} = {}) => {
  return truncateString(str, maxChars, append, onlyFullWords, checkFeature);
};

/**
 * add an external script to the page
 * @param {Object} params params to add
 */
export function loadExternalScript(params = {}) {
  const script = document.createElement('script');
  let selector = params.elId ? `[id='${params.elId}']` : 'body';
  script.async = true;
  script.id = params.id;
  script.type = 'text/javascript';
  script.onload = params.onLoad;
  /* istanbul ignore next */
  script.onerror = () => {
    // eslint-disable-next-line babel/no-unused-expressions
    params.onError?.(new Error(`error loading external script: ${params.src || params.text}`));
  };
  if (params.head) {
    selector = 'head';
  }
  // only add script once
  if (params.namespace && typeof window[params.namespace] !== 'undefined') {
    params.onLoad();
    return;
  }
  if (params.unique && document.getElementById(params.id)) {
    return;
  }
  if (params.src) {
    script.src = params.src;
  }
  if (params.text) {
    script.text = params.text;
  }
  if (exists(global.window) && document.querySelector(selector)) {
    document.querySelector(selector).appendChild(script);
  }
}

/**
 * helper for location.href, in the latest version of jsdom/jest
 * navigation is not supported and will display an error, this method
 * can also be mocked to implement tests
 * @param {string} url - url to redirect
 * @returns {function}
 */
export function locationRedirect(url) {
  return () => {
    let element = null;
    if (url && typeof window !== 'undefined') {
      const isSpaMode = isSpa(Store);
      const urlHashIndex = url.indexOf('#');
      const shouldSetLocationHref = isAbsoluteUrl(url)
        && !areInSameUnivisionDomain(window.location.href, url);

      if (!isSpaMode || shouldSetLocationHref) {
        window.location.href = url;
      } else if (urlHashIndex === -1) {
        global.window.dispatchEvent(new CustomEvent(EVENT_PUSH_SPA_STATE, {
          detail: {
            path: toRelativeUrl(url),
            url,
          },
        }));
      } else if (urlHashIndex === 0 && document.querySelector(url)) {
        element = document.querySelector(url);
        const { widgetOffset = 0 } = element.dataset;
        element.scrollIntoView(true);
        window.scrollBy(0, -widgetOffset);
        window.history.pushState(null, null, url);
      } else {
        window.location.href = url;
      }
    }
  };
}

/**
 * helper for opening location in new window/tab
 * @param {string} url - url to redirect
 * @returns {function}
 */
export function openInNewWindow(url) {
  return exists(url)
    ? /* istanbul ignore next */ () => {
      window.open(url, '_blank');
    }
    : null;
}

/**
  * Return true if viewport is landscape
  * @returns {boolean}
  */
export function isLandscape() {
  if (exists(global.window)) {
    return window.innerHeight < window.innerWidth;
  }
  return null;
}

/**
 * helper for validate if it breaking news
 * @param {Object} obj - obj to validate
 * @returns {boolean} true if the object have the property or it is equals to breaking_news
 */
export function isBreakingNews(obj) {
  return getKey(obj, 'breakingNews') || getKey(obj, 'contentPriority', '').toLowerCase() === 'breaking_news' || getKey(obj, 'showBreakingNewsLabel');
}

/**
 * Checks if passed argument is a function
 * @deprecated use `fe-utilities` instead
 * @param {*} maybeFunction could be anything, the point is to check if arg is/is not a function
 * @returns {boolean} true if argument is a function, false if not
 */
export const isValidFunction = _isValidFunction;
/**
 * Checks if passed argument is a Promise
 * @deprecated use `fe-utilities` instead
 * @param {*} maybePromise object to be checked
 * @returns {boolean} true if argument is an instance of a Promise
 */
export const isValidPromise = _isValidPromise;

/**
 * Validates if the number is a valid.
 * @deprecated use `fe-utilities` instead
 * @param {number|string} value - value that needs to be validated
 * @returns {boolean} - if condition satisfy return true else returns false.
 */
export const isValidNumber = _isValidNumber;

/**
 * Get the current frame's width
 * @param {int} innerWidth frame's width
 * @returns {Object}
 */
export function getBreakPointByWidth(innerWidth) {
  switch (true) {
    case innerWidth >= 1440:
      return breakPointList.xl;
    case innerWidth < 1440 && innerWidth >= 1280:
      return breakPointList.lg;
    case innerWidth < 1280 && innerWidth >= 1024:
      return breakPointList.md;
    case innerWidth < 1024 && innerWidth >= 768:
      return breakPointList.sm;
    case innerWidth < 768:
    default:
      return breakPointList.xs;
  }
}

/**
 * helper that uses a lazy function to return the current breakpoint value
 * @param {string} value default value
 * @returns {Object}
 */
export function getCurrentBreakPoint(value = '') {
  if (value) return breakPointList[value];
  const innerWidth = getKey(global, 'window.innerWidth', 0);
  const breakPoint = getBreakPointByWidth(innerWidth);
  return breakPoint;
}

/**
 * truncates an html element by text length
 * @deprecated use `stripHtmlSSR` compatible in SSR and cover most scenarios
 * @param {string} node HTML string element to strip
 * @param {number} length max text length
 * @returns {string}
 */
export function stripHtml(node, length = 100) {
  if (typeof document !== 'undefined' && isValidFunction(document.createElement)) {
    const element = document.createElement('div');
    element.innerHTML = node;
    const {
      innerHTML: { length: htmlLength },
      innerText: { length: textLength },
    } = element;
    const diff = htmlLength - textLength;
    element.innerHTML = element.innerHTML.substring(0, length + diff);
    return element.innerHTML;
  }
  return null;
}

/**
 * Strip HTML tags from a string
 * @param {string} html string element to strip
 * @returns {string}
 */
export function stripTagsHtml(html) {
  if (typeof document !== 'undefined' && isValidFunction(document.createElement)) {
    const element = document.createElement('div');
    element.innerHTML = html;
    return element.innerText || element.textContent;
  }
  return null;
}

/**
 * Turn a string into url optimized string
 * @param {string} string string to convert in slug format
 * @returns {string}
 */
export function slugify(string) {
  if (typeof string === 'string') {
    return string?.normalize?.('NFD')
      ?.replace(/[\u0300-\u036f]+|['"]+|^-+|-+$/gi, '')
      ?.trim()
      ?.replace(/\W+|(-+)/g, '-')
      ?.toLowerCase() ?? string;
  }
  return null;
}

/**
 * Similar to lodash's _.deburr https://lodash.com/docs/4.17.15#deburr
 * @param {string} string the string to be sanitized
 * @returns {string} returns the sanitized string or an empty string if param was invalid
 */
export function deburr(string) {
  if (!isValidString(string)) return '';

  return string?.normalize?.('NFD')?.replace(/[\u0300-\u036f]/g, '') ?? string;
}

/**
 * Sanitizes any string by removing special characters and making the string
 * lowercase
 * @param {string} str String that needs to be sanitized
 * @returns {string} the sanitized string or an empty string if param was invalid
 */
export function deburrToLowerCase(str) {
  return deburr(str).trim().toLowerCase();
}

/**
 * Strip a PATH from an URL
 * @param {string} url - the URL to clean
 * @param {string} path - the PATH to be stripped
 * @returns {string}
 */
export function stripPathUrl(url, path) {
  if (typeof url === 'string') {
    const pathRE = new RegExp(`/${path}/`);
    return url.replace(pathRE, '/');
  }
  return url;
}

/**
 * Determines if given value is not undefined, null, or ''.
 * If the value is a number, it determines if it is not NaN.
 * @deprecated use `fe-utilities` instead
 * @param {*} value value to test
 * @returns {boolean}
 */
export const isValidValue = _isValidValue;

/**
 * Load api content
 * @param {string} uri page uri
 * @param {string} params additional query parameters
 * @returns {Promise}
 */
export function fetchPageData(uri, params) {
  try {
    // nodeUrl.parse throws error when it does not get a string
    const parsedUri = nodeUrl.parse(uri);
    const host = `${getCurrentProtocol()}//www.univision.com`;
    const reqParams = {
      url: `${host}${parsedUri.pathname}`,
      ...params,
    };

    return request({
      uri: getConfig(Store, 'syndicator.content'),
      params: reqParams,
    });
  } catch (err) {
    err.message = `fetchPageData failed: ${err.message}`;
    clientLogging(err);
    return Promise.reject(err);
  }
}

/**
 * Extracts (and execute if it's a function) a given value from an object map
 * @param {string} field the field to get
 * @param {Object} map the mapping of fields
 * @returns {*}
 */
export const getFromMap = (field, map) => {
  let value = null;

  if (!isValidObject(map)) {
    return value;
  }

  const mapField = map[field];
  const mapDefault = map.default;

  if (typeof mapField !== 'undefined') {
    value = mapField;
  } else if (typeof mapDefault !== 'undefined') {
    value = mapDefault;
  }

  if (isValidFunction(value)) {
    return value();
  }

  return value;
};

/**
 * Helper to get function from mapping with a key pattern e.g a URL
 * @param {string} field to perform the check on the mapping
 * @param {Object} map nav mapping with url as key
 * @param {function} [fallbackFn] to get default nav data
 * @param {boolean} strict perform a strict string check or not
 * @returns {function}
 */
export const getFromMapPattern = (field, map, fallbackFn, strict = false) => {
  let dataFn;
  if (isValidString(field) && isValidObject(map)) {
    let foundData = null;

    if (strict) {
      foundData = Object.keys(map).find(mapKey => field === mapKey);
    } else {
      foundData = Object.keys(map).find(mapKey => field.match(mapKey));
    }
    dataFn = map[foundData];
  }
  if (isValidFunction(dataFn)) {
    return dataFn;
  }
  return isValidFunction(fallbackFn) ? fallbackFn : () => { };
};

/**
 * Implementation of uniqBy from lodash
 * Will remove duplicates based on the second parameter
 */
export const uniqBy = _uniqBy;

/**
* Alphetical sorter by name for a list of objects
* @param {Object} obj1 first object
* @param {string} obj1.name string
* @param {Object} obj2 second object
* @param {string} obj2.name string
* @returns {number}
*/
export function alphabeticallyByName(obj1, obj2) {
  return obj1.name.localeCompare(obj2.name);
}

/**
 * sorter by id for a list of objects
 * @param {Object} obj1 first object
 * @param {number} obj1.id number
 * @param {Object} obj2 second object
 * @param {number} obj2.id number
 * @returns {number}
 */
export function sortById(obj1, obj2) {
  if (isValidObject(obj1) && isValidObject(obj2)) {
    return obj1.id - obj2.id;
  }
  return null;
}

/**
 * Check if we're on the client side
 * @deprecated use `fe-utilities` instead
 * @returns {boolean}
 */
export const isClientSide = _isClientSide;

/**
 * Formats a phone number
 * @param {string} phoneNumber Phone number to format
 * @param {string} [separator=.] Character to separate the phone number
 * @returns {string}
 */
export function phoneFormat(phoneNumber, separator = '.') {
  if (!phoneNumber) return null;
  const cleaned = phoneNumber.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

  if (match) {
    return `${match[1]}${separator}${match[2]}${separator}${match[3]}`;
  }

  return phoneNumber;
}

/**
 * Breaks the link / URL up into its individual components
 * @param {string} url URL / Link
 * @returns {Object}
 */
export function decomposeUrl(url) {
  if (!url) return null;
  const decomposedUrlArray = url.match(/^(?<protocol>https?:\/\/)(?=(?<fqdn>[^:/]+))(?:(?<service>www|ww\d|cdn|ftp|mail|pop\d?|ns\d?|git)\.)?(?:(?<subdomain>[^:/]+)\.)*(?<domain>[^:/]+\.[a-z0-9]+)(?::(?<port>\d+))?(?<path>\/[^?]*)?(?:\?(?<query>[^#]*))?(?:#(?<hash>.*))?/i);
  if (!decomposedUrlArray) return null;
  const urlComponents = ['url', 'protocol', 'domain', 'subdomain', 'secondLevelDomain', 'topLevelDomain', 'port', 'path', 'query', 'hash'];
  const decomposedUrl = {};
  urlComponents.forEach((component, index) => {
    decomposedUrl[component] = decomposedUrlArray[index];
  });
  return decomposedUrl;
}
