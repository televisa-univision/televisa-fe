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
      xxs: 'https://st1.uvnimg.com/b3/93/88b9955c4faf8fffdeed9497a59e/414-min.png',
      sm: 'https://st1.uvnimg.com/4e/54/b4506727473fab2aac9e44320a33/768-min.png',
      md: 'https://st1.uvnimg.com/41/be/8d770e76404f91d6b7b453281409/1024-min.png',
      xl: 'https://st1.uvnimg.com/e2/80/405211f2477eb80798abe26de739/1440-min.png',
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
