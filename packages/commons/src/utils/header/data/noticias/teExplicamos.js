import genericNavData from '../genericNavData';
import * as subNavTypes from '../../../../constants/subNavTypes';
import links from './links/teExplicamos';

// Te explicamos
export default (data = {}) => {
  const defaultNav = genericNavData(data);
  const title = {
    ...defaultNav.title,
    name: null,
    logo: 'https://st1.uvnimg.com/9c/37/7c490807443088dcd5b2537b567a/teexplicamos.svg',
  };
  return {
    ...defaultNav,
    subNavType: subNavTypes.SECTION_SUBNAV,
    title,
    links,
  };
};
