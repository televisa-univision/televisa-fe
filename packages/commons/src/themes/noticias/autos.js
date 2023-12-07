import {
  ALIZARIN_CRIMSON_BRIGHTER,
  BLACK_BEAN_MIDNIGHT_GRADIENT,
  DARKER_GREY,
  TAMARILLO,
  THEME_DEFAULT_SECONDARY,
  GREY_BLACK,
} from '../../utils/styled/constants';

// Autos theme
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
  },
  custom: {
    a: `${ALIZARIN_CRIMSON_BRIGHTER} !important`,
    'a:hover': `${TAMARILLO} !important`,
  },
  exposedNavGradient: BLACK_BEAN_MIDNIGHT_GRADIENT,
  globalNavBackgroundColor: DARKER_GREY,
  headlineFont: {
    default: 'uvs-font-a-bold',
  },
  isBrandedHeaderBlack: false,
  primary: GREY_BLACK,
  secondary: THEME_DEFAULT_SECONDARY,
  shortTitleGradient: BLACK_BEAN_MIDNIGHT_GRADIENT,
  subNavBackgroundColor: DARKER_GREY,
});
