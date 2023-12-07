// eslint-disable-next-line import/no-cycle
import Store from '../../store/store';
// eslint-disable-next-line import/no-cycle
import { isSpa } from '../../store/storeHelpers';

export default {
  // Register the service worker
  shouldRegisterSW: () => true,
  isSpa: () => isSpa(Store),
};
