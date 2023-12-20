import {
  BLACK,
  TRANSPARENT,
  BLACK_STARTS,
  SOLID_BRAVE_RED,
} from '@univision/fe-utilities/styled/constants';
import LOGOS from '../../../constants/televisaSitesData';
import { LINK_HOVER_EFFECT } from '../../../utils/styled/constants';

/**
  * Theme object configuration
  * @returns {Object}
*/
export const bandamaxThemeConfig = () => ({
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
  footerLogo: LOGOS.televisaWithText,
  footerLogoHeight: '54px',
  globalNavBackgroundColor: BLACK_STARTS,
  globalNavLogoBackground: TRANSPARENT,
  globalNavLink: LINK_HOVER_EFFECT,
  navProviderBackgroundColor: BLACK_STARTS,
  headlineFont: {
    default: 'uvs-font-a-bold',
  },
  gradient: {
    start: SOLID_BRAVE_RED,
    end: SOLID_BRAVE_RED,
  },
  isBrandedHeaderBlack: false,
  brandedHeaderBackgroundColor: BLACK,
  brandedHeaderColor: TRANSPARENT,
  primary: TRANSPARENT,
  secondary: TRANSPARENT,
  custom: {
    'a:hover': SOLID_BRAVE_RED,
    a: SOLID_BRAVE_RED,
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
  categoryColor: SOLID_BRAVE_RED,
  widgetTitleColor: SOLID_BRAVE_RED,
  widgetLinkTitleColor: BLACK,
  liveblogPostsTheme: SOLID_BRAVE_RED,
  listCardWidgetButtonBackgroundColor: SOLID_BRAVE_RED,
  listCardWidgetButtonBackgroundHoverColor: SOLID_BRAVE_RED,
  // AMP
  ampHeaderBackgroundColor: SOLID_BRAVE_RED,
  ampShareLinkBackgroundColor: SOLID_BRAVE_RED,
});

export default bandamaxThemeConfig;
