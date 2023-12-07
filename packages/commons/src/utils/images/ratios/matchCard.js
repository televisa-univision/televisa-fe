import { resizeOptions } from '../renditions';

export const ASPECT_RATIO_MATCH_CARD = 'match-card-ratios';

export const MATCH_CARD_RATIOS = {
  square: {
    name: 'preview-card-square',
    width: 376,
    height: 212,
    resizeOption: resizeOptions.cropImage,
  },
  rectangle: {
    name: 'preview-card-rectangle',
    width: 204,
    height: 205,
    resizeOption: resizeOptions.cropImage,
  },
  landscape: {
    name: 'preview-card-landscape',
    width: 730,
    height: 410,
    resizeOption: resizeOptions.cropImage,
  },
  portrait: {
    name: 'preview-card-portrait',
    width: 376,
    height: 212,
    resizeOption: resizeOptions.cropImage,
  },
  small: {
    name: 'preview-card-small',
    width: 300,
    height: 300,
    resizeOption: resizeOptions.fillArea,
  },
  medium: {
    name: 'preview-card-medium',
    width: 376,
    height: 376,
    resizeOption: resizeOptions.fillArea,
  },
  large: {
    name: 'preview-card-large',
    width: 622,
    height: 622,
    resizeOption: resizeOptions.fillArea,
  },
};
