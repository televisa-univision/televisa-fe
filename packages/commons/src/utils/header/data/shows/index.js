import genericNavData from '../genericNavData';
import links from './links/home';
import { isContentSubNav, getBrandable } from '../../helpers';
import { hasKey } from '../../../helpers';
import brandableTypes from '../../../brandable/types.json';

import * as subNavTypes from '../../../../constants/subNavTypes';

/**
 * Shows header
 * @param {Object} data Page data
 * @returns {Object}
 */
export default (data = {}) => {
  const defaultNav = genericNavData(data);
  const showPage = hasKey(data, 'show');
  const contentSubNav = isContentSubNav(defaultNav.subNavType);
  // this makes sure that branded show pages do not have subnav aka exposed navigation
  const subNavType = showPage && !contentSubNav
    ? subNavTypes.EMPTY_SUBNAV
    : defaultNav.subNavType;
  const brandable = getBrandable(data);
  const title = {
    ...defaultNav.title,
    name: 'TV Shows',
    link: '/shows',
  };

  if (brandable.type === brandableTypes.show) {
    title.name = brandable.title;
    title.link = brandable.uri;
  }

  return {
    ...defaultNav,
    brandableType: brandable.type,
    links: !showPage ? links : [],
    subNavType,
    title,
  };
};
