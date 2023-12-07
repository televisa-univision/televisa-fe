import * as subNavTypes from '../../../../constants/subNavTypes';
import getLinks, { ELECTIONS_2020_LOGO } from './links/home';
import * as brandableTypes from '../../../brandable/types.json';
import {
  currentMarketSelector,
  currentLocalMarketIconSelector,
} from '../../../../store/selectors/local-selectors';

/**
 * Returns the configuration for the Elections 2020 header for locales.
 * @param {string} uri local market home page
 * @param {Object} state - store state
 * @returns {Object}
 */
export default ({ uri, state }) => {
  const title = {
    logoMarket: currentLocalMarketIconSelector(state),
    link: `${uri}/elecciones-en-eeuu-2022`,
    logo: ELECTIONS_2020_LOGO,
    name: null,
    target: '_self',
  };

  return {
    brandableType: brandableTypes.tv,
    links: getLinks({
      uri,
      isElections: true,
      station: currentMarketSelector(state),
    }),
    title,
    subNavType: subNavTypes.SECTION_SUBNAV,
  };
};
