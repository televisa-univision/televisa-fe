import {
  BLACK,
  DARKER_GREY,
  MARTINIQUE,
} from '../../utils/styled/constants';
import { getHorizontalThemeGradient } from '../../utils/styled/mixins';

const gradient = getHorizontalThemeGradient({ end: MARTINIQUE, start: DARKER_GREY });

// Unimas theme
export default () => ({
  exposedNavBackgroundImages: {
    xxs: 'https://st1.uvnimg.com/28/4b/db86c8364895a247ee54b60a25e3/mobile414.png',
    sm: 'https://st1.uvnimg.com/98/95/ce5cf56d4411a99e7667557aa033/tablet-768.png',
    md: 'https://st1.uvnimg.com/44/0b/0d064a5e4a28b7d0dc20fe01daf9/tablet-1024.png',
    xl: 'https://st1.uvnimg.com/3e/91/433d225a47b1874895c0c1ea538f/desktop-1440.png',
  },
  card: {
    isDark: {
      slideshow: true,
    },
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
    xxs: 'https://st1.uvnimg.com/28/4b/db86c8364895a247ee54b60a25e3/mobile414.png',
    sm: 'https://st1.uvnimg.com/98/95/ce5cf56d4411a99e7667557aa033/tablet-768.png',
    md: 'https://st1.uvnimg.com/44/0b/0d064a5e4a28b7d0dc20fe01daf9/tablet-1024.png',
    xl: 'https://st1.uvnimg.com/3e/91/433d225a47b1874895c0c1ea538f/desktop-1440.png',
  },
});
