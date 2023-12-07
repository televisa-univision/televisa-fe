import genericNavData from '../genericNavData';
import * as subNavTypes from '../../../../constants/subNavTypes';

export default (data = {}) => {
  const defaultNav = genericNavData(data);
  const title = {
    ...defaultNav.title,
    name: null,
    link: '/shows/latin-grammy-celebra-ellas-y-su-musica',
    logo: 'https://st1.uvnimg.com/57/48/a84eb31f4ee4bc32149fcfd72eb5/logo-lg-celebra-1.svg',
  };
  return {
    ...defaultNav,
    subNavType: subNavTypes.SECTION_SUBNAV,
    title,
    links: [
      {
        name: 'Noticias y más',
        link: '/shows/latin-grammy-celebra-ellas-y-su-musica',
      },
      {
        name: 'Capítulos completos',
        link: '/shows/latin-grammy-celebra-ellas-y-su-musica',
      },
      {
        name: 'Performances',
        link: '/shows/latin-grammy-celebra-ellas-y-su-musica/performances',
      },
      {
        name: 'Fotos',
        link: '/shows/latin-grammy-celebra-ellas-y-su-musica/fotos',
      },
    ],
  };
};
