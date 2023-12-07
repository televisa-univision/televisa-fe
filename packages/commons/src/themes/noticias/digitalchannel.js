import {
  BLACK_RUSSIAN,
  CERULEAN_BLUE,
  DARK_VARIANT,
  EBONY_CLAY,
  EXPRESS_MIDNIGHT,
  GRAYISH_BLUE,
  LIGHT_BLUE,
  MARTINIQUE,
  MOSTLY_BLACK,
  WHITE,
} from '@univision/fe-utilities/styled/constants';
import tagline from '../../assets/images/tagline-noticias-live.svg';
import { GRADIENT_MOSTLY_BLACK_TRANSPARENT } from '../../utils/styled/constants';
import { getHorizontalThemeGradient } from '../../utils/styled/mixins';

const exposedNavGradient = getHorizontalThemeGradient({ start: MOSTLY_BLACK, end: GRAYISH_BLUE });

export default () => ({
  exposedNavGradient,
  globalNavBackgroundColor: getHorizontalThemeGradient({
    start: BLACK_RUSSIAN,
    end: EXPRESS_MIDNIGHT,
  }),
  headlineFont: {
    default: 'uvs-font-b-bold',
  },
  primary: CERULEAN_BLUE,
  secondary: LIGHT_BLUE,
  isBrandedHeaderBlack: false,
  shortTitleGradient: exposedNavGradient,
  useCustomLogos: true,
  svgIcon: {
    name: 'live247',
    viewBox: '0 0 127 20',
  },
  sublogo: tagline,
  shortTitleHeight: '70px',
  shortTitleBackground: 'https://st1.uvnimg.com/45/e7/39a1a3c24f3c9ccaa59786d08d28/24-7-bg.png',
  hideGlobalWidget: true,
  layoutColor: MOSTLY_BLACK,
  livestreamDefaultColor: EBONY_CLAY,
  livestreamActiveColor: WHITE,
  cardsColor: MARTINIQUE,
  playlistWithGradient: true,
  playlistWithGradientColor: GRADIENT_MOSTLY_BLACK_TRANSPARENT,
  variant: DARK_VARIANT,
  mainGradient: exposedNavGradient,
});
