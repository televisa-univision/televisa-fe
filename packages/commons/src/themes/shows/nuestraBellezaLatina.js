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
      xxs: 'https://st1.uvnimg.com/43/94/f782a6d84ed888334defb16b925b/nbl-content-header-mobile.jpg',
      sm: 'https://st1.uvnimg.com/43/94/f782a6d84ed888334defb16b925b/nbl-content-header-mobile.jpg',
      md: 'https://st1.uvnimg.com/5e/54/756698f14ccb9d0839c755425df9/nbl-content-header-desktop.jpg',
      xl: 'https://st1.uvnimg.com/5e/54/756698f14ccb9d0839c755425df9/nbl-content-header-desktop.jpg',
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
