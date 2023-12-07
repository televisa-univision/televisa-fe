import genericNavData from '../genericNavData';

/**
 * Censo 2020 header settings
 * @param {Object} data - settings for the header
 * @returns {Object}
 */
const censo2020 = (data = {}) => {
  const defaultNav = genericNavData(data);

  return {
    ...defaultNav,
    title: {
      name: null,
      link: '/censo2020',
      logo: 'https://st1.uvnimg.com/62/ce/12843e87475f9fcc877384519d17/logo-censo2020-banner.svg',
      target: '_self',
    },
  };
};

export default censo2020;
