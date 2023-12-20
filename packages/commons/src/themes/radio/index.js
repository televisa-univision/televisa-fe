import {
  BLACK,
  BORDEAUX,
  CARDINAL,
  POMEGRANATE,
} from '../../utils/styled/constants';
import { isPartOfDestino2024 } from '../../utils/header/data/locales/localesNavHelpers';
import { getHorizontalThemeGradient } from '../../utils/styled/mixins';

const exposedNavGradient = getHorizontalThemeGradient({ end: BLACK, start: BORDEAUX });
/**
 * Get the exposed nav background images for the header
 * @param {*} data - Current data
 * @returns {Object}
 */
const getExposedNavBackgroundImages = (data) => {
  if (isPartOfDestino2024(data.uri)) {
    return {
      xxs: 'https://st1.uvnimg.com/d5/ac/ba0cd332476083d2bac9d6c8399b/background-expose-eleciones-national-mobile.png',
      sm: 'https://st1.uvnimg.com/99/aa/9c9219064e6283684b9cd839ee54/background-expose-eleciones-national-tablet-768.png',
      md: 'https://st1.uvnimg.com/d9/af/f4e030c443e69c1539b1bd3942f7/exposed-elections-national-md.png',
      xl: 'https://st1.uvnimg.com/c8/97/c4f47b28479eb62b59ac0d1e219a/background-expose-eleciones-national-desktop.png',
    };
  }
  return null;
};

export default (data = {}, options = {}) => ({
  card: {
    isDark: {
      audio: true,
      default: false,
      externallink: true,
      podcastseries: true,
      radiostation: true,
      section: true,
      show: true,
      slideshow: true,
      soccermatch: true,
      tvstation: true,
      video: true,
      videoInline: false,
    },
    headlineFont: {
      default: 'uvs-font-b-bold',
    },
  },
  exposedNavGradient,
  exposedNavBackgroundImages: getExposedNavBackgroundImages(data),
  globalNavBackgroundColor: BLACK,
  headlineFont: {
    rectangle: 'uvs-font-a-bold',
    default: 'uvs-font-a-black',
  },
  isBrandedHeaderBlack: false,
  primary: CARDINAL,
  secondary: POMEGRANATE,
  shortTitleGradient: exposedNavGradient,
});
