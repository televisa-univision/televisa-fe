import genericNavData from '../genericNavData';

export default (data = {}) => {
  const defaultNav = genericNavData(data);
  const title = {
    ...defaultNav.title,
    name: null,
    logo: 'https://st1.uvnimg.com/9d/c3/47453baf4cf1999d3289b5291f73/lupita.png',
  };
  return {
    ...defaultNav,
    title,
  };
};
