import genericNavData from '../genericNavData';

const link = '/unidos-somos-uno';
const logo = 'https://st1.uvnimg.com/4f/70/13f794e34d74a16afe4c4493f506/unidos-somos-uno.svg';
const target = '_self';
/**
 * Unidos Somos Uno header settings
 * @param {Object} data - settings for the header
 * @returns {Object}
 */
const unidosSomosUno = (data = {}) => {
  const defaultNav = genericNavData(data);

  return {
    ...defaultNav,
    title: {
      link,
      logo,
      target,
    },
  };
};

export default unidosSomosUno;
