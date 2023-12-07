import { resizeOptions } from '../renditions';

export const ASPECT_LIST_ITEM = 'list-item-ratios';

export const LIST_ITEM_RATIOS = {
  mobile: {
    name: 'list-item-mobile',
    width: 414,
    height: 233,
    resizeOption: resizeOptions.cropImage,
  },
  tablet: {
    name: 'list-item-tablet',
    width: 520,
    height: 324,
    resizeOption: resizeOptions.cropImage,
  },
  desktop: {
    name: 'list-item-desktop',
    width: 800,
    height: 450,
    resizeOption: resizeOptions.cropImage,
  },
};
