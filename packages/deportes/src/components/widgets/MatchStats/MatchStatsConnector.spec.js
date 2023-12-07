import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import Store from '@univision/fe-commons/dist/store/store';
import { cloneDeep } from '@univision/fe-commons/dist/utils/helpers';
import { fetchSportApi } from '@univision/fe-commons/dist/utils/api/fetchApi';
import setPageData, {
  setWidgetExtraData,
} from '@univision/fe-commons/dist/store/actions/page-actions';
import matchStatsExtractor from './MatchStatsExtractorOne';
import mockData from '../../../utils/mocks/lineup.json';
import MatchStatsConnector from './MatchStatsConnector';

const extraData = cloneDeep(matchStatsExtractor(mockData));
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
      },
    ],
  },
};

// Mocks
jest.mock('@univision/fe-commons/dist/utils/api/fetchApi', () => ({
  fetchSportApi: jest.fn(() => Promise.resolve(mockData)),
}));

/**
 * Create a new MatchStatsConnector connector widget
 * @param {Object} props - additional props for creation
 * @access private
 * @returns {JSX}
 */
const makeMatchStatsConnector = (props = {}) => {
  const element = (
    <Provider store={Store}>
      <MatchStatsConnector
        {...Object.assign(
          {},
          {
            settings,
          },
          extraData,
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

describe('MatchStatsConnector', () => {
  beforeEach(() => {
    Store.dispatch(setPageData(cloneDeep(pageData)));
  });

  it('should render correctly', () => {
    const wrapper = makeMatchStatsConnector();

    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('MatchStats')).toHaveLength(1);
  });

  it('should render but not update if not have settings', () => {
    const otherData = Object.assign(cloneDeep(extraData), { stats: [] });
    const wrapper = makeMatchStatsConnector({ settings: {}, ...extraData });
    const content = wrapper.text();

    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('MatchStats')).toHaveLength(1);
    dispatchExtraData(otherData);
    expect(content).toEqual(wrapper.text());
  });

  it('should update prop only with valid data', () => {
    dispatchExtraData(null);
    const otherData = Object.assign(cloneDeep(extraData), { stats: [] });
    const wrapper = makeMatchStatsConnector(otherData);
    const contentEmpty = wrapper.html();

    dispatchExtraData(extraData);
    expect(contentEmpty).not.toEqual(wrapper.html());
  });

  it('should update prop only when have diferent data', () => {
    const otherData = Object.assign(cloneDeep(extraData), { stats: [] });
    dispatchExtraData(otherData);

    const wrapper = makeMatchStatsConnector();
    const contentError = wrapper.html();

    dispatchExtraData(extraData);
    expect(contentError).not.toEqual(wrapper.html());
  });

  it('should show the error only the first time', () => {
    const error = new Error('Not found');
    dispatchExtraData(error);
    fetchSportApi.mockReturnValueOnce(Promise.reject(error));

    const wrapper = makeMatchStatsConnector({ stats: null });
    const contentError = wrapper.html();

    expect(contentError).toBeFalsy();
    dispatchExtraData(extraData);
    wrapper.update();
    expect(contentError).not.toEqual(wrapper.html());
  });
});
