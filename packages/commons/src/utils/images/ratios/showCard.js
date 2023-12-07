import { resizeOptions } from '../renditions';

export const ASPECT_RATIO_SHOW_CARD = 'show-card-ratios';

export const SHOW_CARD_RATIOS = {
  square: {
    name: 'show-card-square',
    width: 376,
    height: 212,
    resizeOption: resizeOptions.cropImage,
  },
  rectangle: {
    name: 'show-card-rectangle',
    width: 376,
    height: 188,
    resizeOption: resizeOptions.cropImage,
  },
  landscape: {
    name: 'show-card-landscape',
    width: 730,
    height: 306,
    resizeOption: resizeOptions.cropImage,
  },
  portrait: {
    name: 'show-card-portrait',
    width: 376,
    height: 376,
    resizeOption: resizeOptions.cropImage,
  },
  half_portrait: {
    name: 'show-card-portrait',
    width: 193,
    height: 193,
    resizeOption: resizeOptions.cropImage,
  },
  large: {
    name: 'show-card-large',
    width: 622,
    height: 622,
    resizeOption: resizeOptions.fillArea,
  },
  medium: {
    name: 'show-card-medium',
    width: 376,
    height: 376,
    resizeOption: resizeOptions.fillArea,
  },
  small: {
    name: 'show-card-small',
    width: 300,
    height: 300,
    resizeOption: resizeOptions.fillArea,
  },
};
