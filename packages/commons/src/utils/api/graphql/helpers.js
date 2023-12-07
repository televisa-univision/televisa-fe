/**
 * Some of the content the graphql service can return
 * is GenericCmsContent. That kind of type is used when
 * we don't have a type definition yet for that kind of CMS
 * type in the graphql schema. In those cases we need to
 * parse manually the json property inside the GenericCmsContent.
 * @param {Object} content a cms content type object
 * @property {string} content.__typename name of the content type
 * @property {string} content.json data of the content type when it is GenericCmsContent
 * @returns {Object}
 */
export const parseContent = (content) => {
  const { __typename } = content;
  if (__typename === 'GenericCmsContent') {
    try {
      return { __typename, ...JSON.parse(content.json) };
    } catch {
      return content;
    }
  }
  return content;
};

/**
 * Parse horoscopes response
 * @param {Object} response horoscopes response
 * @property {Array} response.ids list of ids if favorite items
 * @property {Array} response.items list of personalized content
 * @returns {Object}
 */
export const parseHoroscopesResponse = (response) => {
  const { ids, items } = response;
  if (!Array.isArray(ids) || !Array.isArray(items)) {
    throw new Error('Invalid horoscopes response. It should contain a list of ids and a list of items.');
  }

  return { ids, items: items.map(content => parseContent(content)) };
};
