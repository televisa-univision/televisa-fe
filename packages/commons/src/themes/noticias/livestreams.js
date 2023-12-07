import {
  CERULEAN_BLUE,
  LIGHT_BLUE,
  WHITE,
  CHATHAMS_BLUE,
  LIGHT_VARIANT,
  ROYAL_BLUE,
  GRADIENT_WHITE_TRANSPARENT,
  VERY_LIGHT_GREY,
} from '../../utils/styled/constants';

import { getHorizontalThemeGradient } from '../../utils/styled/mixins';

const exposedNavGradient = getHorizontalThemeGradient({ end: LIGHT_BLUE, start: CERULEAN_BLUE });

export default () => ({
  exposedNavGradient,
  globalNavBackgroundColor: CHATHAMS_BLUE,
  headlineFont: {
    default: 'uvs-font-b-bold',
  },
  isBrandedHeaderBlack: false,
  primary: CERULEAN_BLUE,
  secondary: LIGHT_BLUE,
  shortTitleGradient: exposedNavGradient,
  hideGlobalWidget: true,
  livestreamDefaultColor: VERY_LIGHT_GREY,
  livestreamActiveColor: ROYAL_BLUE,
  playlistWithGradient: true,
  playlistWithGradientColor: GRADIENT_WHITE_TRANSPARENT,
  layoutColor: WHITE,
  variant: LIGHT_VARIANT,
  mainGradient: true,
});
