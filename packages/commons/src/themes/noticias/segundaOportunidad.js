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
  gradient,
  headlineFont: {
    default: 'uvs-font-b-bold',
  },
  isBrandedHeaderBlack: false,
  globalNavBackgroundColor: MINE_SHAFT,
  primary: CERULEAN_BLUE,
  secondary: LIGHT_BLUE,
  subNavBackgroundColor: WHITE,
});
