import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from '@univision/fe-commons/dist/store/configureStore';
import { cloneDeep } from '@univision/fe-commons/dist/utils/helpers';
import { fetchSportApi } from '@univision/fe-commons/dist/utils/api/fetchApi';
import setPageData, {
  setWidgetExtraData,
} from '@univision/fe-commons/dist/store/actions/page-actions';
import * as widgetTypes from '@univision/fe-commons/dist/constants/widgetTypes';
import matchCenterExtractor from '@univision/shared-components/dist/extractors/matchCenterExtractor';
import mockMatch from '../../../utils/mocks/match.json';
import MatchCenterOpeningConnector from './MatchCenterOpeningConnector';

const store = configureStore();
const extraData = matchCenterExtractor(mockMatch);
const settings = {
  uid: 1,
  matchId: 919268,
};
const pageData = {
  data: {
    widgets: [
      {
        settings,
        extraData,
        type: widgetTypes.DEPORTES_GRID_SOCCER_MATCH_OPENING,
      },
    ],
  },
};

// Mocks
jest.mock('@univision/fe-commons/dist/utils/api/fetchApi', () => ({
  fetchSportApi: jest.fn(() => Promise.resolve(mockMatch)),
}));

/**
 * Create a new MatchCenterOpening connector widget
 * @param {Object} props - additional props for creation
 * @access private
 * @returns {JSX}
 */
const makeMatchCenterOpening = (props = {}) => {
  const element = (
    <Provider store={store}>
      <MatchCenterOpeningConnector
        {...Object.assign(
          {},
          {
            settings,
          },
          props
        )}
      />
    </Provider>
  );
  return mount(element);
};

/**
 * Dispatch store action to set widget extra data
 * @param {*} [data] - the additional widget data
 * @access private
 */
const dispatchExtraData = (data = extraData) => {
  store.dispatch(setWidgetExtraData(settings.uid, data));
};

describe('MatchCenterOpeningConnector', () => {
  beforeEach(() => {
    store.dispatch(setPageData(cloneDeep(pageData)));
  });

  it('should render correctly', () => {
    const wrapper = makeMatchCenterOpening();

    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('MatchCenterOpening')).toHaveLength(1);
  });

  it('should update prop only with valid data', () => {
    dispatchExtraData(null);

    const wrapper = makeMatchCenterOpening();
    const contentError = wrapper.text();

    dispatchExtraData(extraData);
    expect(contentError).not.toEqual(wrapper.text());
  });

  it('should update prop only when have diferent data', () => {
    dispatchExtraData({ status: 'pre' });

    const wrapper = makeMatchCenterOpening();
    const contentError = wrapper.text();

    dispatchExtraData(extraData);
    expect(contentError).not.toEqual(wrapper.text());
  });

  it('should show the error only the first time', () => {
    const error = new Error('Not found');
    dispatchExtraData(error);
    fetchSportApi.mockReturnValueOnce(Promise.reject(error));

    const wrapper = makeMatchCenterOpening();
    const contentError = wrapper.text();

    dispatchExtraData(extraData);
    expect(contentError).not.toEqual(wrapper.text());
  });
});
