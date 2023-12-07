import genericNavData from '../genericNavData';

export default (data = {}) => {
  const defaultNav = genericNavData(data);
  const title = {
    ...defaultNav.title,
    name: null,
    link: 'destino-vota-conmigo',
    logo: 'https://st1.uvnimg.com/ea/aa/6deb500c4c76b31de5f6861b6d18/logo-votaconmigo.svg',
  };
  return {
    ...defaultNav,
    title,
  };
};
