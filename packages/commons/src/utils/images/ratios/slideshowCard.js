import { resizeOptions } from '../renditions';

export const ASPECT_RATIO_SLIDESHOW_CARD = 'slideshow-card-ratios';

export const SLIDESHOW_CARD_RATIOS = {
  landscape: {
    main: {
      name: 'slideshow-card-landscape-main',
      width: 487,
      height: 322,
      resizeOption: resizeOptions.cropImage,
    },
    secondary: {
      name: 'slideshow-card-landscape-secondary',
      width: 241,
      height: 158,
      resizeOption: resizeOptions.cropImage,
    },
  },
  portrait: {
    main: {
      name: 'slideshow-card-portrait-main',
      width: 376,
      height: 212,
      resizeOption: resizeOptions.cropImage,
    },
    secondary: {
      name: 'slideshow-card-portrait-secondary',
      width: 187,
      height: 125,
      resizeOption: resizeOptions.cropImage,
    },
  },
  rectangle: {
    main: {
      name: 'slideshow-card-rectangle-main',
      width: 376,
      height: 212,
      resizeOption: resizeOptions.cropImage,
    },
  },
  square: {
    main: {
      name: 'slideshow-card-square-main',
      width: 188,
      height: 282,
      resizeOption: resizeOptions.cropImage,
    },
    secondary: {
      name: 'slideshow-card-square-secondary',
      width: 186,
      height: 140,
      resizeOption: resizeOptions.cropImage,
    },
  },
  medium: {
    main: {
      name: 'slideshow-card-square-main',
      width: 188,
      height: 250,
      resizeOption: resizeOptions.cropImage,
    },
    secondary: {
      name: 'slideshow-card-square-secondary',
      width: 186,
      height: 124,
      resizeOption: resizeOptions.cropImage,
    },
  },
  large: {
    main: {
      name: 'slideshow-card-square-main',
      width: 311,
      height: 413,
      resizeOption: resizeOptions.cropImage,
    },
    secondary: {
      name: 'slideshow-card-square-secondary',
      width: 307,
      height: 205,
      resizeOption: resizeOptions.cropImage,
    },
  },
  small: {
    main: {
      name: 'slideshow-card-square-main',
      width: 188,
      height: 250,
      resizeOption: resizeOptions.cropImage,
    },
    secondary: {
      name: 'slideshow-card-square-secondary',
      width: 186,
      height: 124,
      resizeOption: resizeOptions.cropImage,
    },
  },
  horizontal: {
    main: {
      name: 'slideshow-card-horizontal-main',
      width: 92,
      height: 125,
      resizeOption: resizeOptions.cropImage,
    },
  },
  vertical: {
    main: {
      name: 'slideshow-card-vertical-main',
      width: 79,
      height: 120,
      resizeOption: resizeOptions.cropImage,
    },
  },
};
