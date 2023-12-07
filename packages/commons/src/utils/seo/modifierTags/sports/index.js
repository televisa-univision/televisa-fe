import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';
import getKey from '@univision/fe-utilities/helpers/object/getKey';
import toCapitalize from '@univision/fe-utilities/helpers/string/toCapitalize';

/**
 * Get sub-section from page category
 * @param {string} pageCategory - category page from state data
 * @returns {string}
 */
function getSubsection(pageCategory) {
  const parts = pageCategory?.split('-');
  if (isValidArray(parts) && parts.length === 2) {
    return parts.slice(-1)[0];
  }
  return null;
}

/**
 * Prepend sub-section to title/description text
 * @param {string} pageCategory - category page from state data
 * @param {string} subText - title/description to append sub-section
 * @returns {string}
 */
function getContentString(pageCategory, subText) {
  const subSection = getSubsection(pageCategory);
  if (!subSection) {
    return subText;
  }
  return `${toCapitalize(subSection)} de ${subText}`;
}

/**
 * Get custom title/description/canonical for sub-sections on Teams/Leagues
 * @returns {Object}
 */
const sportsTags = {
  metas(pageState, metaData) {
    const meta = { ...metaData };
    const pageData = pageState?.data || {};
    const metaValue = getKey(pageData, meta.contentKey);

    if (!metaValue) {
      return meta;
    }
    if (meta.name === 'description') {
      meta.content = `${getContentString(pageState?.pageCategory, metaValue)}`;
    } else if (meta.name === 'title') {
      meta.content = sportsTags.title(pageState, metaValue);
    }
    return meta;
  },
  title(pageState, defaultTitle) {
    return `${getContentString(pageState?.pageCategory, defaultTitle)}`;
  },
  canonical(pageState, canonicalUrl) {
    const subSection = getSubsection(pageState?.pageCategory);
    const baseUrl = canonicalUrl?.replace(/\/$/, '');

    if (subSection) {
      return `${baseUrl}/${subSection}`;
    }
    return canonicalUrl;
  },
};

export default sportsTags;
