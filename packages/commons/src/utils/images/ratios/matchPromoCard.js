import { resizeOptions } from '../renditions';

export const ASPECT_RATIO_PROMO_MATCH_CARD = 'promo-match-card-ratios';

export const PROMO_MATCH_CARD_RATIOS = {
  square: {
    name: 'preview-card-square',
    width: 377,
    height: 211,
    resizeOption: resizeOptions.fillArea,
  },
  rectangle: {
    name: 'preview-card-rectangle',
    width: 377,
    height: 190,
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
    width: 377,
    height: 211,
    resizeOption: resizeOptions.fillArea,
  },
};
