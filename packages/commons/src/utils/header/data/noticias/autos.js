import genericNavData from '../genericNavData';

import links from './links/autos';

const autosLogo = 'https://st1.uvnimg.com/d9/af/14f55670472caa4ab2834970c150/brand.svg';

// A bordo conf file
export default (data = {}) => {
  const defaultNav = genericNavData(data);

  return {
    ...defaultNav,
    links,
    title: {
      logo: autosLogo,
      name: null,
      link: '/carros',
      target: '_self',
    },
  };
};
