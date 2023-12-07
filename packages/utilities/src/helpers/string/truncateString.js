/**
 * @module helpers/string/truncateString
 */
import isValidString from '../common/isValidString';

/**
 * Returns a truncated string With an ellipsis attached
 * @param {string} str String to be truncated
 * @param {string} maxChars Max length in characters for truncated string
 * @param {string} append What should be appended to the truncated string
 * @param {bool} onlyFullWords Should crop in the middle of a word or not
 * @param {bool} checkFeature should truncate if false
 * @returns {string}
 */
export default function truncateString(str, {
  maxChars = 140,
  append = '…',
  onlyFullWords = true,
} = {}) {
  if (!isValidString(str) || !str) {
    return '';
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
}
