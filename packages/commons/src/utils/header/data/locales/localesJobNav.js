import * as subNavTypes from '../../../../constants/subNavTypes';
import getLinks from './links/home';
import * as brandableTypes from '../../../brandable/types.json';
import {
  currentLocalMarketIconSelector,
} from '../../../../store/selectors/local-selectors';

/**
 * Returns the configuration for locales jobs.
 * @param {string} uri - brandable uri
 * @param {Object} state - store state
 * @param {string} localMarket - local market
 * @param {string} jobsHomepage - jobs home page
 * @returns {Object}
 */
export default ({
  uri, state, localMarket, jobsHomepage,
}) => {
  const title = {
    logoMarket: currentLocalMarketIconSelector(state),
    link: `${uri}${jobsHomepage}`,
    name: 'Ofertas de trabajo',
    target: '_self',
    isLocalesJob: true,
  };

  return {
    brandableType: brandableTypes.tv,
    links: getLinks({ uri, isLocalesJob: true, localMarket }),
    title,
    subNavType: subNavTypes.SECTION_SUBNAV,
  };
};
