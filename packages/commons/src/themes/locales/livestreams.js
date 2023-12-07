import {
  ASTRONAUT,
  BLUE,
  CERULEAN_BLUE,
  CHAMBRAY,
  EBONY,
  HAITI,
  LIGHT_BLUE,
  GRADIENT_WHITE_TRANSPARENT,
  WHITE,
  LIGHT_VARIANT,
  VERY_LIGHT_GREY,
} from '../../utils/styled/constants';

import { getHorizontalThemeGradient } from '../../utils/styled/mixins';

const gradient = getHorizontalThemeGradient({ end: CHAMBRAY, start: ASTRONAUT });

export default () => ({
  gradient,
  globalNavBackgroundColor: EBONY,
  isBrandedHeaderBlack: false,
  exposedNavBackgroundImages: {
    xxs: 'https://st1.uvnimg.com/47/ba/62d9e25e4961803713176c5b39a2/mobile414.jpg',
    sm: 'https://st1.uvnimg.com/88/b6/393155704acbb5edb6b4191ce52a/tablet768.jpg',
    md: 'https://st1.uvnimg.com/db/f9/fffea358440ba906967a24562592/desktop1024.jpg',
    xl: 'https://st1.uvnimg.com/88/e1/e50d52cf4535831ea913e9311ea4/desktop1440.jpg',
  },
  primary: ASTRONAUT,
  secondary: HAITI,
  custom: {
    a: CERULEAN_BLUE,
    'a:hover': LIGHT_BLUE,
  },
  shortTitleBackgroundImages: {
    xxs: 'https://st1.uvnimg.com/47/ba/62d9e25e4961803713176c5b39a2/mobile414.jpg',
    sm: 'https://st1.uvnimg.com/88/b6/393155704acbb5edb6b4191ce52a/tablet768.jpg',
    md: 'https://st1.uvnimg.com/db/f9/fffea358440ba906967a24562592/desktop1024.jpg',
    xl: 'https://st1.uvnimg.com/88/e1/e50d52cf4535831ea913e9311ea4/desktop1440.jpg',
  },
  subNavBackgroundColor: BLUE,
  hideGlobalWidget: false,
  livestreamDefaultColor: VERY_LIGHT_GREY,
  livestreamActiveColor: ASTRONAUT,
  playlistWithGradient: true,
  playlistWithGradientColor: GRADIENT_WHITE_TRANSPARENT,
  layoutColor: WHITE,
  variant: LIGHT_VARIANT,
  mainGradient: true,
});
