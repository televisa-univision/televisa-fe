import { resizeOptions } from '../renditions';

const INDEX_CARD_ASPECT_RATIOS = {
  mobile: {
    name: 'index-card-mobile',
    width: 136,
    height: 77,
    resizeOption: resizeOptions.cropImage,
  },
  tablet: {
    name: 'index-card-tablet',
    width: 220,
    height: 124,
    resizeOption: resizeOptions.cropImage,
  },
  desktop: {
    name: 'index-card-desktop',
    width: 220,
    height: 124,
    resizeOption: resizeOptions.cropImage,
  },
};

export default INDEX_CARD_ASPECT_RATIOS;
