import { resizeOptions } from '../renditions';

export const ASPECT_RATIO_SINGLE_WIDGET = 'single-widget-ratios';

export const SINGLE_WIDGET_RATIOS = {
  mobile: {
    name: 'single-widget-mobile',
    width: 600,
    height: 450,
    resizeOption: resizeOptions.cropImage,
  },
  desktop: {
    name: 'single-widget-desktop',
    width: 800,
    height: 450,
    resizeOption: resizeOptions.cropImage,
  },
};
