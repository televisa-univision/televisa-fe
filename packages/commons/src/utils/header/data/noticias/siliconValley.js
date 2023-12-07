import genericNavData from '../genericNavData';
import * as subNavTypes from '../../../../constants/subNavTypes';

// Silicon Valley
export default (data = {}) => {
  const defaultNav = genericNavData(data);
  const title = {
    ...defaultNav.title,
    name: null,
    logo: 'https://st1.uvnimg.com/82/37/19e1b1de48df89478a86e8d9898f/siliconvalley.svg',
  };
  return {
    ...defaultNav,
    subNavType: subNavTypes.SECTION_SUBNAV,
    title,
  };
};
