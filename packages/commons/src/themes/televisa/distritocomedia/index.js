import {
  BLACK,
  BLACK_STARTS,
  TRANSPARENT,
} from '@univision/fe-utilities/styled/constants';
import LOGOS from '../../../constants/televisaSitesData';

/**
  * Theme object configuration
  * @returns {Object}
*/
const DistritoComediaThemeConfig = () => ({
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
  globalNavBackgroundColor: '#AA32D1',
  globalNavLogoBackground: TRANSPARENT,
  globalNavLink: 'linear-gradient(223deg, rgba(51, 51, 51, 0.10), rgba(48, 52, 75, 0.10))',
  navProviderBackgroundColor: BLACK_STARTS,
  headlineFont: {
    default: 'uvs-font-a-bold',
  },
  gradient: {
    start: '#662EE4',
    end: '#662EE4',
  },
  isBrandedHeaderBlack: false,
  brandedHeaderBackgroundColor: '#B832E0',
  brandedHeaderColor: TRANSPARENT,
  primary: '#B832E0',
  secondary: BLACK,
  custom: {
    'a:hover': '#662EE4',
    a: '#662EE4',
    'b:hover': '#662EE4',
    b: '#662EE4',
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
  categoryColor: '#662EE4',
  widgetTitleColor: BLACK,
  widgetLinkTitleColor: BLACK,
  liveblogPostsTheme: '#662EE4',
  listCardWidgetButtonBackgroundColor: '#662EE4',
  listCardWidgetButtonBackgroundHoverColor: '#662EE4',
  // AMP
  ampHeaderBackgroundColor: '#B832E0',
  ampShareLinkBackgroundColor: '#B832E0',
});

export default DistritoComediaThemeConfig;
