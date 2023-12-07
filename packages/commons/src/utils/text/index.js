/* eslint-disable import/prefer-default-export */
import { getKey } from '../helpers';
import commonWords from './commonWords.json';

/**
 * Clean the Enhancements in a text
 * @param {Array} body Body to clean
 * @returns {Array}
 */
export function cleanEnhancementsInBody(body) {
  let filteredBody = body;
  if (Array.isArray(body)) {
    filteredBody = body.filter((chunk, index) => {
      return !(getKey(chunk, 'value') === '<p><br /></p>' && getKey(body, `${index + 1}.type`) === 'enhancement');
    });
  }
  return filteredBody;
}

/**
 * Clean search query
 * @param {string} query - query to clean
 * @returns {string}
 */
export function cleanSearchQuery(query) {
  if (typeof query !== 'string') {
    return '';
  }
  const common = [...commonWords.es, ...commonWords.en];
  const regExpClean = new RegExp(`\\b${common.join('\\b|\\b')}\\b`, 'gi');

  return query.replace(regExpClean, '').replace(/\s+/gm, ' ').trim();
}
