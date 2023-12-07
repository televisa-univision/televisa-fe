import {
  ASTRONAUT,
  BLUE,
  CERULEAN_BLUE,
  EBONY,
  HAITI,
  LIGHT_BLUE,
  LOCAL_GRADIENT,
} from '@univision/fe-utilities/styled/constants';

export default () => ({
  card: {
    isDark: {
      horoscopos: true,
      video: true,
      slideshow: true,
    },
  },
  gradient: LOCAL_GRADIENT,
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
});
