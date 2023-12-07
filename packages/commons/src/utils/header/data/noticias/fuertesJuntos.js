import genericNavData from '../genericNavData';
import * as subNavTypes from '../../../../constants/subNavTypes';

// Fuertes juntos
export default (data = {}) => {
  const defaultNav = genericNavData(data);
  const title = {
    ...defaultNav.title,
    name: null,
    link: '/noticias/salud/fuertes-juntos',
    logo: 'https://st1.uvnimg.com/20/5a/021cf5ee4420b14a0b9b1d8148d8/fuertesjuntos.svg',
  };
  return {
    ...defaultNav,
    subNavType: subNavTypes.SECTION_SUBNAV,
    title,
  };
};
