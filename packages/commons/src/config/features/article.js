// eslint-disable-next-line import/no-cycle
import Store from '../../store/store';
// eslint-disable-next-line import/no-cycle
import { isInfiniteScrollingEnabled } from '../../store/storeHelpers';

export default {
  // Tags to enable Taboola articles
  isTaboolaDisabled: () => {
    const { page } = Store?.getState();
    return page?.data?.adSettings?.disableTaboolaAds;
  },
  // Tags to enable infinite scrolling
  infiniteScrolling: () => isInfiniteScrollingEnabled(Store),
  // Infinite scrolling length
  contentsListLimit: 5,
};
