import { requestParamsSelector } from '../../store/selectors/page-selectors';

// eslint-disable-next-line import/no-cycle
import Store from '../../store/store';

export default {
  liveBlogPerformance: (state) => {
    const pageState = state || Store?.getState();

    return requestParamsSelector(pageState)?.liveBlogPerformance === 'true';
  },
};
