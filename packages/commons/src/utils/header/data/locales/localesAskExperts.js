import * as subNavTypes from '../../../../constants/subNavTypes';
import getLinks from './links/home';
import * as brandableTypes from '../../../brandable/types.json';
import {
  currentLocalMarketIconSelector,
} from '../../../../store/selectors/local-selectors';

/**
 * Returns the configuration for locales ask the experts.
 * @param {string} uri - brandable uri
 * @param {Object} state - store state
 * @param {string} localMarket - local market
 * @param {string} askExpertsHomepage - ask the experts home page
 * @returns {Object}
 */
export default ({
  uri, state, localMarket, askExpertsHomepage,
}) => {
  const title = {
    logoMarket: currentLocalMarketIconSelector(state),
    link: `${uri}${askExpertsHomepage}`,
    name: 'Pregunta al experto',
    target: '_self',
    isAskExperts: true,
  };

  return {
    brandableType: brandableTypes.tv,
    links: getLinks({ uri, isAskExperts: true, localMarket }),
    title,
    subNavType: subNavTypes.SECTION_SUBNAV,
  };
};
