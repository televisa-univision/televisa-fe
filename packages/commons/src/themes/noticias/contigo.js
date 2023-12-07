import {
  BLACK,
  CERULEAN_BLUE,
  DODGER_BLUE,
  GREY_BLACK,
  LIGHT_BLUE,
  MINE_SHAFT,
  WHITE,
} from '../../utils/styled/constants';
import { getHorizontalThemeGradient } from '../../utils/styled/mixins';

const gradient = getHorizontalThemeGradient({ end: DODGER_BLUE, start: CERULEAN_BLUE });

export default () => ({
  exposedNavLinksColor: BLACK,
  exposedNavLinksColorHover: GREY_BLACK,
  isBrandedHeaderBlack: false,
  gradient,
  globalNavBackgroundColor: MINE_SHAFT,
  headlineFont: {
    default: 'uvs-font-b-bold',
  },
  primary: CERULEAN_BLUE,
  secondary: LIGHT_BLUE,
  subNavBackgroundColor: WHITE,
});
