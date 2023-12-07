// TODO: BEX Migration - Placeholder file for one possible Canal 5 Category and its Theme.
import {
  BLACK,
  GLOBAL_GRADIENT,
  BLACK_STARTS,
  TRANSPARENT,
  MAGENTA_RGB,
} from '@univision/fe-utilities/styled/constants';
import LOGOS from '../../../constants/televisaSitesData';

export default () => ({
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
  isDark: true,
  footerLogo: LOGOS.lasestrellas,
  footerLogoHeight: '54px',
  globalNavBackgroundColor: 'linear-gradient(135deg, rgba(51, 51, 51, 0.1), rgba(48, 52, 75, 0.1))',
  globalNavLink: BLACK,
  navProviderBackgroundColor: BLACK_STARTS,
  hideNavBottom: true,
  headlineFont: {
    default: 'uvs-font-a-bold',
  },
  gradient: GLOBAL_GRADIENT,
  isBrandedHeaderBlack: true,
  brandedHeaderBackgroundColor: TRANSPARENT,
  brandedHeaderColor: TRANSPARENT,
  primary: BLACK,
  secondary: BLACK,
  custom: {
    b: MAGENTA_RGB,
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
  // AMP
  ampHeaderBackgroundColor: MAGENTA_RGB,
  ampShareLinkBackgroundColor: MAGENTA_RGB,
});
