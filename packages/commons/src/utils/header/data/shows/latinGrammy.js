import genericNavData from '../genericNavData';
import * as subNavTypes from '../../../../constants/subNavTypes';

export default (data = {}) => {
  const defaultNav = genericNavData(data);
  const title = {
    ...defaultNav.title,
    name: null,
    link: '/shows/latin-grammy',
    logo: 'https://st1.uvnimg.com/9a/f5/a42eca8b495a87a40fc20c48e09c/logo.png',
  };
  return {
    ...defaultNav,
    subNavType: subNavTypes.SECTION_SUBNAV,
    title,
    links: [
      {
        name: 'Inicio',
        link: '/shows/latin-grammy',
      },
      {
        name: 'Videos',
        link: '/shows/latin-grammy/video',
      },
      {
        name: 'Fotos',
        link: '/shows/latin-grammy/fotos',
      },
    ],
  };
};
