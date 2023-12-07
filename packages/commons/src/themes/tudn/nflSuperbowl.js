import xxsBg from '../../assets/images/tudn/backgrounds/superbowl/superbowl-mobile-414.png';
import smBg from '../../assets/images/tudn/backgrounds/superbowl/superbowl-tablet-1024.png';
import mdBg from '../../assets/images/tudn/backgrounds/superbowl/superbowl-tablet-768.png';
import xlBg from '../../assets/images/tudn/backgrounds/superbowl/superbowl-desktop-1440.png';

import { DARK_BLUE } from '../../utils/styled/constants';
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
    subNavBackgroundColor: DARK_BLUE,
  };
};
