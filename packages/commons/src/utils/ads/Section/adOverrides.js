import * as pageCategory from '../../../constants/pageCategories';
import * as AdTypes from '../ad-types';

export default {
  [pageCategory.UFORIA_HANGOUT]: [
    {
      position: 2,
      type: {
        mobile: AdTypes.TOP_AD,
        tablet: AdTypes.TOP_AD,
        desktop: AdTypes.TOP_AD,
      },
    },
    {
      position: 4,
      type: {
        mobile: AdTypes.TOP_AD,
        tablet: AdTypes.TOP_AD,
        desktop: AdTypes.TOP_AD,
      },
    },
  ],
};
