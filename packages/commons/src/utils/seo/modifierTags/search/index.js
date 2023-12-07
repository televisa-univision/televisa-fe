import toCapitalize from '@univision/fe-utilities/helpers/string/toCapitalize';
import localization from '../../../localization/LocalizationManager';

/**
 * Get custom title/description/canonical for Search page based on the query
 * @returns {Object}
 */
const searchTags = {
  metas(pageState, metaData) {
    const meta = { ...metaData };
    if (meta.name === 'description') {
      const query = pageState?.requestParams?.q || '';
      meta.content = localization.get('searchSeoDescription', { locals: { query } });
    }
    return meta;
  },
  title(pageState) {
    const query = pageState?.requestParams?.q || '';
    return query
      ? localization.get('searchSeoTitle', { locals: { query: toCapitalize(query) } })
      : localization.get('searchSeoNoResultsTitle');
  },
  canonical(pageState, canonicalUrl) {
    const query = pageState?.requestParams?.q || '';
    try {
      const canonicalSearchUrl = new URL(canonicalUrl);
      canonicalSearchUrl.search = query && `q=${query}`;
      return canonicalSearchUrl.toString();
    } catch (e) {
      return canonicalUrl;
    }
  },
};

export default searchTags;
