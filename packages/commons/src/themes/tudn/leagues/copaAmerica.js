import xxsBg from '../../../assets/images/tudn/backgrounds/copaAmerica/copaAmerica-mobile-414.png';
import smBg from '../../../assets/images/tudn/backgrounds/copaAmerica/copaAmerica-tablet-1024.png';
import mdBg from '../../../assets/images/tudn/backgrounds/copaAmerica/copaAmerica-tablet-768.png';
import xlBg from '../../../assets/images/tudn/backgrounds/copaAmerica/copaAmerica-desktop-1440.png';

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
  };
};
