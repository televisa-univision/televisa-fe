import {
  BLACK,
  WHITE,
  BITTERSWEET,
  SPRING_STRAWBERRY,
  DARKISH_GRAY,
} from '@univision/fe-utilities/styled/constants';
import widgetBackgroundDesktop from '../../assets/images/ott/prendetv/background-desktop.png';
import widgetBackgroundMobile from '../../assets/images/ott/prendetv/background-mobile.png';

import widgetLogo from '../../assets/images/ott/prendetv/widgetLogo.svg';
import vixLogo from '../../assets/images/ott/prendetv/vixLogo.svg';

export default () => ({
  card: {
    isDark: {
      default: true,
    },
  },
  isDark: true,
  primary: BITTERSWEET,
  secondary: SPRING_STRAWBERRY,
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
