import genericNavData from '../genericNavData';
import * as subNavTypes from '../../../../constants/subNavTypes';

export default (data = {}) => {
  const defaultNav = genericNavData(data);
  const title = {
    ...defaultNav.title,
    name: null,
    link: '/shows/premio-lo-nuestro',
    logo: 'https://st1.uvnimg.com/88/c0/74f0885142869bfe40066079d845/pln-logo.svg',
  };
  return {
    ...defaultNav,
    subNavType: subNavTypes.SECTION_SUBNAV,
    title,
    links: [
      {
        name: 'Inicio',
        link: '/shows/premio-lo-nuestro',
      },
      {
        name: 'Videos',
        link: '/shows/premio-lo-nuestro/videos',
      },
      {
        name: 'Fotos',
        link: '/shows/premio-lo-nuestro/fotos',
      },
    ],
  };
};
