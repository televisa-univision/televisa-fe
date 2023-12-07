import Store from '@univision/fe-commons/dist/store/store';
import { getPageUrl, isTudnSite } from '@univision/fe-commons/dist/store/storeHelpers';

const refreshablePages = ['/'];

export default () => {
  const pageUrl = getPageUrl(Store);
  if (pageUrl) {
    return refreshablePages.some(url => pageUrl === url) && isTudnSite(Store);
  }
  return false;
};
