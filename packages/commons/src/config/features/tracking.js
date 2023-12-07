// eslint-disable-next-line import/no-cycle
import Store from '../../store/store';
// eslint-disable-next-line import/no-cycle
import {
  getConfig,
} from '../../store/storeHelpers';

export default {
  displayAdPerformance: true,
  gtm: true,
  lux: false,
  tealium: false,
  spaMonitoring: () => getConfig(Store, 'tracking.spaMonitoring') === true,
};
