import timeAgoStringsEs from 'react-timeago/lib/language-strings/es';
import timeAgoStringsEn from 'react-timeago/lib/language-strings/en';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';

/**
 * Get the correct language time ago component formatter
 * @param {string} lang current language
 * @returns {Object} time ago formatter with corresponding language
 */
export function getTimeAgoStrings(lang) {
  const timeAgoStrings = lang === 'es' ? timeAgoStringsEs : timeAgoStringsEn;
  return timeAgoStrings;
}

/**
 * Return the formatter with the corresponding language
 * @param {string} lang current language
 * @returns {Function}
 */
export function getTimeAgoFormatter(lang) {
  const strings = getTimeAgoStrings(lang);
  return buildFormatter(strings);
}
