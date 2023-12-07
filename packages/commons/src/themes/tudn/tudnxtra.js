import xxsBg from '../../assets/images/tudn/backgrounds/tudnXtra/tudnxtra-mobile-414.png';
import smBg from '../../assets/images/tudn/backgrounds/tudnXtra/tudnxtra-tablet-1024.png';
import mdBg from '../../assets/images/tudn/backgrounds/tudnXtra/tudnxtra-tablet-768.png';
import xlBg from '../../assets/images/tudn/backgrounds/tudnXtra/tudnxtra-desktop-1440.png';

import tudn from '.';

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
  };
};
