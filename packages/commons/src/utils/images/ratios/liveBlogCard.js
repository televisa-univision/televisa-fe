import { resizeOptions } from '../renditions';

export const ASPECT_RATIO_LIVE_BLOG_CARD = 'live-blog-card-ratios';

export const LIVE_BLOG_CARD_RATIOS = {
  square: {
    name: 'live-blog-card-square',
    width: 377,
    height: 250,
    resizeOption: resizeOptions.fillArea,
  },
  rectangle: {
    name: 'live-blog-card-rectangle',
    width: 377,
    height: 190,
    resizeOption: resizeOptions.fillArea,
  },
  landscape: {
    name: 'live-blog-card-landscape',
    width: 730,
    height: 307,
    resizeOption: resizeOptions.fillArea,
  },
  portrait: {
    name: 'live-blog-card-portrait',
    width: 377,
    height: 250,
    resizeOption: resizeOptions.fillArea,
  },
};
