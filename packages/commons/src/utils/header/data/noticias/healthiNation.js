import genericNavData from '../genericNavData';

export default (data = {}) => {
  const defaultNav = genericNavData(data);
  const title = {
    ...defaultNav.title,
    name: null,
    link: '/noticias/healthination',
    logo: 'https://st1.uvnimg.com/19/da/e142b82f4a2c9472248c630d2bb4/hn-color-logo.svg',
  };
  return {
    ...defaultNav,
    title,
  };
};
