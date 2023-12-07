// eslint-disable-next-line import/no-cycle
import Store from '../../store/store';
// eslint-disable-next-line import/no-cycle
import {
  getPageData, isContentTypeAllowed, getRequestParams, getVertical,
} from '../../store/storeHelpers';
// eslint-disable-next-line import/no-cycle
import { getKey } from '../../utils/helpers';
import { NEWS } from '../../constants/pageCategories';

export default {
  // Track ad impressions
  areAdsTrackable: () => isContentTypeAllowed(Store, ['soccermatch']),
  // Disallow cookies for users in EU
  areCookiesDisallowed: () => getKey(getPageData(Store), 'headers.x-is-user-loc-eu', 'false') === 'true',
  // Integral Ad Science
  ias: () => getKey(getPageData(Store), 'headers.x-is-user-loc-eu', 'false') !== 'true',
  invisibly: () => {
    return getKey(getRequestParams(Store), 'invisibly', false) && getVertical(Store) === NEWS;
  },
  // true (default) = Turn on Amazon + Rubicon prebid and turn off Index Exchange | false = opposite
  isPrebidDisplay: () => true,
  // failsafe timeout in case amazon and prebid don't finish
  prebidFailsafeTimeout: 2500,
  // timeout to close AdhesionUnit component
  adhesionUnitTimeout: 8000,
};
