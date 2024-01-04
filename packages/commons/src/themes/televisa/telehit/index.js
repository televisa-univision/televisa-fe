import {
  BLACK,
  BLACK_STARTS,
  TRANSPARENT,
  MAGENTA_RGB,
  TELEHIT_BLUE,
  TELEHIT_BLACK,
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
  footerLogo: LOGOS.televisa,
  footerLogoHeight: '54px',
  globalNavBackgroundColor: TELEHIT_BLACK,
  globalNavLogoBackground: TRANSPARENT,
  globalNavLink: BLACK,
  navProviderBackgroundColor: BLACK_STARTS,
  headlineFont: {
    default: 'uvs-font-a-bold',
  },
  gradient: {
    start: BLACK_STARTS,
    end: BLACK_STARTS,
  },
  isBrandedHeaderBlack: false,
  brandedHeaderBackgroundColor: BLACK_STARTS,
  brandedHeaderColor: TRANSPARENT,
  primary: BLACK_STARTS,
  secondary: BLACK,
  custom: {
    'a:hoover': TELEHIT_BLUE,
    a: TELEHIT_BLUE,
    b: TELEHIT_BLUE,
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
  categoryColor: BLACK_STARTS,
  widgetTitleColor: BLACK,
  widgetLinkTitleColor: BLACK,
  liveblogPostsTheme: BLACK_STARTS,
  listCardWidgetButtonBackgroundColor: BLACK_STARTS,
  listCardWidgetButtonBackgroundHoverColor: BLACK_STARTS,
});
