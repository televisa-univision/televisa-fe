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
      xxs: 'https://st1.uvnimg.com/cd/07/b1bf66f4455db020b45b64571478/mobile.jpg',
      sm: 'https://st1.uvnimg.com/71/f9/7539549349de97b5c759312faa0a/tablet.jpg',
      md: 'https://st1.uvnimg.com/71/f9/7539549349de97b5c759312faa0a/tablet.jpg',
      xl: 'https://st1.uvnimg.com/39/b8/3e1ce4154f169486617b01fafe31/desktop-4.jpg',
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
