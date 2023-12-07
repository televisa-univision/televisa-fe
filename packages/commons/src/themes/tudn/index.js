import {
  AQUA_DEEP,
  BLACK,
  BRITISH_RACING_GREEN,
  GOSSAMER,
  TROPICAL_RAIN_FOREST,
  TUDN_GRADIENT,
  WATERCOURSE,
  WHITE,
} from '@univision/fe-utilities/styled/constants';

import { SOCCER } from '../../constants/sportTypes';
import contentTypes from '../../constants/contentTypes.json';
import { getHorizontalThemeGradient } from '../../utils/styled/mixins';
import backgroundDesktopMvpd from '../../assets/images/registration/backgrounds/desktop-background-mvpd-tudn.png';
import backgroundMobileMvpd from '../../assets/images/registration/backgrounds/mobile-background-mvpd-tudn.png';
import backgroundMobileMvpdEdit from '../../assets/images/registration/backgrounds/mobile-background-mvpd-edit-tudn.png';
import tudnWhiteLogo from '../../assets/images/tudn/tudn_white_logo.svg';
import tudnRebrandTheme from './tudnRebrand';
// eslint-disable-next-line import/no-cycle
import leagues from './leagues';

import logos from './logos';
import features from '../../config/features';

const exposedNavGradient = getHorizontalThemeGradient({
  end: WATERCOURSE,
  start: BRITISH_RACING_GREEN,
});

/**
 * Default TUDN theme definition
 * @param {Object} data - page data from API
 * @param {Object} options - additional options
 * @returns {Object}
 */
export default function tudnTheme(data = {}, options = {}) {
  const headlineFont = 'uvs-font-b-bold';
  const {
    type,
    uri,
  } = data;

  let leaguesData = {};
  if (features.deportes.useLeagueTheme(uri, type)) {
    leaguesData = leagues(data, { ...options, onlyLeagueData: true });
  }

  // Import the specific Show background images
  return {
    actionBarType: SOCCER,
    card: {
      isDark: {
        audio: true,
        default: false,
        externallink: true,
        horoscopos: true,
        podcastseries: true,
        radiostation: true,
        section: true,
        show: true,
        slideshow: true,
        soccermatch: true,
        tvstation: true,
        video: true,
        videoInline: false,
      },
      headlineFont: {
        default: headlineFont,
      },
    },
    brandedHeaderLogoFill: WHITE,
    disablePrendeTvButton: true,
    exposedNavGradient,
    footerLogo: tudnWhiteLogo,
    globalNavBackgroundColor: BLACK,
    gradient: TUDN_GRADIENT,
    headlineFont: {
      default: headlineFont,
    },
    isBrandedHeaderBlack: true,
    isFooterDark: true,
    primary: TROPICAL_RAIN_FOREST,
    registration: {
      badgeColor: TROPICAL_RAIN_FOREST,
      gradient: TUDN_GRADIENT,
      mvpd: {
        backgroundMobile: backgroundMobileMvpd,
        backgroundMobileEdit: backgroundMobileMvpdEdit,
        backgroundDesktop: backgroundDesktopMvpd,
      },
      primary: TROPICAL_RAIN_FOREST,
      welcomeIcon: 'tudn',
    },
    secondary: GOSSAMER,
    shortTitleAlignCenter: type === contentTypes.SOCCER_MATCH,
    shortTitleGradient: exposedNavGradient,
    showIconPromoTitle: true,
    showTudnRegistration: true,
    subNavBackgroundColor: AQUA_DEEP,
    tagColor: GOSSAMER,
    tertiary: AQUA_DEEP,
    ...tudnRebrandTheme(options),
    ...leaguesData,
  };
}

export { logos };
