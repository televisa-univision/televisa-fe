import {
  TRANSPARENT,
  BLACK_STARTS,
  GLOBAL_GRADIENT,
  MINE_SHAFT_BLACK,
} from '@univision/fe-utilities/styled/constants';
import {
  LINK_HOVER_EFFECT,
  GRADIENT_UNICABLE,
  SOLID_COLOR_UNICABLE,
  YELLOW_DARK,
  WHITE,
} from '../../../utils/styled/constants';

import { VERTICAL_SLIDESHOW } from '../../../constants/slideshowTypes';

import {
  ARTICLE,
  LIVE_BLOG,
  SLIDESHOW,
} from '../../../constants/contentTypes';

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
export const unicableThemeConfig = data => ({
  card: {
    isDark: {
      show: true,
      video: true,
      tags: false,
      error: false,
      author: false,
      search: false,
      section: true,
      article: false,
      default: false,
      liveblog: false,
      slideshow: true,
      videoLive: false,
      soccermatch: true,
      videoInline: false,
    },
    headlineFont: {
      default: 'uvs-font-b-bold',
    },
  },
  isDark: getShowThemeByContentType(data),
  footerLogo: LOGOS.televisaWithText,
  footerLogoHeight: '54px',
  globalNavBackgroundColor: SOLID_COLOR_UNICABLE,
  globalNavLogoBackground: TRANSPARENT,
  globalNavLink: LINK_HOVER_EFFECT,
  navProviderBackgroundColor: BLACK_STARTS,
  headlineFont: {
    default: 'uvs-font-a-bold',
  },
  gradient: GLOBAL_GRADIENT,
  isBrandedHeaderBlack: false,
  brandedHeaderBackgroundColor: GRADIENT_UNICABLE,
  hoverGlobalNav: 'linear-gradient(180deg, rgba(0, 0, 0, 0.28) 0%, rgba(0, 0, 0, 0.04) 100%);',
  colorHoverGlobalNav: MINE_SHAFT_BLACK,
  bottomBorderGlobalNav: MINE_SHAFT_BLACK,
  colorTextGlobalNav: MINE_SHAFT_BLACK,
  brandedHeaderColor: TRANSPARENT,
  colorBrandedLabels: MINE_SHAFT_BLACK,
  colorLabelTag: MINE_SHAFT_BLACK,
  showVixLogo: false,
  mainIconIsDark: true,
  primary: TRANSPARENT,
  secondary: YELLOW_DARK,
  custom: {
    'a:hover': WHITE,
    a: WHITE,
    'b:hover': WHITE,
    b: WHITE,
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
    lg: '33px',
    xl: '33px',
  },
  descriptionFontSize: 'regular',
  categoryColor: WHITE,
  widgetTitleColor: WHITE,
  liveblogPostsTheme: WHITE,
  hideNavBottom: getShowThemeByContentType(data),
  // AMP
  ampHeaderBackgroundColor: GRADIENT_UNICABLE,
  ampShareLinkBackgroundColor: GRADIENT_UNICABLE,
});

export default unicableThemeConfig;
