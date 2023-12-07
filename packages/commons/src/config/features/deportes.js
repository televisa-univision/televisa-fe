import { TUDN_SITE } from '../../constants/sites';
import { requestParamsSelector, siteSelector } from '../../store/selectors/page-selectors';
import leagueUrls from '../data/tudn/leagueUrls.json';
import forceSectionNavUrls from '../data/tudn/forceSectionNavUrls.json';
import contentTypes from '../../constants/contentTypes.json';

// eslint-disable-next-line import/no-cycle
import Store from '../../store/store';

export default {
  isTudn: () => true,
  hideMatchCenterNav: state => requestParamsSelector(state)?.hideMatchCenterNav === 'true',
  showCuepoints: () => true,
  isWorldCupMVP: (state) => {
    const pageState = state || Store?.getState();
    return siteSelector(pageState) === TUDN_SITE;
  },
  useLeagueTheme: (uri, type) => leagueUrls.some(e => uri?.includes(e))
    && type === contentTypes.SECTION,
  forceSectionNav: (uri, type) => forceSectionNavUrls.some(e => uri?.includes(e))
    && type === contentTypes.SECTION,
};
