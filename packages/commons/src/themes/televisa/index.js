import {
  GLOBAL_GRADIENT,
  TRANSPARENT,
  BLACK_STARTS,
  BLACK,
} from '@univision/fe-utilities/styled/constants';
import {
  MAGENTA_RGB,
  THEME_DEFAULT_SECONDARY,
  WHITE,
} from '../../utils/styled/constants';

export default () => ({
  card: {
    isDark: {
      section: false,
      show: false,
      article: false,
      default: false,
      slideshow: false,
      soccermatch: false,
      video: false,
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
  globalNavBackgroundColor: WHITE,
  globalNavLink: BLACK,
  navProviderBackgroundColor: BLACK_STARTS,
  headlineFont: {
    default: 'uvs-font-a-bold',
  },
  gradient: GLOBAL_GRADIENT,
  isBrandedHeaderBlack: false,
  brandedHeaderBackgroundColor: TRANSPARENT,
  brandedHeaderColor: TRANSPARENT,
  primary: MAGENTA_RGB,
  secondary: THEME_DEFAULT_SECONDARY,
});
