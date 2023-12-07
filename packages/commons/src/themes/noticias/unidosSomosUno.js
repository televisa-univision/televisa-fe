import {
  DEEP_KOMARU,
  ELECTRIC_BLUE,
} from '@univision/fe-utilities/styled/constants';

/**
 * Unidos Somos Uno theme settings
 * @returns {Object}
 */
const unidosSomosUno = () => ({
  exposedNavBackgroundImages: {
    xxs: 'https://st1.uvnimg.com/23/a6/f7bdf9bc4fa683bc1cddfe4d916b/contentheader-mobile.png',
    md: 'https://st1.uvnimg.com/de/15/6146634b4450846ea0c2a9af9e1d/contentheader-desktop.png',
  },
  globalNavBackgroundColor: DEEP_KOMARU,
  headlineFont: {
    default: 'uvs-font-b-bold',
  },
  isBrandedHeaderBlack: false,
  primary: DEEP_KOMARU,
  secondary: ELECTRIC_BLUE,
  shortTitleBackgroundImages: {
    xxs: 'https://st1.uvnimg.com/23/a6/f7bdf9bc4fa683bc1cddfe4d916b/contentheader-mobile.png',
    md: 'https://st1.uvnimg.com/de/15/6146634b4450846ea0c2a9af9e1d/contentheader-desktop.png',
  },
});

export default unidosSomosUno;
