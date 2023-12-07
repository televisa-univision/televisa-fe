import {
  CHARADE,
  HALF_BAKED,
  WEDGEWOOD,
} from '@univision/fe-utilities/styled/constants';
import LOGOS from '../../../constants/vixSitesData';

/**
 * Default mulher theme definition
 * @returns {Object}
 */
export default function mulherTheme() {
  const headlineFont = 'uvs-font-b-bold';

  return {
    disablePrendeTvButton: true,
    footerLogo: LOGOS.mulher,
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
