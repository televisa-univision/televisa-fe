import * as pageCategories from '../../constants/pageCategories';

import localLivestreams from './livestreams';
import locales from '.';

export default {
  [pageCategories.LOCAL_LIVESTREAM]: localLivestreams,
  [pageCategories.TV]: locales,
};
