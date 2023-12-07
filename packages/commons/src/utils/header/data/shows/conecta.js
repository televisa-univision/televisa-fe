import genericNavData from '../genericNavData';

/**
 * Conecta header
 * @param {Object} data Page data
 * @returns {Object}
 */
export default (data = {}) => {
  const defaultNav = genericNavData(data);
  const title = {
    ...defaultNav.title,
    name: '',
    link: '/conecta',
    logo: 'https://st1.uvnimg.com/09/3a/182ca2ba452d86fbcfa44397dd13/conecta-logo-2.svg',
  };

  return {
    ...defaultNav,
    title,
  };
};
