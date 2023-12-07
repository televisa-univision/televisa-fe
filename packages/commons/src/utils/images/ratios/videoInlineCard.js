import { resizeOptions } from '../renditions';

export const ASPECT_RATIO_VIDEO_INLINE_CARD = '1x1-video-inline-card';

export const VIDEO_INLINE_CARD_RATIOS = {
  square: {
    name: 'video-inline-card-square',
    width: 355,
    height: 200,
    resizeOption: resizeOptions.fillArea,
  },
  landscape: {
    name: 'video-inline-card-landscape',
    width: 730,
    height: 410,
    resizeOption: resizeOptions.fillArea,
  },
  portrait: {
    name: 'video-inline-card-portrait',
    width: 355,
    height: 200,
    resizeOption: resizeOptions.fillArea,
  },
  large: {
    name: 'video-inline-card-large',
    width: 622,
    height: 349,
    resizeOption: resizeOptions.fillArea,
  },
  medium: {
    name: 'video-inline-card-medium',
    width: 376,
    height: 211,
    resizeOption: resizeOptions.fillArea,
  },
  small: {
    name: 'video-inline-card-small',
    width: 300,
    height: 168,
    resizeOption: resizeOptions.fillArea,
  },
};
