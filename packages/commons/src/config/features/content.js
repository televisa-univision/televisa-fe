import getKey from '@univision/fe-utilities/helpers/object/getKey';
import { requestParamsSelector } from '../../store/selectors/page-selectors';
// eslint-disable-next-line import/no-cycle
import Store from '../../store/store';

export default {
  // Flag to enable anon user creation for personalization
  isAnonUserCreationEnabled: state => getKey(requestParamsSelector(state), 'anonUser') !== 'false',
  // Flag to disable ads in sensitive pages
  isSensitive: pageData => getKey(pageData, 'data.isSensitive', false),
  // Lazy load web-api data when supported (widgets, enhancements, etc)
  serverSideLazyLoading: true,
  isSpaEnabled: () => true,
  hasCarouselEnhancement: state => requestParamsSelector(state)?.showCarouselEnhancement === 'true',
  hasEnhancement: (state) => {
    const pageState = state || Store?.getState();
    const disableEnhancement = requestParamsSelector(pageState)?.disableEnhancement;
    if (typeof disableEnhancement !== 'undefined') {
      return false;
    }
    return true;
  },
  hasTagPages: (state) => {
    const pageState = state || Store?.getState();
    const disableTagPages = requestParamsSelector(pageState)?.disableTagPages;

    if (typeof disableTagPages !== 'undefined') {
      return false;
    }
    return true;
  },
  isQuickApplyActive: () => {
    return true;
  },
};
