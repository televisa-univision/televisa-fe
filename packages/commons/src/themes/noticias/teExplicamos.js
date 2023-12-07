import {
  MINE_SHAFT,
  WHITE,
  BLACK,
  CERULEAN_BLUE,
  DODGER_BLUE,
  LIGHT_BLUE,
} from '../../utils/styled/constants';
import { getHorizontalThemeGradient } from '../../utils/styled/mixins';

const gradient = getHorizontalThemeGradient({ end: DODGER_BLUE, start: CERULEAN_BLUE });

export default () => ({
  isBrandedHeaderBlack: false,
  globalNavBackgroundColor: MINE_SHAFT,
  gradient,
  subNavBackgroundColor: WHITE,
  exposedNavLinksColor: BLACK,
  exposedNavLinksColorHover: BLACK,
  primary: CERULEAN_BLUE,
  secondary: LIGHT_BLUE,
});
