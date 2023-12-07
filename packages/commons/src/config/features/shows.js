// eslint-disable-next-line import/no-cycle
import Store from '../../store/store';
import { CONECTA, SPORTS_SHOWS } from '../../constants/pageCategories';
// eslint-disable-next-line import/no-cycle
import {
  isPrimaryTagEnabled,
  isContentTypeAllowed,
  isUnivisionSite,
  isShowPage,
  getPageData,
  getPageCategory,
} from '../../store/storeHelpers';
import shortformTags from '../data/shows/shortformTags.json';
import defaultTab from '../data/shows/defaultTab.json';
// eslint-disable-next-line import/no-cycle
import { getKey, hasKey } from '../../utils/helpers';

export default {
  isShortform: () => isPrimaryTagEnabled(Store, shortformTags),

  hideBreadcrumb: () => {
    const pageData = getPageData(Store);
    const primaryTag = getKey(pageData, 'data.primaryTag.name');
    const isMainTab = (defaultTab[primaryTag] || 0) === 0;
    return isContentTypeAllowed(Store, ['video']) && isMainTab;
  },

  hideTagLabel: () => hasKey(getPageData(Store), 'data.show'),

  showsRedesign: () => {
    const category = getPageCategory(Store);
    return (
      isUnivisionSite(Store)
      && (isShowPage(Store) || category === CONECTA)
      || category === SPORTS_SHOWS
    );
  },
};
