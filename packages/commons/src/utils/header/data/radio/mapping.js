import * as pageCategories from '../../../../constants/pageCategories';

import radio from '.';
import radioNacional from './radioNacional';

export default {
  [pageCategories.MUSIC]: radio,
  [pageCategories.PODCAST]: radio,
  [pageCategories.RADIO]: radio,
  [pageCategories.RADIO_NACIONAL]: radioNacional,
};
