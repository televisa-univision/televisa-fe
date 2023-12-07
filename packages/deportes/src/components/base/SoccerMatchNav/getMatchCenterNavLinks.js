import { isValidObject } from '@univision/fe-commons/dist/utils/helpers';
import soccerHelper from '../../../utils/helpers/soccerHelper';
import getNavigation from './SoccerMatchNav.config';

export default (pageData = {}, status, hasLiveStream) => {
  const coverage = isValidObject(pageData) && soccerHelper.getCoverage(pageData);
  const isSpecial = coverage === 'Special';
  const liveText = hasLiveStream ? 'LiveStream' : 'Live';
  let navigationType;
  switch (status) {
    case 'postponed':
    case 'pre': {
      navigationType = isSpecial ? 'Special' : coverage;
      break;
    }
    case 'live': {
      navigationType = isSpecial ? 'SpecialLive' : `${coverage}${liveText}`;
      break;
    }
    default: {
      navigationType = isSpecial ? 'SpecialPost' : `${coverage}Post`;
    }
  }
  return getNavigation(navigationType);
};
