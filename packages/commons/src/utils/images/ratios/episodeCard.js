import { resizeOptions } from '../renditions';

export const ASPECT_RATIO_EPISODE_CARD = 'episode-card-ratios';
export const EPISODE_CARD_RATIOS = {
  square: {
    name: 'episode-card-square',
    width: 376,
    height: 564,
    resizeOption: resizeOptions.cropImage,
  },
  rectangle: {
    name: 'episode-card-rectangle',
    width: 376,
    height: 188,
    resizeOption: resizeOptions.cropImage,
  },
  landscape: {
    name: 'episode-card-landscape',
    width: 730,
    height: 487,
    resizeOption: resizeOptions.cropImage,
  },
  portrait: {
    name: 'episode-card-portrait',
    width: 376,
    height: 564,
    resizeOption: resizeOptions.cropImage,
  },
};

export const EPISODE_CARD_PICTURE_RATIOS = {
  square: {
    name: 'episode-card-square',
    width: 376,
    height: 212,
    resizeOption: resizeOptions.cropImage,
  },
  rectangle: {
    name: 'episode-card-rectangle',
    width: 376,
    height: 188,
    resizeOption: resizeOptions.cropImage,
  },
  landscape: {
    name: 'episode-card-landscape',
    width: 510,
    height: 287,
    resizeOption: resizeOptions.cropImage,
  },
  portrait: {
    name: 'episode-card-portrait',
    width: 376,
    height: 212,
    resizeOption: resizeOptions.cropImage,
  },
};
