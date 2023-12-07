import {
  BLACK,
  GLOBAL_GRADIENT,
  BLACK_STARTS,
  TRANSPARENT,
  MAGENTA_RGB,
} from '@univision/fe-utilities/styled/constants';
import LOGOS from '../../../constants/televisaSitesData';

export const distritoComediaThemeConfig = {
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
  footerLogo: LOGOS.distritocomedia,
  footerLogoHeight: '54px',
  globalNavBackgroundColor: '#AA32D1',
  globalNavLogoBackground: TRANSPARENT,
  globalNavLink: 'linear-gradient(223deg, rgba(51, 51, 51, 0.10), rgba(48, 52, 75, 0.10))',
  navProviderBackgroundColor: BLACK_STARTS,
  headlineFont: {
    default: 'uvs-font-a-bold',
  },
  gradient: GLOBAL_GRADIENT,
  isBrandedHeaderBlack: false,
  brandedHeaderBackgroundColor: '#B832E0',
  brandedHeaderColor: TRANSPARENT,
  primary: '#B832E0',
  secondary: BLACK,
  custom: {
    'a:hoover': MAGENTA_RGB,
    a: MAGENTA_RGB,
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
  categoryColor: MAGENTA_RGB,
  widgetTitleColor: MAGENTA_RGB,
  liveblogPostsTheme: MAGENTA_RGB,
  // AMP
  ampHeaderBackgroundColor: MAGENTA_RGB,
  ampShareLinkBackgroundColor: MAGENTA_RGB,
};

export default () => distritoComediaThemeConfig;
