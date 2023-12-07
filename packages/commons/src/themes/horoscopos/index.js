import {
  DAISY_BUSH,
  PURPLE,
  RED_VIOLET,
  SEANCE,
} from '../../utils/styled/constants';
import { getHorizontalThemeGradient } from '../../utils/styled/mixins';

const exposedNavGradient = getHorizontalThemeGradient({ end: PURPLE, start: SEANCE });

export default () => ({
  exposedNavGradient,
  card: {
    isDark: {
      audio: true,
      default: false,
      externallink: true,
      horoscopos: true,
      podcastseries: true,
      radiostation: true,
      section: true,
      show: true,
      slideshow: true,
      soccermatch: true,
      video: true,
      videoInline: false,
    },
  },
  headlineFont: {
    default: 'uvs-font-a-medium',
  },
  isBrandedHeaderBlack: false,
  primary: DAISY_BUSH,
  secondary: RED_VIOLET,
  shortTitleGradient: exposedNavGradient,
});
