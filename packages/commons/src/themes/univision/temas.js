import {
  THEME_DEFAULT_SECONDARY,
  GLOBAL_GRADIENT,
  BLACK,
} from '@univision/fe-utilities/styled/constants';

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
  exposedNavBackgroundImages: {
    xxs: 'https://st1.uvnimg.com/b4/3b/9c005a2048afabefd1b3f42ac993/mobile-414.png',
    sm: 'https://st1.uvnimg.com/9c/7c/1e260105402b92df79d60c8cddc2/tablet-768.png',
    md: 'https://st1.uvnimg.com/33/da/fd9d018c4bdc8c826ce78f2bfe93/tablet-1024.png',
    xl: 'https://st1.uvnimg.com/be/cf/ff4f50b44320bad6492c805e786c/desktop-1440.png',
  },
  gradient: GLOBAL_GRADIENT,
  primary: BLACK,
  secondary: THEME_DEFAULT_SECONDARY,
  subNavBackgroundColor: BLACK,
});
