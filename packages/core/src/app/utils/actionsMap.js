import * as categories from '@univision/fe-commons/dist/constants/pageCategories';
import { addWidgets } from '@univision/fe-commons/dist/store/actions/page-actions';
import { getSearchResults } from '@univision/fe-commons/dist/store/actions/search/search-actions';
import { SEARCH_WIDGET_BODY, JOB_SEARCH } from '@univision/fe-commons/dist/constants/widgetTypes';
import * as fetchJobsActions from '@univision/fe-commons/dist/store/slices/local/jobSearchSlice';
import searchActionDefinition from '../components/pages/Search/config/searchActionDefinitions';
import searchWidget from './layoutWidgets/searchWidgets';
/**
 * Mapping data actions and widgets
 */
export default {
  [SEARCH_WIDGET_BODY]: {
    action: () => getSearchResults(searchActionDefinition.fetchResults),
    extractor: searchActionDefinition.extractor,
  },
  [JOB_SEARCH]: {
    action: fetchJobsActions.fetchJobs,
  },
};

/**
 * Mapping page category and widgets list
 */
export const pageCategoryActions = {
  [categories.SEARCH]: {
    action: data => addWidgets(searchWidget(data)),
  },
};
