import { logos } from '../../../../themes/tudn';
import { TUDN_SITE } from '../../../../constants/sites';
import genericTudnData from './generic';

/**
 * Verizon 360 header configuration
 * @param {Object} data - page data
 * @returns {Object}
 */
export default (data = {}) => {
  const defaultNav = genericTudnData(data);

  return {
    ...defaultNav,
    title: {
      logo: logos.verizon,
      name: 'Vista 360º - 5G',
      link: '/verizon-360-tudn',
      site: TUDN_SITE,
      useCustomBranding: true,
    },
  };
};
