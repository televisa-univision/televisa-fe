import {
  TRANSPARENT,
  BLACK_STARTS,
  PRIMARY_PURPLE,
  BLACK,
} from '@univision/fe-utilities/styled/constants';
import {
  HEADER_GRADIENT,
  LINK_HOVER_EFFECT,
  NAV_BACKGROUND_GRADIENT,
} from '../../../utils/styled/constants';
import LOGOS from '../../../constants/televisaSitesData';

/**
  * Theme object configuration
  * @returns {Object}
*/
const canal5ThemeConfig = () => ({
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
  globalNavBackgroundColor: NAV_BACKGROUND_GRADIENT,
  globalNavLogoBackground: TRANSPARENT,
  globalNavLink: LINK_HOVER_EFFECT,
  navProviderBackgroundColor: BLACK_STARTS,
  headlineFont: {
    default: 'uvs-font-a-bold',
  },
  gradient: {
    start: PRIMARY_PURPLE,
    end: PRIMARY_PURPLE,
  },
  isBrandedHeaderBlack: false,
  brandedHeaderBackgroundColor: HEADER_GRADIENT,
  brandedHeaderColor: TRANSPARENT,
  primary: TRANSPARENT,
  secondary: TRANSPARENT,
  widgetTitleColor: BLACK,
  widgetLinkTitleColor: BLACK,
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
    lg: '33px',
    xl: '33px',
  },
  showCategoryTag: true,
  descriptionFontSize: 'regular',
  tagLabelColor: PRIMARY_PURPLE,
  categoryColor: PRIMARY_PURPLE,
  liveblogPostsTheme: PRIMARY_PURPLE,
  listCardWidgetButtonBackgroundColor: PRIMARY_PURPLE,
  listCardWidgetButtonBackgroundHoverColor: PRIMARY_PURPLE,
  // AMP
  ampHeaderBackgroundColor: PRIMARY_PURPLE,
  ampShareLinkBackgroundColor: PRIMARY_PURPLE,
});

export default canal5ThemeConfig;
