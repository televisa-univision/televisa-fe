import { resizeOptions } from '../renditions';

export const ASPECT_RATIO_OPENING_CARD = '1x1-opening-card';

export const OPENING_CARD_RATIOS = {
  mobile: {
    name: 'opening-card-mobile',
    width: 355,
    height: 200,
    resizeOption: resizeOptions.fillArea,
  },
  desktop: {
    name: 'opening-card-desktop',
    width: 730,
    height: 410,
    resizeOption: resizeOptions.fillArea,
  },
};
