import logoDesktop from '@univision/fe-commons/dist/assets/images/logo-shows-color.svg';
import logoMobile from '@univision/fe-commons/dist/assets/images/tulip-color.svg';
import logo from '@univision/fe-commons/dist/assets/images/logo-univision-white-tulip-color.svg';
import { themes } from '@univision/fe-commons/dist/utils/themes/themes.json';
import {
  getFirstMatch,
  getKey,
  isValidArray,
  toRelativeUrl,
} from '@univision/fe-commons/dist/utils/helpers';
import Store from '@univision/fe-commons/dist/store/store';
import { getBrandable, getDevice } from '@univision/fe-commons/dist/store/storeHelpers';
import features from '@univision/fe-commons/dist/config/features';
import programas from '..';
import links from './links.json';
import { getSectionTitle } from '../../helpers';
import * as subNavTypes from '../../../HeaderProvider/Subnav/subNavTypes';

/**
 * Shows nav configuration
 * @param {Object} data api data
 * @returns {Object} the config object
 */
export default (data) => {
  const {
    hierarchy,
    secondaryTags,
    slideshowType,
    type,
  } = data || {};
  const brandable = getBrandable(Store);
  const hierarchySize = isValidArray(hierarchy) && hierarchy.length;
  const isShowsHomePage = hierarchySize === 1 && getKey(hierarchy[0], 'name') === 'shows';
  const showLinks = slideshowType !== 'horizontalslideshow';
  const sectionTitle = !(isShowsHomePage && getDevice(Store) === 'desktop') && getSectionTitle(data);

  // The header for /shows should be to "Shows" and it's main sections.
  const isRootShowPage = (
    hierarchySize === 2
    && getFirstMatch([toRelativeUrl(getKey(hierarchy[1], 'uri'))], links.mainLinks.map(t => t && t.link))
  ) || isShowsHomePage;

  const isDark = features.shows.showsRedesign();

  if (isRootShowPage) {
    return {
      logoDesktop: isDark ? logo : logoDesktop,
      logoMobile,
      showLinks,
      globalHeader: true,
      logoUrl: '/shows',
      sectionTitle,
      sectionUrl: getKey(brandable.pageData, 'uri', ''),
      variant: isDark ? 'dark' : 'light',
      theme: isDark ? themes.white : themes.darkGrey,
      links: {
        primary: links.mainLinks,
      },
    };
  }

  // Breadcrumb links
  const tags = [{
    name: 'Noticias y más',
    link: `${brandable.uri}?tab=1`,
  }];

  if (isValidArray(secondaryTags)) {
    secondaryTags.forEach((item) => {
      tags.push({
        name: item.title,
        link: item.url,
      });
    });
  }
  // The default header for Shows
  return {
    ...programas(data),
    // Add custom data here
    brandable: { types: getKey(brandable, 'types', []) },
    fixedSectionUrl: true,
    sectionUrl: brandable.uri,
    subNavComponent: type !== 'section' ? subNavTypes.SHOWS : null,
    headerLogo: brandable.headerLogo,
    airTimeText: getKey(brandable.data, 'airTimeText'),
    sectionTitle: type === 'section' ? 'Shows' : sectionTitle,
    showLinks,
    links: { primary: tags },
  };
};
