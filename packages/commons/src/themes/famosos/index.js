import {
  CERISE_RED,
  DARK_GOLDEN_ROD,
  DEEP_CERISE,
  FLIRT,
  MULBERRY_WOOD,
} from '../../utils/styled/constants';
import { getHorizontalThemeGradient } from '../../utils/styled/mixins';

const exposedNavGradient = getHorizontalThemeGradient({ end: DEEP_CERISE, start: DARK_GOLDEN_ROD });

export default () => ({
  card: {
    isDark: {
      audio: true,
      default: false,
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
      videoInline: false,
    },
    headlineFont: {
      default: 'uvs-font-b-bold',
    },
  },
  exposedNavGradient,
  globalNavBackgroundColor: MULBERRY_WOOD,
  headlineFont: {
    default: 'uvs-font-a-medium',
  },
  isBrandedHeaderBlack: false,
  primary: FLIRT,
  secondary: CERISE_RED,
  shortTitleGradient: exposedNavGradient,
});
