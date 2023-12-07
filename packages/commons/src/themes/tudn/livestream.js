import {
  WHITE,
  LIGHT_VARIANT,
  TROPICAL_RAIN_FOREST,
  TRANSPARENT,
  VERY_LIGHT_GREY,
} from '@univision/fe-utilities/styled/constants';
import linearGradient from '@univision/fe-utilities/styled/mixins/linearGradient';
import contentTypes from '../../constants/contentTypes.json';

import tudnTheme from '.';

const GRADIENT_WHITE_TRANSPARENT = linearGradient({ direction: '180deg', start: TRANSPARENT, end: WHITE });

export default (data = {}, options = {}) => ({
  ...tudnTheme(data, options),
  shortTitleAlignCenter: data?.type === contentTypes.SOCCER_MATCH,
  hideGlobalWidget: true,
  livestreamDefaultColor: VERY_LIGHT_GREY,
  livestreamActiveColor: TROPICAL_RAIN_FOREST,
  playlistWithGradient: true,
  playlistWithGradientColor: GRADIENT_WHITE_TRANSPARENT,
  layoutColor: WHITE,
  variant: LIGHT_VARIANT,
  mainGradient: true,
});
