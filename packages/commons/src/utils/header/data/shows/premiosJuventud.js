import genericNavData from '../genericNavData';
import * as subNavTypes from '../../../../constants/subNavTypes';

export default (data = {}) => {
  const defaultNav = genericNavData(data);
  const title = {
    ...defaultNav.title,
    name: null,
    link: '/shows/premios-juventud',
    logo: 'https://st1.uvnimg.com/8a/1f/c9b179784105be5d0e0528a97358/logo-pj-2023.svg',
  };
  return {
    ...defaultNav,
    subNavType: subNavTypes.SECTION_SUBNAV,
    title,
    links: [
      {
        name: 'Inicio',
        link: '/shows/premios-juventud',
      },
      {
        name: 'Performances',
        link: '/especiales/premios-juventud/performances',
      },
      {
        name: 'Fotos',
        link: '/especiales/premios-juventud/pj-fotos',
      },
    ],
  };
};
