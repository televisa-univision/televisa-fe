import { TELEVISA_SITE } from '../../constants/sites';

// eslint-disable-next-line import/no-cycle
import Store from '../../store/store';

export default {
  isTelevisaSite: (state) => {
    const pageState = state || Store?.getState();
    const { page: { parentSite = '' } = {} } = pageState;
    return parentSite === TELEVISA_SITE;
  },
};
