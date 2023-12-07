import { isValidArray, toAbsoluteUrl } from '@univision/fe-commons/dist/utils/helpers';

/**
 * Converts a list of links from relative to absolute whenever necessary
 * @param {Array} links - list of links to be converted
 * @param {string} domain - domain to be used as a base for the links
 * @returns {Array}
 */
export default function getAbsoluteLinks(links, domain) {
  if (isValidArray(links)) {
    return links.map(item => ({
      ...item,
      link: toAbsoluteUrl(item.link, domain),
    }));
  }

  return [];
}
