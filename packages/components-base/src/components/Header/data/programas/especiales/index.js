import { getFirstMatch, getKey } from '@univision/fe-commons/dist/utils/helpers';
import { getTagHierarchyUri, getTagHierarchyNames } from '@univision/fe-commons/dist/utils/helpers/taxonomy/helpers';
import Store from '@univision/fe-commons/dist/store/store';
import { getBrandable } from '@univision/fe-commons/dist/store/storeHelpers';
import * as subNavTypes from '../../../HeaderProvider/Subnav/subNavTypes';

import shows from '../shows';
import links from './links.json';

/**
 * Especiales nav configuration
 * @param {Object} data api data
 * @returns {Object} the config object
 */
export default (data) => {
  const {
    slideshowType,
    tagHierarchy,
    type,
  } = data || {};
  const brandable = getBrandable(Store);
  const showLinks = slideshowType !== 'horizontalslideshow';
  // If the especial does not have a Logo, then render the default nav
  const linksKeys = Object.keys(links);
  return {
    ...shows(data),
    sectionUrl: brandable.uri,
    showLinks,
    // Add custom data here
    subNavComponent: type !== 'section' ? subNavTypes.DEFAULT : subNavTypes.BRANDED,
    links: {
      primary: getKey(links, getFirstMatch(getTagHierarchyNames(tagHierarchy), linksKeys),
        getKey(links, getFirstMatch(getTagHierarchyUri(tagHierarchy), linksKeys))),
    },
  };
};
