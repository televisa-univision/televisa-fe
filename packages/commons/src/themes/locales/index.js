import {
  ASTRONAUT,
  BLUE,
  CERULEAN_BLUE,
  EBONY,
  HAITI,
  LIGHT_BLUE,
  LOCAL_GRADIENT,
} from '@univision/fe-utilities/styled/constants';
import { isPartOfDestino2024 } from '../../utils/header/data/locales/localesNavHelpers';

/**
 * Get the exposed nav background images for the header
 * @param {*} data - Current data
 * @returns {Object}
 */
const getExposedNavBackgroundImages = (data) => {
  if (isPartOfDestino2024(data.uri)) {
    return {
      xxs: 'https://st1.uvnimg.com/d5/ac/ba0cd332476083d2bac9d6c8399b/background-expose-eleciones-national-mobile.png',
      sm: 'https://st1.uvnimg.com/99/aa/9c9219064e6283684b9cd839ee54/background-expose-eleciones-national-tablet-768.png',
      md: 'https://st1.uvnimg.com/d9/af/f4e030c443e69c1539b1bd3942f7/exposed-elections-national-md.png',
      xl: 'https://st1.uvnimg.com/c8/97/c4f47b28479eb62b59ac0d1e219a/background-expose-eleciones-national-desktop.png',
    };
  }
  return {
    xxs: 'https://st1.uvnimg.com/47/ba/62d9e25e4961803713176c5b39a2/mobile414.jpg',
    sm: 'https://st1.uvnimg.com/88/b6/393155704acbb5edb6b4191ce52a/tablet768.jpg',
    md: 'https://st1.uvnimg.com/db/f9/fffea358440ba906967a24562592/desktop1024.jpg',
    xl: 'https://st1.uvnimg.com/88/e1/e50d52cf4535831ea913e9311ea4/desktop1440.jpg',
  };
};

export default (data = {}, options = {}) => ({
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
  exposedNavBackgroundImages: getExposedNavBackgroundImages(data),
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
