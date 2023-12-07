import xxsBg from '../../../assets/images/tudn/backgrounds/uefaNations/uefa-nations-mobile-414.png';
import smBg from '../../../assets/images/tudn/backgrounds/uefaNations/uefa-nations-tablet-1024.png';
import mdBg from '../../../assets/images/tudn/backgrounds/uefaNations/uefa-nations-tablet-768.png';
import xlBg from '../../../assets/images/tudn/backgrounds/uefaNations/uefa-nations-desktop-1440.png';

import { FIORD } from '../../../utils/styled/constants';

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
    subNavBackgroundColor: FIORD,
  };
};
