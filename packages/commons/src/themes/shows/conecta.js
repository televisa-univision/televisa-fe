import {
  BLACK,
  MARTINIQUE,
  DARK_VARIANT,
  SHOWS_GRADIENT,
} from '../../utils/styled/constants';
import univisionLogoWhite from '../../assets/images/logo-univision-white.svg';

export default () => {
  return {
    exposedNavBackgroundImages: {
      xxs: 'https://st1.uvnimg.com/01/8b/86146f014c978824ad8ad263def6/414-138.png',
      sm: 'https://st1.uvnimg.com/61/3d/90c38fc3480bb84b891c00bff440/769-107.png',
      md: 'https://st1.uvnimg.com/bd/7c/2d9954ad492ebc87ec83796466ed/1024-103.png',
      xl: 'https://st1.uvnimg.com/5c/6e/d80219714dba9be4524ccd79cd95/1440-80.png',
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
    primary: MARTINIQUE,
    secondary: BLACK,
    subNavBackgroundColor: BLACK,
    variant: DARK_VARIANT,
  };
};
