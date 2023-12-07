import {
  resizeOptions,
} from '@univision/fe-commons/dist/utils/images/renditions';
import {
  ASPECT_RATIO_PROMO_MATCH_CARD,
  PROMO_MATCH_CARD_RATIOS,
} from '@univision/fe-commons/dist/utils/images/ratios/matchPromoCard';
import {
  ASPECT_RATIO_PROMO_CARD,
  PROMO_CARD_RATIOS,
} from '@univision/fe-commons/dist/utils/images/ratios/promoCard';
import {
  ASPECT_RATIO_STORY_CARD,
  STORY_CARD_RATIOS,
} from '@univision/fe-commons/dist/utils/images/ratios/storyCard';
import {
  ASPECT_RATIO_VIDEO_PREVIEW_CARD,
  VIDEO_PREVIEW_CARD_RATIOS,
} from '@univision/fe-commons/dist/utils/images/ratios/videoPreviewCard';
import {
  ASPECT_RATIO_SHOW_CARD,
  SHOW_CARD_RATIOS,
} from '@univision/fe-commons/dist/utils/images/ratios/showCard';
import {
  ASPECT_RATIO_AUDIO_CARD,
  AUDIO_CARD_RATIOS,
} from '@univision/fe-commons/dist/utils/images/ratios/audioCard';
import {
  ASPECT_RATIO_PODCAST_SERIES_CARD,
  ASPECT_RATIO_PODCAST_EPISODE_CARD,
  PODCAST_EPISODE_CARD_RATIOS,
  PODCAST_SERIES_CARD_RATIOS,
} from '@univision/fe-commons/dist/utils/images/ratios/podcastCard';
import {
  ASPECT_RATIO_PERSONA_CARD,
  PERSONA_CARD_RATIOS,
} from '@univision/fe-commons/dist/utils/images/ratios/personaCard';
import {
  ASPECT_RATIO_VIDEO_INLINE_CARD,
  VIDEO_INLINE_CARD_RATIOS,
} from '@univision/fe-commons/dist/utils/images/ratios/videoInlineCard';
import {
  ASPECT_RATIO_LIVE_BLOG_CARD,
  LIVE_BLOG_CARD_RATIOS,
} from '@univision/fe-commons/dist/utils/images/ratios/liveBlogCard';
import {
  ASPECT_RATIO_SLIDESHOW_CARD,
  SLIDESHOW_CARD_RATIOS,
} from '@univision/fe-commons/dist/utils/images/ratios/slideshowCard';
import {
  ASPECT_RATIO_MATCH_CARD,
  MATCH_CARD_RATIOS,
} from '@univision/fe-commons/dist/utils/images/ratios/matchCard';
import {
  ASPECT_RATIO_RECIPE_CARD,
  RECIPE_CARD_RATIOS,
} from '@univision/fe-commons/dist/utils/images/ratios/recipeCard';
import {
  ASPECT_RATIO_EPISODE_CARD,
  EPISODE_CARD_RATIOS,
} from '@univision/fe-commons/dist/utils/images/ratios/episodeCard';
import {
  ASPECT_RATIO_SQUARE_CARD,
  SQUARE_CARD_RATIOS,
} from '@univision/fe-commons/dist/utils/images/ratios/squareCard';
import {
  ASPECT_RATIO_HOROSCOPE_CARD,
  ASPECT_RATIO_HOROSCOPE_AVATAR_CARD,
  HOROSCOPE_CARD_RATIOS,
  HOROSCOPE_CARD_AVATAR_RATIOS,
} from '@univision/fe-commons/dist/utils/images/ratios/horoscopeCard';
import {
  ASPECT_RATIO_JOB_LISTING_CARD,
  JOB_LISTING_CARD_RATIOS,
} from '@univision/fe-commons/dist/utils/images/ratios/jobListingCard';
import {
  ASPECT_RATIO_ASK_EXPERT_CARD,
  ASK_EXPERT_CARD_RATIOS,
} from '@univision/fe-commons/dist/utils/images/ratios/askExpertCard';
import {
  ASPECT_RATIO_SINGLE_WIDGET,
  SINGLE_WIDGET_RATIOS,
} from '@univision/fe-commons/dist/utils/images/ratios/singleWidget';

import * as sizes from './imageSizes';

/**
 * Mapping between size prefix and device
 * @type {Object}
 */
export const deviceToSizeMapping = {
  desktop: [sizes.LARGE, sizes.X_LARGE],
  tablet: [sizes.SMALL, sizes.MEDIUM],
  mobile: [sizes.X_SMALL],
};

/**
 * 16x9 Aspect Ratio Key
 * @type {string}
 */
export const ASPECT_RATIO_16X9 = '16x9';

/**
 * 4x3 Aspect Ratio Key
 * @type {string}
 */
export const ASPECT_RATIO_4X3 = '4x3';

/**
 * 3x4 Aspect Ratio Key
 * @type {string}
 */
export const ASPECT_RATIO_3X4 = '3x4';

/**
 * 3x1 Aspect Ratio Key
 * @type {string}
 */
export const ASPECT_RATIO_3X1 = '3x1';

/**
 * 1x1 Aspect Ratio Key
 * @type {string}
 */
export const ASPECT_RATIO_1X1 = '1x1';

/**
 * Original Aspect Ratio Key
 * @type {string}
 */
export const ASPECT_RATIO_ORIGINAL = 'original';

/**
 * Aspect ratio for vertical slides
 * @type {string}
 */
export const ASPECT_RATIO_VERTICAL_SLIDESHOW = 'vertical-slideshow';

/**
 * Aspect ratio for horizontal slideshow
 * @type {string}
 */
export const ASPECT_RATIO_HORIZONTAL_SLIDESHOW = 'horizontal-slideshow';

/**
 * Aspect ratio for panoramic lead
 * @type {string}
 */
export const ASPECT_RATIO_PANORAMIC = 'panoramic';

/**
 * Mapping of aspect of size to api image for all supported aspect ratios
 * @type {Object}
 */
const aspectRatiosSizes = {
  [ASPECT_RATIO_LIVE_BLOG_CARD]: LIVE_BLOG_CARD_RATIOS,
  [ASPECT_RATIO_PROMO_CARD]: PROMO_CARD_RATIOS,
  [ASPECT_RATIO_VIDEO_PREVIEW_CARD]: VIDEO_PREVIEW_CARD_RATIOS,
  [ASPECT_RATIO_STORY_CARD]: STORY_CARD_RATIOS,
  [ASPECT_RATIO_SHOW_CARD]: SHOW_CARD_RATIOS,
  [ASPECT_RATIO_AUDIO_CARD]: AUDIO_CARD_RATIOS,
  [ASPECT_RATIO_PODCAST_SERIES_CARD]: PODCAST_SERIES_CARD_RATIOS,
  [ASPECT_RATIO_PODCAST_EPISODE_CARD]: PODCAST_EPISODE_CARD_RATIOS,
  [ASPECT_RATIO_PERSONA_CARD]: PERSONA_CARD_RATIOS,
  [ASPECT_RATIO_VIDEO_INLINE_CARD]: VIDEO_INLINE_CARD_RATIOS,
  [ASPECT_RATIO_PROMO_MATCH_CARD]: PROMO_MATCH_CARD_RATIOS,
  [ASPECT_RATIO_SLIDESHOW_CARD]: SLIDESHOW_CARD_RATIOS,
  [ASPECT_RATIO_MATCH_CARD]: MATCH_CARD_RATIOS,
  [ASPECT_RATIO_HOROSCOPE_CARD]: HOROSCOPE_CARD_RATIOS,
  [ASPECT_RATIO_HOROSCOPE_AVATAR_CARD]: HOROSCOPE_CARD_AVATAR_RATIOS,
  [ASPECT_RATIO_RECIPE_CARD]: RECIPE_CARD_RATIOS,
  [ASPECT_RATIO_EPISODE_CARD]: EPISODE_CARD_RATIOS,
  [ASPECT_RATIO_JOB_LISTING_CARD]: JOB_LISTING_CARD_RATIOS,
  [ASPECT_RATIO_ASK_EXPERT_CARD]: ASK_EXPERT_CARD_RATIOS,
  [ASPECT_RATIO_SQUARE_CARD]: SQUARE_CARD_RATIOS,
  [ASPECT_RATIO_SINGLE_WIDGET]: SINGLE_WIDGET_RATIOS,
  [ASPECT_RATIO_SQUARE_CARD]: SQUARE_CARD_RATIOS,
  '16x9': {
    xxxsm: {
      name: '16x9-sm',
      width: 199,
      height: 115,
    },
    xxsm: {
      name: '16x9-sm',
      width: 246,
      height: 138,
    },
    xsm: {
      name: '16x9-med',
      width: 400,
      height: 225,
    },
    sm: {
      name: '16x9-mobile',
      width: 480,
      height: 270,
    },
    md: {
      name: '16x9-tablet',
      width: 1024,
      height: 576,
      resizeOption: resizeOptions.shrinkLarger,
    },
    lg: {
      name: '16x9',
      width: 1240,
      height: 698,
    },
    xl: {
      name: '16x9-extended',
      width: 1440,
      height: 810,
    },
    loading: {
      name: '16x9-loading',
      width: 30,
      height: 17,
    },
  },
  '4x3': {
    xxxsm: {
      name: '16x9-sm',
      width: 199,
      height: 149,
    },
    xxsm: {
      name: '4x3-sm',
      width: 246,
      height: 185,
    },
    xsm: {
      name: '4x3-med',
      width: 400,
      height: 300,
    },
    sm: {
      name: '4x3-mobile',
      width: 480,
      height: 360,
    },
    md: {
      name: '4x3-tablet',
      width: 1024,
      height: 768,
    },
    lg: {
      name: '4x3',
      width: 1240,
      height: 930,
    },
    xl: {
      name: '4x3-extended',
      width: 1440,
      height: 1080,
    },
  },
  '3x4': {
    xxxsm: {
      name: '16x9-sm',
      width: 199,
      height: 265,
    },
    xxsm: {
      name: '3x4-sm',
      width: 246,
      height: 328,
    },
    xsm: {
      name: '3x4-med',
      width: 400,
      height: 434,
    },
    sm: {
      name: '3x4-mobile',
      width: 480,
      height: 640,
      resizeOption: resizeOptions.shrinkLarger,
    },
    md: {
      name: '3x4-tablet',
      width: 768,
      height: 1024,
    },
    lg: {
      name: '3x4',
      width: 1024,
      height: 1365,
    },
    xl: {
      name: '3x4-extended',
      width: 1440,
      height: 1920,
    },
  },
  '3x1': {
    xxxsm: {
      name: '16x9-sm',
      width: 199,
      height: 265,
    },
    xxsm: {
      name: '3x1-sm',
      width: 246,
      height: 82,
    },
    xsm: {
      name: '3x1-med',
      width: 400,
      height: 133,
    },
    sm: {
      name: '3x1-mobile',
      width: 480,
      height: 160,
    },
    md: {
      name: '3x1-tablet',
      width: 768,
      height: 256,
    },
    lg: {
      name: '3x1',
      width: 1024,
      height: 341,
    },
    xl: {
      name: '3x1-extended',
      width: 1440,
      height: 480,
    },
    loading: {
      name: '16x9-loading',
      width: 30,
      height: 10,
    },
  },
  original: {
    xxxsm: {
      name: 'original',
      width: 0,
      height: 0,
    },
    xxsm: {
      name: 'original',
      width: 0,
      height: 0,
    },
    xsm: {
      name: 'original',
      width: 0,
      height: 0,
    },
    sm: {
      name: 'original',
      width: 0,
      height: 0,
    },
    md: {
      name: 'original',
      width: 0,
      height: 0,
    },
    lg: {
      name: 'original',
      width: 0,
      height: 0,
    },
    xl: {
      name: 'original',
      width: 0,
      height: 0,
    },
  },
  'vertical-slideshow': {
    xxsm: {
      name: 'slideshow-4x3-vertical-mobile',
      width: 420,
      height: 620,
      resizeOption: resizeOptions.shrinkLarger,
    },
    xsm: {
      name: 'slideshow-4x3-vertical-mobile',
      width: 420,
      height: 620,
      resizeOption: resizeOptions.shrinkLarger,
    },
    sm: {
      name: 'slideshow-4x3-vertical-mobile',
      width: 420,
      height: 620,
      resizeOption: resizeOptions.shrinkLarger,
    },
    md: {
      name: 'slideshow-4x3-vertical',
      width: 1093,
      height: 820,
      resizeOption: resizeOptions.shrinkLarger,
    },
    lg: {
      name: 'slideshow-4x3-vertical',
      width: 1093,
      height: 820,
      resizeOption: resizeOptions.shrinkLarger,
    },
    xl: {
      name: 'slideshow-4x3-vertical',
      width: 1093,
      height: 820,
      resizeOption: resizeOptions.shrinkLarger,
    },
  },
  'horizontal-slideshow': {
    xxsm: {
      name: 'slideshow-mobile-horizontal',
      width: 414,
      height: 550,
      resizeOption: resizeOptions.shrinkLarger,
    },
    xsm: {
      name: 'slideshow-mobile-horizontal',
      width: 414,
      height: 550,
      resizeOption: resizeOptions.shrinkLarger,
    },
    sm: {
      name: 'slideshow-mobile-horizontal',
      width: 414,
      height: 550,
      resizeOption: resizeOptions.shrinkLarger,
    },
    md: {
      name: 'slideshow-horizontal',
      width: 935,
      height: 645,
      resizeOption: resizeOptions.shrinkLarger,
    },
    lg: {
      name: 'slideshow-horizontal',
      width: 935,
      height: 645,
      resizeOption: resizeOptions.shrinkLarger,
    },
    xl: {
      name: 'slideshow-horizontal',
      width: 935,
      height: 645,
      resizeOption: resizeOptions.shrinkLarger,
    },
  },
  '1x1': {
    xxsm: {
      name: '1x1-xxs-mobile',
      width: 80,
      height: 80,
    },
    xsm: {
      name: '1x1-xs-mobile',
      width: 140,
      height: 140,
    },
    sm: {
      name: '1x1-person-profile',
      width: 182,
      height: 182,
    },
    md: {
      name: '1x1-xs',
      width: 260,
      height: 260,
    },
    lg: {
      name: '1x1-mobile',
      width: 480,
      height: 480,
    },
    xl: {
      name: '1x1',
      width: 1024,
      height: 1024,
    },
  },
  panoramic: {
    xxsm: {
      name: 'article-lead-sm',
      width: 414,
      height: 233,
      resizeOption: resizeOptions.shrinkLarger,
    },
    xsm: {
      name: 'article-lead-sm',
      width: 414,
      height: 233,
      resizeOption: resizeOptions.shrinkLarger,
    },
    sm: {
      name: 'article-lead-sm',
      width: 414,
      height: 233,
      resizeOption: resizeOptions.shrinkLarger,
    },
    md: {
      name: 'article-lead-md',
      width: 1024,
      height: 384,
      resizeOption: resizeOptions.shrinkLarger,
    },
    lg: {
      name: 'article-lead-xl',
      width: 1440,
      height: 590,
      resizeOption: resizeOptions.shrinkLarger,
    },
    xl: {
      name: 'article-lead-xl',
      width: 1440,
      height: 590,
      resizeOption: resizeOptions.shrinkLarger,
    },
  },
};

export default aspectRatiosSizes;
