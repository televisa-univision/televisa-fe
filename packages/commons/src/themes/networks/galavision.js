import {
  BLACK,
  DARKER_GREY,
  MARTINIQUE,
} from '../../utils/styled/constants';
import { getHorizontalThemeGradient } from '../../utils/styled/mixins';

const gradient = getHorizontalThemeGradient({ end: MARTINIQUE, start: DARKER_GREY });

// Galavision theme
export default () => ({
  exposedNavBackgroundImages: {
    xxs: 'https://st1.uvnimg.com/32/b2/d35871514d309fdf9d3e59f9b240/galavision-414.png',
    sm: 'https://st1.uvnimg.com/54/88/d038b38344c882af9109708d9407/galavision-768.png',
    md: 'https://st1.uvnimg.com/41/6f/947304684a199bb6d3e78fab2176/galavision-1024.png',
    xl: 'https://st1.uvnimg.com/7a/f0/eaca6ba2476ea1a1505421eef823/galavision-1440.png',
  },
  gradient,
  globalNavBackgroundColor: BLACK,
  headlineFont: {
    default: 'uvs-font-a-black',
  },
  isBrandedHeaderBlack: false,
  primary: BLACK,
  secondary: DARKER_GREY,
  shortTitleBackgroundImages: {
    xxs: 'https://st1.uvnimg.com/ad/c1/67ca4ba945ce95eb3058840aea79/galavision-414.png',
    sm: 'https://st1.uvnimg.com/e7/a5/5ed200ad4b7f9dd1c714eebe0aa2/galavision-768.png',
    md: 'https://st1.uvnimg.com/87/62/90b3323f45ea9bfa9826da657ec1/galavision-1024.png',
    xl: 'https://st1.uvnimg.com/71/b2/991d56ed4f838a6d8f94f3adacf5/galavision-1440.png',
  },
  card: {
    isDark: {
      horoscopos: true,
      video: true,
      slideshow: true,
    },
  },
});
