import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import Store from '@univision/fe-commons/dist/store/store';
import { cloneDeep } from '@univision/fe-commons/dist/utils/helpers';
import { fetchSportApi } from '@univision/fe-commons/dist/utils/api/fetchApi';
import setPageData, {
  setWidgetExtraData,
} from '@univision/fe-commons/dist/store/actions/page-actions';
import * as widgetTypes from '@univision/fe-commons/dist/constants/widgetTypes';
import matchSummaryExtractor from '@univision/shared-components/dist/extractors/summaryMatchExtractor';
import mockData from '../../../utils/mocks/lineup.json';
import MatchSummaryConnector from './MatchSummaryConnector';

const extraData = matchSummaryExtractor(mockData);
const settings = {
  uid: 1,
  matchId: '919268',
};
const pageData = {
  data: {
    widgets: [
      {
        settings,
        extraData,
        type: widgetTypes.DEPORTES_MATCH_SUMMARY,
      },
    ],
  },
};

// Mocks
jest.mock('@univision/fe-commons/dist/utils/api/fetchApi', () => ({
  fetchSportApi: jest.fn(() => Promise.resolve(mockData)),
}));

/**
 * Create a new MatchSummaryConnector connector widget
 * @param {Object} props - additional props for creation
 * @access private
 * @returns {JSX}
 */
const makeMatchSummaryConnector = (props = {}) => {
  const element = (
    <Provider store={Store}>
      <MatchSummaryConnector
        {...Object.assign(
          {},
          {
            settings,
            data: extraData,
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

describe('MatchSummaryConnector', () => {
  beforeEach(() => {
    Store.dispatch(setPageData(cloneDeep(pageData)));
  });

  it('should render correctly', () => {
    const wrapper = makeMatchSummaryConnector();

    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('MatchSummary')).toHaveLength(1);
  });

  it('should render but not update if not have settings', () => {
    const wrapper = makeMatchSummaryConnector({ settings: {}, data: extraData });
    const content = wrapper.html();

    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('MatchSummary')).toHaveLength(1);
    dispatchExtraData(Object.assign({}, extraData, { elapsedTime: '90' }));
    expect(content).toEqual(wrapper.html());
  });

  it('should update prop only with valid data', () => {
    dispatchExtraData(null);

    const wrapper = makeMatchSummaryConnector();
    const contentEmpty = wrapper.html();

    expect(contentEmpty).toBeFalsy();
    dispatchExtraData(extraData);
    wrapper.update();
    expect(contentEmpty).not.toEqual(wrapper.html());
  });

  it('should update prop only when have different data', () => {
    dispatchExtraData(Object.assign({}, extraData, { timelineData: [{}], homeData: [] }));

    const wrapper = makeMatchSummaryConnector();
    const contentError = wrapper.text();
    dispatchExtraData(extraData);
    expect(contentError).not.toEqual(wrapper.text());
  });

  it('should show the error only the first time', () => {
    const error = new Error('Not found');
    dispatchExtraData(error);
    fetchSportApi.mockReturnValueOnce(Promise.reject(error));

    const wrapper = makeMatchSummaryConnector();
    const contentError = wrapper.html();

    expect(contentError).toBeFalsy();
    dispatchExtraData(extraData);
    wrapper.update();
    expect(contentError).not.toEqual(wrapper.html());
  });
});
