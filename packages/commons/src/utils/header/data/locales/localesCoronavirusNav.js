import * as subNavTypes from '../../../../constants/subNavTypes';
import getLinks, { CORONAVIRUS_LOGO, CORONOVIRUS_HOME } from './links/home';
import * as brandableTypes from '../../../brandable/types.json';
import {
  currentMarketSelector,
  currentLocalMarketIconSelector,
} from '../../../../store/selectors/local-selectors';

/**
 * Returns the configuration for locales Coronavirus Nav.
 * @param {string} logo - Market logo
 * @param {string} state - market
 * @param {string} uri - brandable uri
 * @returns {Object}
 */
export default ({
  logo, state, uri,
}) => {
  const currentMarket = currentMarketSelector(state);
  const LAmarket = 'KMEX';
  const title = {
    link: currentMarket === LAmarket ? `${uri}${CORONOVIRUS_HOME}` : uri,
    logo: currentMarket === LAmarket ? CORONAVIRUS_LOGO : logo,
    logoMarket: currentMarket === LAmarket ? currentLocalMarketIconSelector(state) : null,
    name: null,
    target: '_self',
  };

  return {
    brandableType: brandableTypes.tv,
    links: getLinks({
      uri,
      isCoronavirusNav: true,
      station: currentMarketSelector(state),
    }),
    title,
    subNavType: subNavTypes.SECTION_SUBNAV,
  };
};
