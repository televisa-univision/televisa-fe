import {
  CERULEAN_BLUE,
  CHATHAMS_BLUE,
  LIGHT_BLUE,
} from '../../utils/styled/constants';
import { getHorizontalThemeGradient } from '../../utils/styled/mixins';

const exposedNavGradient = getHorizontalThemeGradient({ end: LIGHT_BLUE, start: CERULEAN_BLUE });

export default () => ({
  card: {
    isDark: {
      auto: true,
      default: false,
      horoscopos: true,
      podcastseries: true,
      radiostation: true,
      slideshow: true,
      soccermatch: true,
      show: true,
      tvstation: true,
      video: true,
      videoInline: false,
    },
    headlineFont: {
      default: 'uvs-font-b-bold',
    },
  },
  exposedNavGradient,
  globalNavBackgroundColor: CHATHAMS_BLUE,
  headlineFont: {
    default: 'uvs-font-b-bold',
  },
  isBrandedHeaderBlack: false,
  primary: CERULEAN_BLUE,
  secondary: LIGHT_BLUE,
  shortTitleGradient: exposedNavGradient,
});
