import { resizeOptions } from '../renditions';

export const ASPECT_RATIO_PERSONA_CARD = 'persona-card-ratios';

export const PERSONA_CARD_RATIOS = {
  square: {
    name: 'persona-card-square',
    width: 200,
    height: 200,
    resizeOption: resizeOptions.cropImage,
  },
  rectangle: {
    name: 'persona-card-rectangle',
    width: 120,
    height: 120,
    resizeOption: resizeOptions.cropImage,
  },
  landscape: {
    name: 'persona-card-landscape',
    width: 303,
    height: 303,
    resizeOption: resizeOptions.cropImage,
  },
  portrait: {
    name: 'persona-card-portrait',
    width: 238,
    height: 238,
    resizeOption: resizeOptions.cropImage,
  },
};
