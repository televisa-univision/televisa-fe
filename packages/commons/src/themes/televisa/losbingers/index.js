import {
  BLACK,
  BLACK_STARTS,
  TRANSPARENT,
  WATER_SPORTS,
  MINE_SHAFT_BLACK,
} from '@univision/fe-utilities/styled/constants';
import LOGOS from '../../../constants/televisaSitesData';

const losBingersThemeConfig = {
  // Global Nav Configuration
  globalNavBackgroundColor: 'linear-gradient(223deg, rgba(51, 51, 51, 0.10) 14.65%, rgba(48, 52, 75, 0.10) 84.52%)',
  globalNavLink: 'linear-gradient(180deg, rgba(0, 0, 0, 0.28) 0%, rgba(0, 0, 0, 0.04))',
  globalNavLinkColor: BLACK_STARTS,
  globalNavLogoBackground: TRANSPARENT,
  hoverGlobalNav: 'linear-gradient(180deg, rgba(0, 0, 0, 0.28) 0%, rgba(0, 0, 0, 0.04))',
  colorHoverGlobalNav: MINE_SHAFT_BLACK,
  bottomBorderGlobalNav: MINE_SHAFT_BLACK,
  vixLogoLeftPipeColor: `1px solid rgba(${BLACK_STARTS}, .5)`,
  // Branded Header Configuration
  brandedHeaderBackgroundColor: WATER_SPORTS,
  brandedHeaderColor: WATER_SPORTS,
  brandedLogoFill: BLACK_STARTS,
  // Navigation Configuration
  navProviderBackgroundColor: WATER_SPORTS,
  colorBrandedLabels: BLACK_STARTS,
  // this needs to be an rgb value
  colorVixLogoDivider: '0, 0, 0',
  colorTextGlobalNav: BLACK_STARTS,
  showVixLogo: true,
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
    start: WATER_SPORTS,
    end: WATER_SPORTS,
  },
  isBrandedHeaderBlack: false,
  primary: WATER_SPORTS,
  secondary: BLACK_STARTS,
  custom: {
    'a:hoover': BLACK_STARTS,
    a: BLACK_STARTS,
    b: WATER_SPORTS,
  },
  // Article configuration
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
  categoryColor: WATER_SPORTS,
  widgetTitleColor: WATER_SPORTS,
  widgetLinkTitleColor: BLACK,
  liveblogPostsTheme: WATER_SPORTS,
  mainIconIsDark: true,
  // AMP
  ampHeaderBackgroundColor: BLACK_STARTS,
  ampShareLinkBackgroundColor: BLACK_STARTS,
  listCardWidgetButtonBackgroundColor: WATER_SPORTS,
  listCardWidgetButtonBackgroundHoverColor: WATER_SPORTS,
};

export default () => losBingersThemeConfig;
