import modifiersMapping from './mapping';

/**
 * Get canonical URL fro seo data, {@link modifierTags} or fallback page URI
 * @param {string} tagType - seo tag type such as 'canonical', 'title', 'metas' or 'custom'
 * @param {Object} pageState - page initial state data from API
 * @param {(Object|string)} [tagData] - default tag data that would be modified
 * @returns {Function}
 */
function modifierTags(tagType, pageState, tagData) {
  const pageData = { ...pageState?.data };
  const modifierData = modifiersMapping[pageData.type]
      || modifiersMapping[pageData.sectionType];
  const modifierSiteData = modifiersMapping[pageState?.site];
  const modifierFn = modifierData?.[tagType] || modifierSiteData?.[tagType];
  if (!modifierFn) {
    return tagData;
  }

  return modifierFn(pageState, tagData);
}

modifierTags.CANONICAL = 'canonical';
modifierTags.CUSTOM = 'custom';
modifierTags.METAS = 'metas';
modifierTags.TITLE = 'title';
modifierTags.LANGUAGE = 'language';
modifierTags.ALTERNATE_SECTION = 'alternateSection';

export default modifierTags;
