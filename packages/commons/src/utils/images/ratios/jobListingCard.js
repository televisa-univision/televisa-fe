import { resizeOptions } from '../renditions';
import {
  LANDSCAPE, PORTRAIT, SQUARE, RECTANGLE,
} from '../../../constants/cardTypes';

export const ASPECT_RATIO_JOB_LISTING_CARD = 'job-listing-card-ratios';

export const JOB_LISTING_CARD_RATIOS = {
  [SQUARE]: {
    name: 'job-listing-card-square',
    width: 128,
    height: 128,
    resizeOption: resizeOptions.cropImage,
  },
  [RECTANGLE]: {
    name: 'job-listing-card-rectangle',
    width: 112,
    height: 112,
    resizeOption: resizeOptions.cropImage,
  },
  [LANDSCAPE]: {
    name: 'job-listing-card-landscape',
    width: 200,
    height: 200,
    resizeOption: resizeOptions.cropImage,
  },
  [PORTRAIT]: {
    name: 'job-listing-card-portrait',
    width: 168,
    height: 168,
    resizeOption: resizeOptions.cropImage,
  },
};
