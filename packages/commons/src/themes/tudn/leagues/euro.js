import xxsBg from '../../../assets/images/tudn/backgrounds/euro/euro-mobile-440.png';
import smBg from '../../../assets/images/tudn/backgrounds/euro/euro-tablet-1024.png';
import mdBg from '../../../assets/images/tudn/backgrounds/euro/euro-tablet-768.png';
import xlBg from '../../../assets/images/tudn/backgrounds/euro/euro-desktop-1440.png';

import { PACIFIC_BLUE } from '../../../utils/styled/constants';

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
    subNavBackgroundColor: PACIFIC_BLUE,
  };
};
