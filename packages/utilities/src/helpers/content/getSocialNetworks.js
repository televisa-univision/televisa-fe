/**
 * @module helpers/content/getSocialNetworks
 */
import isValidArray from '../common/isValidArray';

/**
 * Extracts the social networks listed in the given networksName array
 * from the given content.socialNetworks object.
 * If content.socialNetworks is already an array, it will return a copy of the same array.
 * @param {Object} content - page content with social networks
 * @param {string[]} networksName - name of the social networks to extract
 * @returns {Array}
 */
export default function getSocialNetworks(content, networksName = []) {
  const contentNetworks = content?.socialNetworks || [];

  if (isValidArray(contentNetworks)) {
    return contentNetworks;
  }

  if (isValidArray(networksName)) {
    const socialNetworks = [];
    networksName.forEach((name) => {
      const networkKey = `${name}Url`;
      if (contentNetworks[networkKey]) {
        socialNetworks.push({
          name: name.toLowerCase(),
          href: contentNetworks[networkKey]?.url,
        });
      }
    });
    return socialNetworks;
  }

  return [];
}
