import genericNavData from '../genericNavData';
import * as subNavTypes from '../../../../constants/subNavTypes';

export default (data = {}) => {
  const defaultNav = genericNavData(data);
  const title = {
    ...defaultNav.title,
    name: null,
    link: '/shows/nuestra-belleza-latina',
    logo: 'https://st1.uvnimg.com/aa/05/21829a0f424d84ddf92026fc7785/nbl-logo-custom-theme.png',
  };
  return {
    ...defaultNav,
    subNavType: subNavTypes.SECTION_SUBNAV,
    title,
    links: [
      {
        name: 'Inicio',
        link: '/shows/nuestra-belleza-latina',
      },
      {
        name: 'Vota',
        link: '/shows/nuestra-belleza-latina/vota',
      },
      {
        name: 'Videos',
        link: '/shows/nuestra-belleza-latina/nbl-videos',
      },
      {
        name: 'Fotos',
        link: '/shows/nuestra-belleza-latina/nbl-fotos',
      },
    ],
  };
};
