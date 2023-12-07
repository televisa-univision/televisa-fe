import genericNavData from '../genericNavData';
import * as subNavTypes from '../../../../constants/subNavTypes';

// Segunda Oportunidad
export default (data = {}) => {
  const defaultNav = genericNavData(data);
  const title = {
    ...defaultNav.title,
    name: null,
    logo: 'https://st1.uvnimg.com/b5/09/60f780ef480dbfa6b2dafff2c66a/logo-so-esp.svg',
  };
  return {
    ...defaultNav,
    subNavType: subNavTypes.SECTION_SUBNAV,
    title,
  };
};
