// eslint-disable-next-line import/no-cycle
import Store from '../../store/store';
// eslint-disable-next-line import/no-cycle
import {
  getPageCategory,
  getRequestParams,
  isUnivisionSite,
  getPageData,
} from '../../store/storeHelpers';
// eslint-disable-next-line import/no-cycle
import { getKey } from '../../utils/helpers';
import { TV } from '../../constants/pageCategories';

export default {
  buttonUniNow: () => (
    isUnivisionSite(Store) && getPageCategory(Store) !== TV ? 'enVivoTvIcon' : null
  ),
  activeTab: () => (getKey(getRequestParams(Store), 'tab', false)),
  hideHeaderFooter: () => (getKey(getRequestParams(Store), 'hideHeaderFooter', false)),
  isMegaMenuEnabled: () => {
    return true;
  },
  hideLink: (link) => {
    if (getKey(getPageData(Store), 'props.hideLink') === link) return true;
    return false;
  },
};
