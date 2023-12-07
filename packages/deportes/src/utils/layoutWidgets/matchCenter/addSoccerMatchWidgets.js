import { getKey, isValidFunction } from '@univision/fe-commons/dist/utils/helpers';
import soccerHelper from '../../helpers/soccerHelper';

import layoutsMapping from './layoutsMapping';

export default (data, category) => {
  let widgets = [];
  if (getKey(data, 'soccerMatchStatus')) {
    const coverage = soccerHelper.getCoverage(data);
    const getWidgets = layoutsMapping.get(category, coverage);
    if (isValidFunction(getWidgets)) {
      widgets = getWidgets(data);
    }
  }
  return widgets;
};
