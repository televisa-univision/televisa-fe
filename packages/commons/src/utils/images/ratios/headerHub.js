import { resizeOptions } from '../renditions';

export const ASPECT_RATIO_OPENING_CARD = '1x1-opening-card';

export const HEADER_HUB_RATIOS = {
  mobile: {
    name: 'header-hub-mobile',
    width: 303,
    height: 303,
    resizeOption: resizeOptions.fillArea,
  },
  desktop: {
    name: 'header-hub-desktop',
    width: 333,
    height: 333,
    resizeOption: resizeOptions.fillArea,
  },
};
