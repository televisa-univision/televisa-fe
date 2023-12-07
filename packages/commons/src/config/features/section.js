// eslint-disable-next-line import/no-cycle
import { getKey } from '../../utils/helpers';
// eslint-disable-next-line import/no-cycle
import { requestParamsSelector } from '../../store/selectors/page-selectors';

export default {
  refreshable: () => true,
  hardRefresh: () => true,
  // Flag to enable favorite horoscopes selector
  isFavoriteHoroscopesEnabled: state => getKey(requestParamsSelector(state), 'favoriteHoroscopesExperience') !== 'false',
};
