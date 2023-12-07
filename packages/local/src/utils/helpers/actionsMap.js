import * as categories from '@univision/fe-commons/dist/constants/pageCategories';
import { fetchWeatherData } from '@univision/fe-commons/dist/store/actions/local/local-actions';

/**
 * Mapping page category and widgets list
 */
const pageCategoryActions = {
  [categories.TV]: {
    action: fetchWeatherData,
  },
};

export default pageCategoryActions;
