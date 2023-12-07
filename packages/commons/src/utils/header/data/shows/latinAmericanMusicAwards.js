import genericNavData from '../genericNavData';
import * as subNavTypes from '../../../../constants/subNavTypes';

export default (data = {}) => {
  const defaultNav = genericNavData(data);
  const title = {
    ...defaultNav.title,
    name: null,
    link: '/shows/latin-american-music-awards',
    logo: 'https://st1.uvnimg.com/0f/b6/32cbe2434d818d4d5e70f1fdcae8/latin-amas-logo-275x88-izq-1.png',
  };
  return {
    ...defaultNav,
    subNavType: subNavTypes.SECTION_SUBNAV,
    title,
    links: [
      {
        name: 'Inicio',
        link: '/shows/latin-american-music-awards',
      },
      {
        name: 'Videos',
        link: '/shows/latin-american-music-awards/video',
      },
      {
        name: 'Fotos',
        link: '/shows/latin-american-music-awards/fotos',
      },
    ],
  };
};
