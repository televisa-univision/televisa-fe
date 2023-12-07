import {
  BLACK_BEAN_MIDNIGHT_GRADIENT,
  BLACK,
  DARK_VARIANT,
  SHOWS_GRADIENT,
  THEME_DEFAULT_PRIMARY,
} from '../../utils/styled/constants';
import univisionLogoWhite from '../../assets/images/logo-univision-white.svg';

export default () => {
  return {
    card: {
      isDark: {
        default: true,
      },
      headlineFont: {
        default: 'uvs-font-b-bold',
      },
    },
    exposedNavBackgroundImages: {
      xxs: 'https://st1.uvnimg.com/4c/b4/68fd8fb744fa8083110ece353056/mobile-lg-2022.jpg',
      sm: 'https://st1.uvnimg.com/f5/41/49006f614fa5b179eff1991b865e/tablet-lg-2022.jpg',
      md: 'https://st1.uvnimg.com/f5/41/49006f614fa5b179eff1991b865e/tablet-lg-2022.jpg',
      xl: 'https://st1.uvnimg.com/6d/55/dadd96d849f1beaf64edc2d752ed/desktop-lg-2022.jpg',
    },
    footerLogo: univisionLogoWhite,
    gradient: SHOWS_GRADIENT,
    globalNavBackgroundColor: BLACK,
    globalNavBorderTop: '1px solid rgba(210, 210, 210, .41)',
    headlineFont: {
      portrait: 'uvs-font-a-bold',
      rectangle: 'uvs-font-a-bold',
      default: 'uvs-font-a-black',
    },
    isBrandedHeaderBlack: true,
    isDark: true,
    isFooterDark: true,
    primary: THEME_DEFAULT_PRIMARY,
    secondary: BLACK,
    shortTitleGradient: BLACK_BEAN_MIDNIGHT_GRADIENT,
    subNavBackgroundColor: BLACK,
    variant: DARK_VARIANT,
  };
};
