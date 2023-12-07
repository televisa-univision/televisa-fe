import {
  BLACK,
  WHITE,
  INTERNATIONAL_PURPLE,
  DARKISH_GRAY,
  INTERNATIONAL_ORANGE,
} from '@univision/fe-utilities/styled/constants';

import widgetBackgroundDesktop from '../../assets/images/ott/prendetv/background-desktop.png';
import widgetBackgroundMobile from '../../assets/images/ott/prendetv/background-mobile.png';

import widgetLogo from '../../assets/images/ott/prendetv/widgetLogo.svg';
import vixLogo from '../../assets/images/ott/prendetv/vixLogo.svg';
import { PURPLE_ORANGE_ORANGE_DARK } from '../../utils/styled/constants';

export default () => ({
  card: {
    isDark: {
      default: true,
    },
  },
  isDark: true,
  gradient: PURPLE_ORANGE_ORANGE_DARK,
  primary: INTERNATIONAL_PURPLE,
  secondary: INTERNATIONAL_ORANGE,
  widgetBackgroundImage: {
    mobile: widgetBackgroundMobile,
    desktop: widgetBackgroundDesktop,
  },
  widgetLogo,
  vixLogo,
  widgetTheme: {
    card: {
      isDark: {
        default: true,
      },
    },
    isDark: false,
    primary: BLACK,
    secondary: WHITE,
    widgetTitleColor: WHITE,
    turnDark: true,
    enablePadding: true,
    widgetLogo,
    vixLogo,
    backgroundColor: DARKISH_GRAY,
  },
});
