import genericNavData from '../genericNavData';
import * as subNavTypes from '../../../../constants/subNavTypes';

const contigoBaseUrl = '/noticias/especiales/contigo';

// Contigo
export default (data = {}) => {
  const defaultNav = genericNavData(data);
  const title = {
    ...defaultNav.title,
    name: null,
    link: '/noticias/especiales/contigo',
    logo: 'https://st1.uvnimg.com/b7/c2/4be71f884e96ae080d8e7b0a0205/con-univision-hz-gray-color.png',
  };
  return {
    ...defaultNav,
    subNavType: subNavTypes.SECTION_SUBNAV,
    title,
    links: [
      {
        name: 'Posible',
        link: '/posible',
      },
      {
        name: 'Hazte Ciudadano',
        link: `${contigoBaseUrl}/hazte-ciudadano`,
      },
      {
        name: 'Educación',
        link: `${contigoBaseUrl}/educacion`,
      },
      {
        name: 'Salud',
        link: `${contigoBaseUrl}/salud`,
      },
      {
        name: 'En Sus Palabras',
        link: `${contigoBaseUrl}/en-sus-palabras`,
      },
      {
        name: 'Univision Foundation',
        link: 'https://univision.org/',
      },
      {
        name: 'Bilingual Voices',
        link: `${contigoBaseUrl}/bilingual-voices`,
      },
      {
        name: 'TeletonUSA',
        link: 'http://www.teletonusa.org/',
      },
    ],
  };
};
