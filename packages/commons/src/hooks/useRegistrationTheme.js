import { useSelector } from 'react-redux';

import isEqual from '@univision/fe-utilities/helpers/common/isEqual';
import { BLACK_GREY, UVN_GRADIENT, OCHRE } from '@univision/fe-utilities/styled/constants';

import { themeSelector } from '../store/selectors/page-selectors';
import backgroundDesktopMvpd from '../assets/images/registration/backgrounds/desktop-background-mvpd.png';
import backgroundMobileMvpd from '../assets/images/registration/backgrounds/mobile-background-mvpd.png';
import backgroundMobileMvpdEdit from '../assets/images/registration/backgrounds/mobile-background-mvpd-edit.png';

// The default registration theme
export const defaultTheme = {
  badgeColor: OCHRE,
  primary: BLACK_GREY,
  gradient: UVN_GRADIENT,
  mvpd: {
    backgroundMobile: backgroundMobileMvpd,
    backgroundMobileEdit: backgroundMobileMvpdEdit,
    backgroundDesktop: backgroundDesktopMvpd,
  },
};

/**
 * State equality method for the theme selector
 * @param {Object} prev - previous state
 * @param {Object} next - next state
 * @returns {boolean}
 */
export const registrationThemeComparison = (prev, next) => (
  isEqual(prev?.registration, next?.registration)
);

/**
 * Builds a registration theme from default and override values
 * present in the webapp theme.
 * @returns {Object}
*/
export default () => {
  const webappTheme = useSelector(themeSelector, registrationThemeComparison);

  return {
    ...defaultTheme,
    ...webappTheme?.registration,
  };
};
