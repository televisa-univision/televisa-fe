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
      xxs: 'https://st1.uvnimg.com/2e/f4/5d3bc07a4d06bab2772657b2d941/grammy-414.jpg',
      sm: 'https://st1.uvnimg.com/51/af/763f8133453bbaae9db485187d7e/grammy-768.jpg',
      md: 'https://st1.uvnimg.com/53/5d/7c1c380b462390b46e96a6198d93/grammy-1024.jpg',
      xl: 'https://st1.uvnimg.com/8d/85/cd271bfb4d04b7a3cc44f6a16f83/grammy-1440.jpg',
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
