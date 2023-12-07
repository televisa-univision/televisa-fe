import { resizeOptions } from '../renditions';

export const ASPECT_RATIO_RECIPE_CARD = 'recipe-card-ratios';

export const RECIPE_CARD_RATIOS = {
  square: {
    name: 'recipe-card-square',
    width: 376,
    height: 211,
    resizeOption: resizeOptions.cropImage,
  },
  rectangle: {
    name: 'recipe-card-rectangle',
    width: 188,
    height: 188,
    resizeOption: resizeOptions.cropImage,
  },
  landscape: {
    name: 'recipe-card-landscape',
    width: 730,
    height: 487,
    resizeOption: resizeOptions.cropImage,
  },
  portrait: {
    name: 'recipe-card-portrait',
    width: 376,
    height: 470,
    resizeOption: resizeOptions.cropImage,
  },
};
