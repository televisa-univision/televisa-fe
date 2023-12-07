import xxsBg from '../../assets/images/tudn/backgrounds/copaUnivision/background-mobile.png';
import xlBg from '../../assets/images/tudn/backgrounds/copaUnivision/background-desktop.png';
import {
  BLACK,
  MARTINIQUE,
  DARK_VARIANT,
} from '../../utils/styled/constants';

import tudn from '.';

export default (data = {}, options = {}) => {
  return {
    ...tudn(data, options),
    exposedNavBackgroundImages: {
      xxs: xxsBg,
      sm: xxsBg,
      md: xlBg,
      xl: xlBg,
    },
    shortTitleBackgroundImages: {
      xxs: xxsBg,
      sm: xxsBg,
      md: xlBg,
      xl: xlBg,
    },
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
