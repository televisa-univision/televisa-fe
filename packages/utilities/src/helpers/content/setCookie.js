/**
 * @module helpers/content/setCookie
 */

/**
 * sets a cookie by name for document.cookie
 * @param {string} name cookie name
 * @param {string} value for cookie
 * @param {number} days how many days before expire
 */
export default function setCookie(name, value, days) {
  if (typeof name !== 'string' || typeof window === 'undefined') {
    return;
  }
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
  }
  document.cookie = `${name}=${value || ''}${expires}; path=/`;
}
