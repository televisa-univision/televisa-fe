/**
 * @module helpers/string/stripHtmlTags
 */
import isValidFunction from '../common/isValidFunction';
import sanitizeHtml from '../html/sanitizeHtml';

/**
 * Strip HTML tags from a string
 * @param {string} html string element to strip
 * @returns {string}
 */
export default function stripTagsHtml(html) {
  if (typeof document !== 'undefined' && isValidFunction(document.createElement)) {
    const element = document.createElement('div');
    element.innerHTML = html;
    return element.innerText || element.textContent;
  }

  return sanitizeHtml(html);
}
