import {
  GLOBAL_GRADIENT,
  BALL_BLUE,
  WHITE,
} from '@univision/fe-utilities/styled/constants';
import LOGOS from '../../../constants/televisaSitesData';

import { VERTICAL_SLIDESHOW } from '../../../constants/slideshowTypes';
import { ARTICLE, LIVE_BLOG, SLIDESHOW } from '../../../constants/contentTypes';

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

// eslint-disable-next-line require-jsdoc
const LCDLFThemeConfig = data => ({
  // Global Nav Configuration
  globalNavBackgroundColor: 'linear-gradient(223deg, rgba(51, 51, 51, 0.10) 14.65%, rgba(48, 52, 75, 0.10) 84.52%)',
  globalNavLink: WHITE,
  globalNavLinkColor: WHITE,
  globalNavLogoBackground: BALL_BLUE,
  bottomBorderGlobalNav: WHITE,
  colorHoverGlobalNav: WHITE,
  hoverGlobalNav: 'linear-gradient(223deg, rgba(51, 51, 51, 0.10) 14.65%, rgba(48, 52, 75, 0.10) 84.52%)',
  // Branded Header Configuration
  brandedHeaderBackgroundColor: BALL_BLUE,
  brandedHeaderColor: BALL_BLUE,
  hideVixLogo: true,
  searchIconFill: WHITE,
  searchLabelColor: WHITE,
  // Navigation Configuration
  navProviderBackgroundColor: BALL_BLUE,
  colorBrandedLabels: WHITE,
  colorTextGlobalNav: WHITE,
  // Card configuration
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
  // Footer configurations
  footerLogo: LOGOS.lasestrellas,
  footerLogoHeight: '54px',
  // General configurations
  headlineFont: {
    default: 'uvs-font-a-bold',
  },
  gradient: GLOBAL_GRADIENT,
  isBrandedHeaderBlack: false,
  primary: BALL_BLUE,
  secondary: BALL_BLUE,
  // Article configuration
  showCateogryTag: true,
  custom: {
    'a:hover': BALL_BLUE,
    a: BALL_BLUE,
    b: BALL_BLUE,
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
  descriptionFontSize: 'regular', // could be 'small', 'regular', 'large'
  categoryColor: BALL_BLUE,
  widgetTitleColor: WHITE,
  liveblogPostsTheme: BALL_BLUE,
  mainIconIsDark: false,
  // Dark mode for shows
  isDark: getShowThemeByContentType(data),
  hideNavBottom: getShowThemeByContentType(data),
  // AMP
  ampHeaderBackgroundColor: BALL_BLUE,
  ampShareLinkBackgroundColor: BALL_BLUE,
});

export default LCDLFThemeConfig;
