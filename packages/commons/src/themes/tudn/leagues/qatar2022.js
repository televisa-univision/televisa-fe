import mobileBg from '../../../assets/images/tudn/backgrounds/qatar2022/bg_qatar_mobile.png';
import desktopBg from '../../../assets/images/tudn/backgrounds/qatar2022/bg_qatar_desktop.png';

import { DARK_BLUE } from '../../../utils/styled/constants';

// eslint-disable-next-line import/no-cycle
import tudn from '..';

export default (data = {}, options = {}) => {
  let tudnTheme = {};

  if (!options.onlyLeagueData) {
    tudnTheme = tudn(data, options);
  }

  return {
    ...tudnTheme,
    exposedNavBackgroundImages: {
      xxs: mobileBg,
      sm: desktopBg,
      md: desktopBg,
      xl: desktopBg,
    },
    shortTitleBackgroundImages: {
      xxs: mobileBg,
      sm: desktopBg,
      md: desktopBg,
      xl: desktopBg,
    },
    subNavBackgroundColor: DARK_BLUE,
  };
};
