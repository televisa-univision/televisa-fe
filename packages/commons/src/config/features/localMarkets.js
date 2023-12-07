// eslint-disable-next-line import/no-cycle
import Store from '../../store/store';
// eslint-disable-next-line import/no-cycle
import { getRequestParams, getBrandable } from '../../store/storeHelpers';
// eslint-disable-next-line import/no-cycle
import { getKey, toRelativeUrl } from '../../utils/helpers';
import vigilantesDelTiempoUri from '../data/local/vigilantesDelTiempoUri.json';
import primeraAlertaUri from '../data/local/primeraAlertaUri.json';
import guardianesDelTiempoUri from '../data/local/guardianesDelTiempoUri.json';

// Local markets using the rebranding
const rebranding = {
  '/local/miami-wltv': true,
  '/local/san-francisco-kdtv': true,
  '/local/los-angeles-kmex': true,
  '/local/houston-kxln': true,
  '/local/nueva-york-wxtv': true,
  '/local/dallas-kuvn': true,
  '/local/chicago-wgbo': true,
  '/local/atlanta-wuvg': true,
  '/local/philadelphia-wuvp': true,
  '/local/north-carolina-wuvc': true,
  '/local/fresno-kftv': true,
  '/local/sacramento-kuvs': true,
  '/local/arizona-ktvw': true,
  '/local/austin-kakw': true,
  '/local/san-antonio-kwex': true,
  '/local/puerto-rico-wlii': true,
};

export default {
  shouldUseRebranding: () => {
    const brandableUri = toRelativeUrl(getKey(getBrandable(Store), 'tvStation.uri'));
    if (!brandableUri) {
      return false;
    }
    if (getRequestParams(Store).rebranding === 'true') {
      return getKey(rebranding, brandableUri) !== undefined;
    }
    return getKey(rebranding, brandableUri, false);
  },
  shouldUseVigilantesDelTiempo: () => {
    const currentUri = toRelativeUrl(getKey(getBrandable(Store), 'tvStation.uri'));
    return vigilantesDelTiempoUri.includes(currentUri);
  },
  shouldUsePrimeraAlerta: () => {
    const currentUri = toRelativeUrl(getKey(getBrandable(Store), 'tvStation.uri'));
    return primeraAlertaUri.includes(currentUri);
  },
  shouldUseGuardianesDelTiempo: () => {
    const currentUri = toRelativeUrl(getKey(getBrandable(Store), 'tvStation.uri'));
    return guardianesDelTiempoUri.includes(currentUri);
  },
  forceMarketJobs: () => (getKey(getRequestParams(Store), 'forceMarketJobs', false)),
  forceAskExperts: () => (getKey(getRequestParams(Store), 'forceAskExperts', false)),
};
