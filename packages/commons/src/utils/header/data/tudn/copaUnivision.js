import genericNavData from '../genericNavData';
import * as subNavTypes from '../../../../constants/subNavTypes';

export default (data = {}) => {
  const defaultNav = genericNavData(data);
  const title = {
    ...defaultNav.title,
    name: null,
    link: '/deportes/copa-univision',
    logo: ' https://st1.uvnimg.com/a8/dc/180a335647a6b33e9d9ea0ece87d/logo-con-texto.svg',
  };
  return {
    ...defaultNav,
    subNavType: subNavTypes.SECTION_SUBNAV,
    title,
    links: [
      {
        name: 'Inscripciones',
        link: 'https://www.tudn.com/copa-univision/registro',
      },
      {
        name: 'Divisiones',
        link: 'https://www.tudn.com/copa-univision/divisiones-copa-univision',
      },
      {
        name: 'Facebook',
        link: 'https://www.facebook.com/CopaUnivision/',
      },
      {
        name: 'Instagram',
        link: 'https://www.instagram.com/copaunivision/',
      },
      {
        name: 'Preguntas Frecuentes',
        link: 'https://www.tudn.com/preguntas-frecuentes-copa-univision',
      },
      {
        name: 'Contáctanos',
        link: 'https://app.smartsheet.com/b/form/939cf9d7e84d4bcaa56acd0c16adbcda',
      },
    ],
  };
};
