import {
  BLACK,
  THEME_DEFAULT_PRIMARY,
  DARK_VARIANT,
  SHOWS_GRADIENT,
} from '../../utils/styled/constants';
import univisionLogoWhite from '../../assets/images/logo-univision-white.svg';

export default () => {
  return {
    exposedNavBackgroundImages: {
      xxs: 'https://st1.uvnimg.com/e8/14/695f00444c69b0fd3b804801628d/414-138.png',
      sm: 'https://st1.uvnimg.com/b8/b8/72584f7145a88ed1b5b665e4f2f5/769-107.png',
      md: 'https://st1.uvnimg.com/0f/35/df9340a24c6bab55507d95e52b2f/1024-103.png',
      xl: 'https://st1.uvnimg.com/4e/67/42e2fd6149a995e45254c2c680f2/1440-80.png',
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
    subNavBackgroundColor: BLACK,
    variant: DARK_VARIANT,
  };
};
