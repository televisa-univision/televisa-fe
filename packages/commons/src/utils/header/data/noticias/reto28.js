import genericNavData from '../genericNavData';

// Reto 28 nav
export default (data = {}) => {
  const defaultNav = genericNavData(data);
  const title = {
    ...defaultNav.title,
    name: null,
    logo: 'https://st1.uvnimg.com/43/81/ef33655b4b3bba5157b4040c63d0/logo-reto-28-exposed-nav.svg',
  };
  return {
    ...defaultNav,
    title,
  };
};
