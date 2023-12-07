import {
  ROSE,
  BLACK,
  SIREN,
  BLACKBERRY,
  FLIRT_OPAQUE,
  FRESH_EGGPLANT,
} from '../../utils/styled/constants';
import { VERTICAL_SLIDESHOW } from '../../constants/slideshowTypes';
import { getHorizontalThemeGradient } from '../../utils/styled/mixins';
import { ARTICLE, LIVE_BLOG, SLIDESHOW } from '../../constants/contentTypes.json';

const exposedNavGradient = getHorizontalThemeGradient({ start: FRESH_EGGPLANT, end: SIREN });

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
  return {
    card: {
      isDark: {
        audio: true,
        default: true,
        externallink: true,
        horoscopos: true,
        podcastseries: true,
        radiostation: true,
        section: true,
        slideshow: true,
        soccermatch: true,
        show: true,
        tvstation: true,
        video: true,
        videoInline: true,
      },
      headlineFont: {
        default: 'uvs-font-b-bold',
      },
    },
    exposedNavGradient,
    globalNavBackgroundColor: BLACKBERRY,
    headlineFont: {
      default: 'uvs-font-a-medium',
    },
    isDark: getShowThemeByContentType(data),
    isBrandedHeaderBlack: true,
    primary: FLIRT_OPAQUE,
    secondary: ROSE,
    isFooterDark: true,
    subNavBackgroundColor: BLACK,
    shortTitleGradient: exposedNavGradient,
  };
};
