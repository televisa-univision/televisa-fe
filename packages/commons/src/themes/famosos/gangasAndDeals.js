import {
  BRIGHT_PURPLE,
  DAISY_BUSH,
  PURPLE_HEART,
} from '../../utils/styled/constants';
import { getHorizontalThemeGradient } from '../../utils/styled/mixins';

const gradient = getHorizontalThemeGradient({ end: PURPLE_HEART, start: DAISY_BUSH });

export default () => ({
  card: {
    isDark: {
      video: true,
      slideshow: true,
    },
  },
  headlineFont: {
    default: 'uvs-font-a-medium',
  },
  gradient,
  primary: DAISY_BUSH,
  secondary: PURPLE_HEART,
  subNavBackgroundColor: BRIGHT_PURPLE,
});
