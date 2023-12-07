import { exists, isValidArray, getKey } from '@univision/fe-commons/dist/utils/helpers';
import { getPageData } from '@univision/fe-commons/dist/store/storeHelpers';
import actionsMap, { pageCategoryActions as deportesPageCategoryActions } from '@univision/fe-deportes/dist/utils/helpers/actionsMap';
import localPageCategoryActions from '@univision/fe-local/dist/utils/helpers/actionsMap';
import commonsPageCategoryActions from '@univision/fe-commons/dist/store/actions/mapping/pageCategoryActions';
import coreActionsMap, { pageCategoryActions as corePageCategoryActions } from '../../../app/utils/actionsMap';

export default {
  /**
   * Helper to provide collection of actions to apply to widgets data
   * before start rendering the page
   * @param {Object} requestStore Redux store
   * @param {Object} data from cms API
   * @returns {Array}
     */
  getWidgetsActions(requestStore) {
    const data = getKey(getPageData(requestStore), 'data', {});
    const maxActionsAllowed = 3;
    const actionsPromises = [];
    const actionsMapCollection = {
      ...actionsMap,
      ...coreActionsMap,
    };
    if (isValidArray(data.widgets)) {
      let i = 0;
      let widget = {};
      const { widgets } = data;
      while (i < widgets.length && actionsPromises.length < maxActionsAllowed) {
        widget = widgets[i];
        if (widget && widget.type && actionsMapCollection[widget.type]) {
          const { action, extractor } = actionsMapCollection[widget.type];
          actionsPromises.push(requestStore.dispatch(action(widget, extractor)));
        }
        i += 1;
      }
    }
    return actionsPromises;
  },

  extendData(requestStore, pageCategory) {
    const pageData = getPageData(requestStore);
    const data = getKey(pageData, 'data', {});
    const isAmp = pageData?.isAmp ?? false;
    // if isAmp we don't want to dispatch non required actions
    if (isAmp) {
      return Promise.resolve();
    }
    const mapping = {
      ...deportesPageCategoryActions,
      ...commonsPageCategoryActions,
      ...corePageCategoryActions,
      ...localPageCategoryActions,
    };
    if (exists(mapping[pageCategory])) {
      return requestStore.dispatch(mapping[pageCategory].action(data, pageCategory));
    }

    return Promise.resolve();
  },
};
