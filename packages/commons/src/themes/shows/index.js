import {
  BLACK,
  DARK_VARIANT,
  LAVENDER,
  MEDIUM_PURPLE,
  SHOWS_GRADIENT,
  GREY_BLACK,
} from '@univision/fe-utilities/styled/constants';
import { getKey, deburrToLowerCase } from '../../utils/helpers';
import {
  BLACK_BEAN_MIDNIGHT_GRADIENT,
} from '../../utils/styled/constants';
import univisionLogoWhite from '../../assets/images/logo-univision-white.svg';
import { VERTICAL_SLIDESHOW } from '../../constants/slideshowTypes';
import { ARTICLE, LIVE_BLOG, SLIDESHOW } from '../../constants/contentTypes';
import shows from './shows';

/**
 * Helper to define is dark flag based on content type
 * @param {Object} data - Page Data
 * @returns {boolean}
 */
function getShowThemeByContentType(data) {
  const { type, slideshowType } = data;
  switch (type) {
    case ARTICLE:
    case LIVE_BLOG:
      return false;
    case SLIDESHOW:
      return slideshowType !== VERTICAL_SLIDESHOW;
    default:
      return true;
  }
}

export default (data) => {
  const showName = getKey(data, 'show.title');
  // Import the specific Show background images
  const shortTitleBackgroundImages = getKey(shows, `${deburrToLowerCase(showName)}.shortTitleBackgroundImages`, '');
  const setContentImages = {
    xxs: getKey(data, 'show.contentImages.mobile.renditions.original.href', shortTitleBackgroundImages.xxs),
    md: getKey(data, 'show.contentImages.desktop.renditions.original.href', shortTitleBackgroundImages.md),
  };

  return {
    card: {
      isDark: {
        default: true,
      },
      headlineFont: {
        default: 'uvs-font-b-bold',
      },
    },
    custom: {
      a: `${MEDIUM_PURPLE} !important`,
      'a:hover': `${LAVENDER} !important`,
    },
    exposedNavGradient: BLACK_BEAN_MIDNIGHT_GRADIENT,
    footerLogo: univisionLogoWhite,
    gradient: SHOWS_GRADIENT,
    globalNavBackgroundColor: BLACK,
    globalNavBorderTop: '1px solid rgba(210, 210, 210, .41)',
    headlineFont: {
      portrait: 'uvs-font-a-bold',
      rectangle: 'uvs-font-a-bold',
      default: 'uvs-font-a-black',
    },
    isBrandedHeaderBlack: true,
    isDark: getShowThemeByContentType(data),
    isFooterDark: true,
    primary: GREY_BLACK,
    secondary: BLACK,
    shortTitleBackgroundImages: setContentImages,
    shortTitleGradient: BLACK_BEAN_MIDNIGHT_GRADIENT,
    subNavBackgroundColor: BLACK,
    variant: DARK_VARIANT,
  };
};
