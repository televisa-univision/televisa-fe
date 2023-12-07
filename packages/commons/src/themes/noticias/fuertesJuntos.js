import {
  DODGER_BLUE,
  MINE_SHAFT,
  WHITE,
  CERULEAN_BLUE,
  LIGHT_BLUE,
} from '../../utils/styled/constants';
import { getHorizontalThemeGradient } from '../../utils/styled/mixins';

const gradient = getHorizontalThemeGradient({ end: DODGER_BLUE, start: CERULEAN_BLUE });

export default () => ({
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
