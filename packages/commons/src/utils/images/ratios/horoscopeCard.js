import { resizeOptions } from '../renditions';

export const ASPECT_RATIO_HOROSCOPE_CARD = 'horoscope-card-ratios';
export const ASPECT_RATIO_HOROSCOPE_AVATAR_CARD = 'horoscope-card-avatar-ratios';

export const HOROSCOPE_CARD_RATIOS = {
  square: {
    name: 'horoscope-card-square',
    width: 376,
    height: 376,
    resizeOption: resizeOptions.cropImage,
  },
  rectangle: {
    name: 'horoscope-card-rectangle',
    width: 376,
    height: 188,
    resizeOption: resizeOptions.cropImage,
  },
  landscape: {
    name: 'horoscope-card-landscape',
    width: 730,
    height: 487,
    resizeOption: resizeOptions.cropImage,
  },
  portrait: {
    name: 'horoscope-card-portrait',
    width: 376,
    height: 470,
    resizeOption: resizeOptions.cropImage,
  },
  small: {
    name: 'horoscope-card-small',
    width: 300,
    height: 300,
    resizeOption: resizeOptions.fillArea,
  },
  medium: {
    name: 'horoscope-card-medium',
    width: 376,
    height: 376,
    resizeOption: resizeOptions.fillArea,
  },
  large: {
    name: 'horoscope-card-large',
    width: 622,
    height: 622,
    resizeOption: resizeOptions.fillArea,
  },
};

export const HOROSCOPE_CARD_AVATAR_RATIOS = {
  square: {
    name: 'horoscope-card-avatar-square',
    width: 90,
    height: 90,
    resizeOption: resizeOptions.cropImage,
  },
  landscape: {
    name: 'horoscope-card-avatar-landscape',
    width: 119,
    height: 119,
    resizeOption: resizeOptions.cropImage,
  },
  portrait: {
    name: 'horoscope-card-avatar-portrait',
    width: 90,
    height: 90,
    resizeOption: resizeOptions.cropImage,
  },
  small: {
    name: 'horoscope-card-avatar-small',
    width: 92,
    height: 92,
    resizeOption: resizeOptions.cropImage,
  },
  medium: {
    name: 'horoscope-card-avatar-medium',
    width: 110,
    height: 110,
    resizeOption: resizeOptions.cropImage,
  },
  large: {
    name: 'horoscope-card-avatar-large',
    width: 151,
    height: 151,
    resizeOption: resizeOptions.cropImage,
  },
};
