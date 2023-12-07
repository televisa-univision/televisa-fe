import { resizeOptions } from '../renditions';
import {
  LANDSCAPE, PORTRAIT, SQUARE, RECTANGLE,
} from '../../../constants/cardTypes';

export const ASPECT_RATIO_ASK_EXPERT_CARD = 'ask-expert-card-ratios';

export const ASK_EXPERT_CARD_RATIOS = {
  [SQUARE]: {
    name: 'ask-expert-card-card-square',
    width: 128,
    height: 128,
    resizeOption: resizeOptions.cropImage,
  },
  [RECTANGLE]: {
    name: 'ask-expert-card-rectangle',
    width: 112,
    height: 112,
    resizeOption: resizeOptions.cropImage,
  },
  [LANDSCAPE]: {
    name: 'ask-expert-card-landscape',
    width: 200,
    height: 200,
    resizeOption: resizeOptions.cropImage,
  },
  [PORTRAIT]: {
    name: 'ask-expert-card-portrait',
    width: 168,
    height: 168,
    resizeOption: resizeOptions.cropImage,
  },
};
