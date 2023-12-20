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
  footerLogo: LOGOS.telehit,
  footerLogoHeight: '54px',
  globalNavBackgroundColor: '#AA32D1',
  globalNavLogoBackground: TRANSPARENT,
  globalNavLink: BLACK,
  navProviderBackgroundColor: BLACK_STARTS,
  headlineFont: {
    default: 'uvs-font-a-bold',
  },
  gradient: {
    start: '#AA32D1',
    end: '#AA32D1',
  },
  isBrandedHeaderBlack: false,
  brandedHeaderBackgroundColor: '#B832E0',
  brandedHeaderColor: TRANSPARENT,
  primary: '#B832E0',
  secondary: BLACK,
  custom: {
    'a:hoover': MAGENTA_RGB,
    a: MAGENTA_RGB,
    b: MAGENTA_RGB,
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
  widgetLinkTitleColor: BLACK,
  liveblogPostsTheme: MAGENTA_RGB,
  listCardWidgetButtonBackgroundColor: MAGENTA_RGB,
  listCardWidgetButtonBackgroundHoverColor: MAGENTA_RGB,
});
