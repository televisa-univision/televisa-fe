import {
  BLACK,
  DEEP_SEA,
  SPRING_WING,
  TUDN_GRADIENT,
  WHITE,
  GREEN_DARKER,
  WOODSMOKE,
} from '@univision/fe-utilities/styled/constants';

import { getHorizontalThemeGradient } from '../../utils/styled/mixins';
import tudnWhiteLogo from '../../assets/images/tudn/tudn_white_logo.svg';

const exposedNavGradient = getHorizontalThemeGradient({
  end: BLACK,
  start: BLACK,
});

/**
 * Default TUDN theme definition
 * @param {Object} options - additional options
 * @returns {Object}
 */
export default function tudnRebrandTheme(options = {}) {
  if (!options.isWorldCupMVP) {
    return {};
  }

  const headlineFont = 'uvs-font-b-bold';

  return {
    brandedHeaderLogoFill: WHITE,
    exposedNavGradient,
    footerLogo: tudnWhiteLogo,
    globalNavBackgroundColor: WOODSMOKE,
    gradient: TUDN_GRADIENT,
    headlineFont: {
      default: headlineFont,
    },
    isBrandedHeaderBlack: true,
    isFooterDark: true,
    primary: WOODSMOKE,
    secondary: DEEP_SEA,
    shortTitleGradient: exposedNavGradient,
    subNavBackgroundColor: WOODSMOKE,
    tagColor: SPRING_WING,
    tertiary: BLACK,
    widgetTitleColor: DEEP_SEA,
    anchor: GREEN_DARKER,
  };
}
