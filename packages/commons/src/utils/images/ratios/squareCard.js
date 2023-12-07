import { resizeOptions } from '../renditions';

export const ASPECT_RATIO_SQUARE_CARD = 'square-card-ratios';

export const SQUARE_CARD_RATIOS = {
  large: {
    name: 'preview-card-square',
    width: 622,
    height: 349,
    resizeOption: resizeOptions.cropImage,
  },
  medium: {
    name: 'preview-card-rectangle',
    width: 376,
    height: 211,
    resizeOption: resizeOptions.cropImage,
  },
  small: {
    name: 'preview-card-landscape',
    width: 300,
    height: 168,
    resizeOption: resizeOptions.cropImage,
  },
  horizontal: {
    name: 'list-card-horizontal',
    width: 186,
    height: 125,
    resizeOption: resizeOptions.cropImage,
  },
  vertical: {
    name: 'list-card-vertical',
    width: 160,
    height: 120,
    resizeOption: resizeOptions.cropImage,
  },
};
