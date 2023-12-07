import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import Store from '@univision/fe-commons/dist/store/store';
import { fetchSportApi } from '@univision/fe-commons/dist/utils/api/fetchApi';
import setPageData, {
  setWidgetExtraData
} from '@univision/fe-commons/dist/store/actions/page-actions';
import * as widgetTypes from '@univision/fe-commons/dist/constants/widgetTypes';
import playByPlayExtractor from '@univision/shared-components/dist/extractors/playByPlayExtractor';
import mockData from '../../../utils/mocks/playbyplay.json';
import PlayByPlayConnector from './PlayByPlayConnector';

const extraData = {
  events: playByPlayExtractor(mockData),
  eventStatus: 'mid-event'
};
const settings = {
  uid: 1,
  matchId: '919268'
};
const pageData = {
  data: {
    widgets: [
      {
        settings,
        extraData,
        type: widgetTypes.DEPORTES_CARD_PLAY_BY_PLAY
      }
    ]
  }
};

// Mocks
jest.mock('@univision/fe-commons/dist/utils/api/fetchApi', () => ({
  fetchSportApi: jest.fn(() => Promise.resolve(mockData))
}));

/**
 * Create a new PlayByPlayConnector connector widget
 * @param {Object} props - additional props for creation
 * @access private
 * @returns {JSX}
 */
const makePlayByPlayConnector = (props = {}) => {
  const element = (
    <Provider store={Store}>
      <PlayByPlayConnector
        {...Object.assign(
          {},
          {
            settings,
            events: extraData.events,
            activeGame: true
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
  Store.dispatch(setWidgetExtraData(settings.uid, data));
};

describe('PlayByPlayConnector', () => {
  beforeEach(() => {
    Store.dispatch(setPageData(pageData));
  });

  it('should render correctly', () => {
    const wrapper = makePlayByPlayConnector();

    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('PlayByPlay')).toHaveLength(1);
  });

  it('should update prop only with valid data', () => {
    dispatchExtraData({ events: null });

    const wrapper = makePlayByPlayConnector();
    const contentError = wrapper.html();

    expect(contentError).toBeFalsy();
    dispatchExtraData(extraData);
    wrapper.update();
    expect(contentError).not.toEqual(wrapper.html());
  });

  it('should update prop only when have diferent data', () => {
    dispatchExtraData({ events: [], eventStatus: 'post-event' });

    const wrapper = makePlayByPlayConnector();
    const contentError = wrapper.html();

    expect(contentError).toBeFalsy();
    dispatchExtraData(extraData);
    wrapper.update();
    expect(contentError).not.toEqual(wrapper.html());
  });

  it('should show the error only the first time', () => {
    const error = new Error('Not found');
    dispatchExtraData(error);
    fetchSportApi.mockReturnValueOnce(Promise.reject(error));

    const wrapper = makePlayByPlayConnector();
    const contentError = wrapper.html();

    expect(contentError).toBeFalsy();
    dispatchExtraData(extraData);
    wrapper.update();
    expect(contentError).not.toEqual(wrapper.html());
  });
});
