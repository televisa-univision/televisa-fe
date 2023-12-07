import genericNavData from '../genericNavData';
import links from './links/home';

const deliciosoLogo = 'https://st1.uvnimg.com/d9/3d/85e7a6a7456786c6811f5f544ba1/delicioso.svg';

export default (data = {}) => {
  const defaultNav = genericNavData(data);

  return {
    ...defaultNav,
    links,
    title: {
      link: '/delicioso',
      name: null,
      logo: deliciosoLogo,
      target: '_self',
    },
  };
};
