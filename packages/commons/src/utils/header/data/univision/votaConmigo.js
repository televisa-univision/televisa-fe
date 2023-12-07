import genericNavData from '../genericNavData';

export default (data = {}) => {
  const defaultNav = genericNavData(data);
  const title = {
    ...defaultNav.title,
    name: null,
    logo: 'https://st1.uvnimg.com/a0/2e/0db52abe48e2863b8920f98f6bb2/vota-conmigo-logo.svg',
  };
  return {
    ...defaultNav,
    title,
  };
};
