import {
  CHARADE,
  HALF_BAKED,
  WEDGEWOOD,
} from '@univision/fe-utilities/styled/constants';
import LOGOS from '../../../constants/vixSitesData';

/**
 * Default Delicioso theme definition
 * @returns {Object}
 */
export default function deliciosoTheme() {
  const headlineFont = 'uvs-font-b-bold';

  return {
    disablePrendeTvButton: true,
    footerLogo: LOGOS.delicioso,
    footerLogoHeight: '54px',
    headerBackground: CHARADE,
    headlineFont: {
      default: headlineFont,
    },
    primary: HALF_BAKED,
    secondary: WEDGEWOOD,
    tagColor: HALF_BAKED,
    widgetTitleColor: HALF_BAKED,
    footerCopyright: `Copyright. © ${new Date().getFullYear()}`,
  };
}
