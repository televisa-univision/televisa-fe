import {
  MINE_SHAFT,
  THEME_DEFAULT_SECONDARY,
  TORCH_RED,
  VELVET_RED,
} from '../../utils/styled/constants';
import { getHorizontalThemeGradient } from '../../utils/styled/mixins';

const gradient = getHorizontalThemeGradient({ end: TORCH_RED, start: VELVET_RED });

export default () => ({
  card: {
    isDark: {
      horoscopos: true,
      video: true,
    },
  },
  globalNavBackgroundColor: MINE_SHAFT,
  headlineFont: {
    default: 'uvs-font-a-medium',
  },
  isBrandedHeaderBlack: false,
  gradient,
  primary: VELVET_RED,
  secondary: THEME_DEFAULT_SECONDARY,
});
