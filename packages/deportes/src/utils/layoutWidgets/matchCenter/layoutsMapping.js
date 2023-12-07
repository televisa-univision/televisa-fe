import * as categories from '@univision/fe-commons/dist/constants/pageCategories';
import { getKey } from '@univision/fe-commons/dist/utils/helpers';

import ClassicPreMatch from './ClassicPreMatch';
import ClassicMidMatch from './ClassicMidMatch';
import ClassicPostMatch from './ClassicPostMatch';

import CorePreMatch from './CorePreMatch';
import CoreMidMatch from './CoreMidMatch';
import CorePostMatch from './CorePostMatch';

import PerformancePreMatch from './PerformancePreMatch';
import PerformanceMidMatch from './PerformanceMidMatch';
import PerformancePostMatch from './PerformancePostMatch';

import SpecialPreMatch from './SpecialPreMatch';
import SpecialMatch from './SpecialMatch';

import BasicPreMatch from './BasicPreMatch';
import BasicMatch from './BasicMatch';

export default {
  layouts: {
    [categories.SOCCER_MATCH_PRE]: {
      Core: CorePreMatch,
      Classic: ClassicPreMatch,
      Performance: PerformancePreMatch,
      Special: SpecialPreMatch,
      Basic: BasicPreMatch,
    },
    [categories.SOCCER_MATCH_MID]: {
      Core: CoreMidMatch,
      Classic: ClassicMidMatch,
      Performance: PerformanceMidMatch,
      Special: SpecialMatch,
      Basic: BasicMatch,
    },
    [categories.SOCCER_MATCH_POST]: {
      Core: CorePostMatch,
      Classic: ClassicPostMatch,
      Performance: PerformancePostMatch,
      Special: SpecialMatch,
      Basic: BasicMatch,
    },
  },
  get(category, coverage) {
    const defaultLayout = this.layouts[categories.SOCCER_MATCH_PRE].Basic;
    return getKey(this, ['layouts', category, coverage], defaultLayout, true);
  },
};
