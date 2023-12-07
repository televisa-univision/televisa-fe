import { resizeOptions } from '../renditions';

export const ASPECT_RATIO_OPENING_CARD = '1x1-opening-card';

export const CHANNEL_STRIP_RATIOS = {
  mobile: {
    name: 'channel-strip-mobile',
    width: 186,
    height: 104,
    resizeOption: resizeOptions.fillArea,
  },
  desktop: {
    name: 'channel-strip-desktop',
    width: 186,
    height: 104,
    resizeOption: resizeOptions.fillArea,
  },
};
