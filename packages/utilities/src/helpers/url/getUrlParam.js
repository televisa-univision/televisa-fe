/**
 * @module helpers/url/getUrlParam
 */

/**
 * Gets url param
 * @param {string} param to get
 * @returns {?string}
 */
export default function getUrlParam(param) {
  try {
    const params = new URLSearchParams(window.location.search);
    return params.get(param);
  } catch (e) {
    return null;
  }
}
