import {
  BLACK,
  MINE_SHAFT_BLACK,
  MERMAID_NET,
  TRANSPARENT,
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

/**
 * Returns the theme configuration for the show pages
 * @param {Object} data - Page Data
 * @returns {Object}
 */
const eln9veShowThemeConfig = (data) => {
  return {
    // Global Nav Configuration
    globalNavBackgroundColor: 'linear-gradient(223deg, rgba(51, 51, 51, 0.10), rgba(48, 52, 75, 0.10))',
    globalNavLink: 'linear-gradient(180deg, rgba(0, 0, 0, 0.28) 0%, rgba(0, 0, 0, 0.04))',
    globalNavLinkColor: MINE_SHAFT_BLACK,
    globalNavLogoBackground: TRANSPARENT,
    bottomBorderGlobalNav: MINE_SHAFT_BLACK,
    colorHoverGlobalNav: MINE_SHAFT_BLACK,
    hoverGlobalNav: 'linear-gradient(180deg, rgba(0, 0, 0, 0.28) 0%, rgba(0, 0, 0, 0.04))',
    // Branded Header Configuration
    brandedHeaderBackgroundColor: MERMAID_NET,
    brandedHeaderColor: MERMAID_NET,
    brandedLogoFill: MINE_SHAFT_BLACK,
    hideVixLogo: true,
    searchIconFill: MINE_SHAFT_BLACK,
    searchLabelColor: MINE_SHAFT_BLACK,
    // Navigation Configuration
    navProviderBackgroundColor: MERMAID_NET,
    colorBrandedLabels: MINE_SHAFT_BLACK,
    colorTextGlobalNav: MINE_SHAFT_BLACK,
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
    gradient: {
      start: MERMAID_NET,
      end: MERMAID_NET,
    },
    isBrandedHeaderBlack: false,
    primary: MERMAID_NET,
    secondary: MERMAID_NET,
    // Article configuration
    showCategoryTag: true,
    custom: {
      'a:hoover': MERMAID_NET,
      a: MERMAID_NET,
      b: MERMAID_NET,
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
    categoryColor: MERMAID_NET,
    widgetTitleColor: WHITE,
    widgetLinkTitleColor: BLACK,
    liveblogPostsTheme: MERMAID_NET,
    mainIconIsDark: true,
    listCardWidgetButtonBackgroundColor: MERMAID_NET,
    listCardWidgetButtonBackgroundHoverColor: MERMAID_NET,
    // Dark mode for shows
    isDark: getShowThemeByContentType(data),
    hideNavBottom: true,
    // AMP
    ampHeaderBackgroundColor: MERMAID_NET,
    ampShareLinkBackgroundColor: MERMAID_NET,
  };
};

export default eln9veShowThemeConfig;
