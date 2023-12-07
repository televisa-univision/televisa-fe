/**
 * @module helpers/content/getCookie
 */

/**
 * Returns a cookie by name from document.cookie
 * @param {string} name cookie name
 * @returns {string}
 */
export default function getCookie(name) {
  if (typeof window === 'undefined') {
    return null;
  }
  const cookies = `; ${document.cookie}`;
  const parts = cookies.split(`; ${name}=`);
  let cookie = '';
  if (parts.length === 2) {
    cookie = parts
      .pop()
      .split(';')
      .shift();
  }
  return cookie;
}
