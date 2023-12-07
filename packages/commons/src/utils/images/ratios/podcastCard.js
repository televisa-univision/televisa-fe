import { resizeOptions } from '../renditions';
import {
  LANDSCAPE, PORTRAIT, SQUARE, RECTANGLE,
} from '../../../constants/cardTypes';
import {
  MEDIUM, SMALL,
} from '../../../constants/cardSizes';

export const ASPECT_RATIO_PODCAST_SERIES_CARD = 'podcast-card-ratios';

export const PODCAST_SERIES_CARD_RATIOS = {
  [SQUARE]: {
    name: 'podcast-card-square',
    width: 250,
    height: 250,
    resizeOption: resizeOptions.cropImage,
  },
  [RECTANGLE]: {
    name: 'podcast-card-rectangle',
    width: 210,
    height: 210,
    resizeOption: resizeOptions.cropImage,
  },
  [LANDSCAPE]: {
    name: 'podcast-card-landscape',
    width: 410,
    height: 410,
    resizeOption: resizeOptions.cropImage,
  },
  [PORTRAIT]: {
    name: 'podcast-card-portrait',
    width: 290,
    height: 290,
    resizeOption: resizeOptions.cropImage,
  },
  [MEDIUM]: {
    name: 'podcast-card-medium',
    width: 210,
    height: 210,
    resizeOption: resizeOptions.cropImage,
  },
  [SMALL]: {
    name: 'podcast-card-small',
    width: 148,
    height: 148,
    resizeOption: resizeOptions.cropImage,
  },
};

export const ASPECT_RATIO_PODCAST_EPISODE_CARD = 'podcast-card-ratios';

export const PODCAST_EPISODE_CARD_RATIOS = {
  [SQUARE]: {
    name: 'podcast-episode-card-square',
    width: 160,
    height: 160,
    resizeOption: resizeOptions.cropImage,
  },
  [RECTANGLE]: {
    name: 'podcast-card-rectangle',
    width: 190,
    height: 190,
    resizeOption: resizeOptions.cropImage,
  },
  [LANDSCAPE]: {
    name: 'podcast-card-landscape',
    width: 400,
    height: 400,
    resizeOption: resizeOptions.cropImage,
  },
  [PORTRAIT]: {
    name: 'podcast-card-portrait',
    width: 166,
    height: 166,
    resizeOption: resizeOptions.cropImage,
  },
  [MEDIUM]: {
    name: 'podcast-card-medium',
    width: 168,
    height: 168,
    resizeOption: resizeOptions.cropImage,
  },
  [SMALL]: {
    name: 'podcast-card-small',
    width: 132,
    height: 132,
    resizeOption: resizeOptions.cropImage,
  },
};
