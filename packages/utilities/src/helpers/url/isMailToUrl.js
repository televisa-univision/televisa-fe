/**
 * @module helpers/url/isMailToUrl
 */

/**
 * Check if this is a mailto url
 * @param {string} href the original href prop
 * @returns {boolean}
 */
function isMailToUrl(href) {
  return /^(mailto):.+/.test(href);
}

export default isMailToUrl;
