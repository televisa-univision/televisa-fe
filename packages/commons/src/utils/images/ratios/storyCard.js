import { resizeOptions } from '../renditions';

export const ASPECT_RATIO_STORY_CARD = 'story-card-ratios';

export const STORY_CARD_RATIOS = {
  square: {
    name: 'preview-card-square',
    width: 376,
    height: 212,
    resizeOption: resizeOptions.cropImage,
  },
  rectangle: {
    name: 'preview-card-rectangle',
    width: 394,
    height: 200,
    resizeOption: resizeOptions.cropImage,
  },
  landscape: {
    name: 'preview-card-landscape',
    width: 730,
    height: 296,
    resizeOption: resizeOptions.cropImage,
  },
  portrait: {
    name: 'preview-card-portrait',
    width: 376,
    height: 212,
    resizeOption: resizeOptions.cropImage,
  },
};
