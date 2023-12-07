import {
  BLACK,
  BORDEAUX,
  CARDINAL,
  POMEGRANATE,
} from '../../utils/styled/constants';
import { getHorizontalThemeGradient } from '../../utils/styled/mixins';

const exposedNavGradient = getHorizontalThemeGradient({ end: BLACK, start: BORDEAUX });

export default () => ({
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
