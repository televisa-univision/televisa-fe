import { resizeOptions } from '../renditions';

export const ASPECT_RATIO_VIDEO_PREVIEW_CARD = '1x1-preview-card';

export const VIDEO_PREVIEW_CARD_RATIOS = {
  square: {
    name: 'preview-card-square',
    width: 376,
    height: 376,
    resizeOption: resizeOptions.fillArea,
  },
  rectangle: {
    name: 'preview-card-rectangle',
    width: 355,
    height: 188,
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
    width: 376,
    height: 376,
    resizeOption: resizeOptions.fillArea,
  },
  large: {
    name: 'preview-card-portrait',
    width: 622,
    height: 622,
    resizeOption: resizeOptions.fillArea,
  },
  medium: {
    name: 'preview-card-portrait',
    width: 376,
    height: 376,
    resizeOption: resizeOptions.fillArea,
  },
  small: {
    name: 'preview-card-portrait',
    width: 300,
    height: 300,
    resizeOption: resizeOptions.fillArea,
  },
  horizontal: {
    name: 'preview-card-horizontal',
    width: 186,
    height: 125,
    resizeOption: resizeOptions.fillArea,
  },
  vertical: {
    name: 'preview-card-vertical',
    width: 160,
    height: 120,
    resizeOption: resizeOptions.fillArea,
  },

};
