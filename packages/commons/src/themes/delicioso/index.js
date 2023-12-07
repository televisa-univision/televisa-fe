import {
  CORAL_RED,
  DARK_VELVET_RED,
  RED,
  VELVET_RED,
} from '../../utils/styled/constants';
import { getHorizontalThemeGradient } from '../../utils/styled/mixins';

const gradient = getHorizontalThemeGradient({ end: CORAL_RED, start: RED });

export default () => ({
  card: {
    isDark: {
      video: true,
      slideshow: true,
    },
  },
  exposedNavBackgroundImages: {
    xxs: 'https://st1.uvnimg.com/2f/62/da644a8d4142a9305852440deba8/mobile414.png',
    sm: 'https://st1.uvnimg.com/1c/b9/bf20add74b35b6991f44c45a5a13/tablet768.png',
    md: 'https://st1.uvnimg.com/79/27/d83a7fd141cc93ab8e3bfb7afcfb/tablet-1024.png',
    xl: 'https://st1.uvnimg.com/f4/43/dc431ad54413a57b59ee9cc30d88/desktop-1440.png',
  },
  gradient,
  globalNavBackgroundColor: DARK_VELVET_RED,
  headlineFont: {
    default: 'uvs-font-a-medium',
  },
  isBrandedHeaderBlack: false,
  primary: RED,
  secondary: VELVET_RED,
  shortTitleBackgroundImages: {
    xxs: 'https://st1.uvnimg.com/2f/62/da644a8d4142a9305852440deba8/mobile414.png',
    sm: 'https://st1.uvnimg.com/1c/b9/bf20add74b35b6991f44c45a5a13/tablet768.png',
    md: 'https://st1.uvnimg.com/79/27/d83a7fd141cc93ab8e3bfb7afcfb/tablet-1024.png',
    xl: 'https://st1.uvnimg.com/f4/43/dc431ad54413a57b59ee9cc30d88/desktop-1440.png',
  },
});
