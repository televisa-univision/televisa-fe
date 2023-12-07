import {
  TRANSPARENT,
  BRIGHT_GREY,
  GLOBAL_GRADIENT,
  BLUE_ZODIAC,
  WHITE,
} from '@univision/fe-utilities/styled/constants';
import {
  LINK_HOVER_EFFECT,
  GRADIENT_TRANSPARENT_GREY_TO_GREY,
} from '../../../utils/styled/constants';
import LOGOS from '../../../constants/televisaSitesData';

/**
  * Theme object configuration
  * @returns {Object}
*/
export default () => ({
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
  globalNavBackgroundColor: GRADIENT_TRANSPARENT_GREY_TO_GREY,
  globalNavLogoBackground: TRANSPARENT,
  globalNavLink: LINK_HOVER_EFFECT,
  navProviderBackgroundColor: BRIGHT_GREY,
  headlineFont: {
    default: 'uvs-font-a-bold',
  },
  gradient: GLOBAL_GRADIENT,
  isBrandedHeaderBlack: false,
  brandedHeaderBackgroundColor: WHITE,
  brandedHeaderColor: TRANSPARENT,
  primary: TRANSPARENT,
  secondary: TRANSPARENT,
  custom: {
    'a:hover': BLUE_ZODIAC,
    a: BLUE_ZODIAC,
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
  categoryColor: BLUE_ZODIAC,
  widgetTitleColor: BLUE_ZODIAC,
  liveblogPostsTheme: BLUE_ZODIAC,
  // AMP
  ampHeaderBackgroundColor: BLUE_ZODIAC,
  ampShareLinkBackgroundColor: BLUE_ZODIAC,
});
