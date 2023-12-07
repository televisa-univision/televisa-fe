import genericNavData from '../genericNavData';

// Unidos contra el coronavirus header data
export default (data = {}) => {
  const defaultNav = genericNavData(data);
  return {
    ...defaultNav,
    title: {
      name: null,
      link: '/unidos',
      logo: 'https://st1.uvnimg.com/1c/8c/c9a8cd4c45cc93aea63667d98411/unidos.svg',
      target: '_self',
    },
  };
};
