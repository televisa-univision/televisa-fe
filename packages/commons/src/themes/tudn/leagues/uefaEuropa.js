import xxsBg from '../../../assets/images/tudn/backgrounds/uefaEuropa/uefa-europa-mobile-414.png';
import smBg from '../../../assets/images/tudn/backgrounds/uefaEuropa/uefa-europa-tablet-1024.png';
import mdBg from '../../../assets/images/tudn/backgrounds/uefaEuropa/uefa-europa-tablet-768.png';
import xlBg from '../../../assets/images/tudn/backgrounds/uefaEuropa/uefa-europa-desktop-1440.png';

import { BLACK } from '../../../utils/styled/constants';

// eslint-disable-next-line import/no-cycle
import tudn from '..';

export default (data = {}, options = {}) => {
  return {
    ...tudn(data, options),
    exposedNavBackgroundImages: {
      xxs: xxsBg,
      sm: smBg,
      md: mdBg,
      xl: xlBg,
    },
    shortTitleBackgroundImages: {
      xxs: xxsBg,
      sm: smBg,
      md: mdBg,
      xl: xlBg,
    },
    subNavBackgroundColor: BLACK,
  };
};
