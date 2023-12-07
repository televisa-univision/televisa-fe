/**
 * @module helpers/html/sanitizeHtml
 */
import isValidString from '../common/isValidString';

/**
 * Sanitize the html text
 * @param {string} text to sanitize
 * @returns {string}
 */
export default function sanitizeHtml(text) {
  if (!isValidString(text)) return null;

  return text.replace(/<(.|\n)*?>/g, '');
}
