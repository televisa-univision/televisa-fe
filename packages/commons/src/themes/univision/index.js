import {
  GLOBAL_GRADIENT,
} from '@univision/fe-utilities/styled/constants';
import {
  MINE_SHAFT,
  THEME_DEFAULT_SECONDARY,
} from '../../utils/styled/constants';

export default () => ({
  card: {
    isDark: {
      audio: true,
      default: false,
      horoscopos: true,
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
  globalNavBackgroundColor: MINE_SHAFT,
  headlineFont: {
    default: 'uvs-font-a-bold',
  },
  gradient: GLOBAL_GRADIENT,
  isBrandedHeaderBlack: false,
  primary: '#000000',
  secondary: THEME_DEFAULT_SECONDARY,
});
