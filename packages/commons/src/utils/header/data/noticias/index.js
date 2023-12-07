import { getHeaderLink, isContentSubNav, isVerticalHomeByUri } from '../../helpers';
import { getFirstMatch } from '../../../helpers';
import { getTagHierarchyUri } from '../../../helpers/taxonomy/helpers';

import genericNavData from '../genericNavData';
import homeLinks from './links/home';
import overrides from './overrides';

const logo = 'https://st1.uvnimg.com/8e/a6/35d4a669416fb88f32eb3a3a067e/logo-noticias-exposed-nav.svg';

export default (data = {}) => {
  const defaultNav = genericNavData(data);
  const isVertical = isVerticalHomeByUri(data.uri);
  const isContent = isContentSubNav(defaultNav.subNavType);
  let title = {
    ...defaultNav.title,
    logo: isVertical || isContent ? logo : null,
    name: isVertical || isContent ? null : defaultNav.title.name,
    link: getHeaderLink(data),
  };

  let links = isVertical ? homeLinks : [];

  // Overrides based on hierarchy, to overwrite values on the data.
  const { tagHierarchy } = data;
  // Extracting a title and links from the overrides, when one of the
  // uris from the tagHierarchy object matches with the ones configured in the overrides.
  // If not found it will just return undefined values and ignore the value override.
  const {
    title: customTitle,
    links: customLinks,
  } = overrides[getFirstMatch(
    getTagHierarchyUri(tagHierarchy),
    Object.keys(overrides),
  )] || {};

  // If override title is available, then bring all data set in there
  if (customTitle) {
    title = {
      ...defaultNav.title,
      ...customTitle,
    };
  }

  // If override links are available, overwrite them
  if (customLinks) {
    links = customLinks;
  }

  return {
    ...defaultNav,
    links,
    title,
  };
};
