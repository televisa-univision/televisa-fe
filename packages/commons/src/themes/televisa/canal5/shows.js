import {
  TRANSPARENT,
  BLACK_STARTS,
  PRIMARY_PURPLE,
  GLOBAL_GRADIENT,
} from '@univision/fe-utilities/styled/constants';
import {
  HEADER_GRADIENT,
  LINK_HOVER_EFFECT,
  NAV_BACKGROUND_GRADIENT,
} from '../../../utils/styled/constants';

import { VERTICAL_SLIDESHOW } from '../../../constants/slideshowTypes';
import { ARTICLE, LIVE_BLOG, SLIDESHOW } from '../../../constants/contentTypes';

import LOGOS from '../../../constants/televisaSitesData';

/**
 * Helper to define is dark flag based on content type
 * @param {Object} data - Page Data
 * @returns {boolean}
 */
function getShowThemeByContentType(data) {
  const { type, slideshowType } = data;
  switch (type) {
    case ARTICLE:
    case LIVE_BLOG:
      return false;
    case SLIDESHOW:
      return slideshowType !== VERTICAL_SLIDESHOW;
    default:
      return true;
  }
}

/**
  * Theme object for shows configuration
  * @param {Object} data - Page Data
  * @returns {Object}
*/
const canal5ThemeShowsConfig = data => ({
  card: {
    isDark: {
      section: true,
      show: true,
      article: false,
      default: false,
      slideshow: true,
      soccermatch: true,
      video: true,
      videoInline: false,
      videoLive: false,
      liveblog: false,
      tags: false,
      search: false,
      author: false,
      error: false,
    },
    headlineFont: {
      default: 'uvs-font-b-bold',
    },
  },
  isDark: getShowThemeByContentType(data),
  footerLogo: LOGOS.televisaWithText,
  footerLogoHeight: '54px',
  globalNavBackgroundColor: NAV_BACKGROUND_GRADIENT,
  globalNavLink: LINK_HOVER_EFFECT,
  navProviderBackgroundColor: BLACK_STARTS,
  headlineFont: {
    default: 'uvs-font-a-bold',
  },
  gradient: GLOBAL_GRADIENT,
  isBrandedHeaderBlack: false,
  brandedHeaderBackgroundColor: HEADER_GRADIENT,
  brandedHeaderColor: TRANSPARENT,
  primary: TRANSPARENT,
  secondary: TRANSPARENT,
  widgetTitleColor: PRIMARY_PURPLE,
  custom: {
    'a:hover': PRIMARY_PURPLE,
    a: PRIMARY_PURPLE,
    'b:hover': PRIMARY_PURPLE,
    b: PRIMARY_PURPLE,
  },
  titleFontSize: {
    sm: '24px',
    md: '30px',
    lg: '30px',
    xl: '30px',
  },
  titleLineHeight: {
    sm: '29px',
    md: '33px',
    lg: '34px',
    xl: '34px',
  },
  descriptionFontSize: 'regular',
  categoryColor: PRIMARY_PURPLE,
  liveblogPostsTheme: PRIMARY_PURPLE,
  hideNavBottom: getShowThemeByContentType(data),
  globalNavLogoBackground: TRANSPARENT,
  // AMP
  ampHeaderBackgroundColor: PRIMARY_PURPLE,
  ampShareLinkBackgroundColor: PRIMARY_PURPLE,
});

export default canal5ThemeShowsConfig;
