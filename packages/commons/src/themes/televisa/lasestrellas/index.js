import {
  BLACK,
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
  showVixLogo: true,
  footerLogo: LOGOS.lasestrellas,
  footerLogoHeight: '54px',
  globalNavBackgroundColor: 'linear-gradient(135deg, rgba(51, 51, 51, 0.1), rgba(48, 52, 75, 0.1))',
  globalNavLink: BLACK,
  navProviderBackgroundColor: BLACK_STARTS,
  headlineFont: {
    default: 'uvs-font-a-bold',
  },
  gradient: {
    start: MAGENTA_RGB,
    end: MAGENTA_RGB,
  },
  isBrandedHeaderBlack: true,
  brandedHeaderBackgroundColor: BLACK,
  brandedHeaderColor: TRANSPARENT,
  primary: BLACK,
  secondary: BLACK,
  custom: {
    'a:hoover': `${MAGENTA_RGB} !important`,
    a: `${MAGENTA_RGB} !important`,
    b: `${MAGENTA_RGB} !important`,
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
  widgetTitleColor: BLACK,
  widgetLinkTitleColor: BLACK,
  liveblogPostsTheme: MAGENTA_RGB,
  slideshowTitleTheme: MAGENTA_RGB,
  listCardWidgetButtonBackgroundColor: MAGENTA_RGB,
  listCardWidgetButtonBackgroundHoverColor: MAGENTA_RGB,
  // AMP
  ampHeaderBackgroundColor: BLACK,
  ampShareLinkBackgroundColor: BLACK,
});
