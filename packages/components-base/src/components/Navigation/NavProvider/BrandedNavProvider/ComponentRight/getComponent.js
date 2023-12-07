import { useSelector } from 'react-redux';

import brandableTypes from '@univision/fe-commons/dist/utils/brandable/types.json';
import features from '@univision/fe-commons/dist/config/features';
import Store from '@univision/fe-commons/dist/store/store';
import { getKey } from '@univision/fe-commons/dist/utils/helpers';
import { getBrandable } from '@univision/fe-commons/dist/store/storeHelpers';
import { TELEVISA_SITE } from '@univision/fe-commons/dist/constants/sites';
import { isTelevisaSiteSelector, siteSelector } from '@univision/fe-commons/dist/store/selectors/page-selectors';
import Locales from './Locales';
import localTVIconBlackList from './localTVIconBlackList';
import UserBadge from '../../../../UserBadge';
import UniNow from './UniNow';
import TelevisaButtons from './TelevisaButtons';
import TudnRebrand from './TudnRebrand';
import TelevisaRebrand from './TelevisaRebrand';

/**
 * getComponent method helper
 * @param {string} brandableType brandable type to identify which component to load
 * @param {bool} isRegistrationEnabled flag to show registration process
 * @returns {Object}
 */
export default (brandableType, isRegistrationEnabled) => {
  const isTelevisaSite = useSelector(isTelevisaSiteSelector);
  const site = useSelector(siteSelector);

  if (features.deportes.isWorldCupMVP()) {
    return TudnRebrand;
  }

  if (site === TELEVISA_SITE) {
    return TelevisaButtons;
  }

  if (isTelevisaSite) {
    return TelevisaRebrand;
  }

  if (isRegistrationEnabled) {
    return UserBadge;
  }
  if (features.header.buttonUniNow()) {
    return UniNow;
  }
  if (brandableType && brandableTypes.tv) {
    const localMarket = getKey(getBrandable(Store), 'tvStation.call', '');
    const shouldRender = !localTVIconBlackList.includes(localMarket.toUpperCase());
    return shouldRender ? Locales : () => null;
  }
  return () => null;
};
