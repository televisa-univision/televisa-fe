import {
  CHARADE,
  HALF_BAKED,
  WEDGEWOOD,
} from '@univision/fe-utilities/styled/constants';
import LOGOS from '../../../constants/vixSitesData';

/**
 * Default zappeando theme definition
 * @returns {Object}
 */
export default function zappeandoTheme() {
  const headlineFont = 'uvs-font-b-bold';

  return {
    disablePrendeTvButton: true,
    footerLogo: LOGOS.zappeando,
    footerLogoHeight: '54px',
    headerBackground: CHARADE,
    headlineFont: {
      default: headlineFont,
    },
    primary: HALF_BAKED,
    secondary: WEDGEWOOD,
    tagColor: HALF_BAKED,
    footerCopyright: `Copyright. © ${new Date().getFullYear()}`,
  };
}
