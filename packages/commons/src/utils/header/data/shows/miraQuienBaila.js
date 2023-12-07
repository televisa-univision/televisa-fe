import genericNavData from '../genericNavData';
import * as subNavTypes from '../../../../constants/subNavTypes';

export default (data = {}) => {
  const defaultNav = genericNavData(data);
  const title = {
    ...defaultNav.title,
    name: null,
    link: '/shows/mira-quien-baila',
    logo: ' https://st1.uvnimg.com/03/8b/50c2db67406db97d832ff5fd7b5f/logo.svg',
  };
  return {
    ...defaultNav,
    subNavType: subNavTypes.SECTION_SUBNAV,
    title,
    links: [
      {
        name: 'Noticias y más',
        link: '/shows/mira-quien-baila',
      },
      {
        name: 'Capítulos completos',
        link: '/shows/mira-quien-baila',
      },
      {
        name: 'Performances',
        link: '/shows/mira-quien-baila/performances',
      },
      {
        name: 'Jueces',
        link: '/shows/mira-quien-baila/jueces',
      },
      {
        name: 'Conductores',
        link: '/shows/mira-quien-baila/conductores',
      },
      {
        name: 'Participantes',
        link: '/shows/mira-quien-baila/participantes',
      },
    ],
  };
};
