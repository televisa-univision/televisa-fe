import { resizeOptions } from '../renditions';
import {
  LANDSCAPE, PORTRAIT, SQUARE, RECTANGLE,
} from '../../../constants/cardTypes';

export const ASPECT_RATIO_AUDIO_CARD = 'audio-card-ratios';

export const AUDIO_CARD_RATIOS = {
  [SQUARE]: {
    name: 'audio-card-square',
    width: 268,
    height: 268,
    resizeOption: resizeOptions.cropImage,
  },
  [RECTANGLE]: {
    name: 'audio-card-rectangle',
    width: 205,
    height: 205,
    resizeOption: resizeOptions.cropImage,
  },
  [LANDSCAPE]: {
    name: 'audio-card-landscape',
    width: 400,
    height: 400,
    resizeOption: resizeOptions.cropImage,
  },
  [PORTRAIT]: {
    name: 'audio-card-portrait',
    width: 272,
    height: 272,
    resizeOption: resizeOptions.cropImage,
  },
};
