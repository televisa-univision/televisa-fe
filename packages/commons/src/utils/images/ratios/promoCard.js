import { resizeOptions } from '../renditions';

export const ASPECT_RATIO_PROMO_CARD = 'promo-card-ratios';

export const PROMO_CARD_RATIOS = {
  square: {
    name: 'preview-card-square',
    width: 410,
    height: 410,
    resizeOption: resizeOptions.fillArea,
  },
  rectangle: {
    name: 'preview-card-rectangle',
    width: 710,
    height: 355,
    resizeOption: resizeOptions.fillArea,
  },
  landscape: {
    name: 'preview-card-landscape',
    width: 730,
    height: 487,
    resizeOption: resizeOptions.fillArea,
  },
  portrait: {
    name: 'preview-card-portrait',
    width: 410,
    height: 512,
    resizeOption: resizeOptions.fillArea,
  },
  weather: {
    name: 'preview-card-weather',
    width: 376,
    height: 203,
    resizeOption: resizeOptions.fillArea,
  },
  large: {
    name: 'preview-card-large',
    width: 622,
    height: 622,
    resizeOption: resizeOptions.fillArea,
  },
  medium: {
    name: 'preview-card-medium',
    width: 376,
    height: 376,
    resizeOption: resizeOptions.fillArea,
  },
  small: {
    name: 'preview-card-small',
    width: 300,
    height: 300,
    resizeOption: resizeOptions.fillArea,
  },
};
