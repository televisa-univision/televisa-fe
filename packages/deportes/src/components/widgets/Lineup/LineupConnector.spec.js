import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import Store from '@univision/fe-commons/dist/store/store';
import { cloneDeep } from '@univision/fe-commons/dist/utils/helpers';
import { fetchSportApi } from '@univision/fe-commons/dist/utils/api/fetchApi';
import setPageData, {
  setWidgetExtraData
} from '@univision/fe-commons/dist/store/actions/page-actions';
import lineupExtractor from '@univision/shared-components/dist/extractors/lineupExtractor';
import mockData from '../../../utils/mocks/lineup.json';
import LineupConnector from './LineupConnector';

const extraData = cloneDeep(lineupExtractor(mockData));
const settings = {
  uid: 1,
  soccerMatchStatus: 'LIVE'
};
const pageData = {
  data: {
    widgets: [
      {
        settings,
        extraData
      }
    ]
  }
};

// Mocks
jest.mock('@univision/fe-commons/dist/utils/api/fetchApi', () => ({
  fetchSportApi: jest.fn(() => Promise.resolve(mockData))
}));

/**
 * Create a new LineupConnector connector widget
 * @param {Object} props - additional props for creation
 * @access private
 * @returns {JSX}
 */
const makeLineupConnector = (props = {}) => {
  const element = (
    <Provider store={Store}>
      <LineupConnector
        {...Object.assign(
          {},
          {
            settings,
            data: extraData
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

describe('LineupConnector', () => {
  beforeEach(() => {
    Store.dispatch(setPageData(cloneDeep(pageData)));
  });

  it('should render correctly', () => {
    const wrapper = makeLineupConnector();

    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('Lineup')).toHaveLength(1);
  });

  it('should render but not update if not have settings', () => {
    const otherData = cloneDeep(extraData);
    const wrapper = makeLineupConnector({ settings: {}, data: extraData });
    const content = wrapper.text();

    otherData.subs.splice(0, 2);
    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('Lineup')).toHaveLength(1);
    dispatchExtraData(otherData);
    expect(content).toEqual(wrapper.text());
  });

  it('should update prop only with valid data', () => {
    dispatchExtraData(null);
    const otherData = Object.assign(cloneDeep(extraData), { subs: [] });
    const wrapper = makeLineupConnector(otherData);
    const contentEmpty = wrapper.text();

    dispatchExtraData(extraData);
    expect(contentEmpty).toEqual(wrapper.text());
  });

  it('should update prop only when have diferent data', () => {
    const otherData = Object.assign(cloneDeep(extraData), { subs: [] });
    dispatchExtraData(otherData);

    const wrapper = makeLineupConnector({ data: otherData });
    const contentError = wrapper.text();

    dispatchExtraData(extraData);
    expect(contentError).not.toEqual(wrapper.text());
  });

  it('should show the error only the first time', () => {
    const error = new Error('Not found');
    dispatchExtraData(error);
    fetchSportApi.mockReturnValueOnce(Promise.reject(error));

    const wrapper = makeLineupConnector();
    const contentError = wrapper.text();

    dispatchExtraData(extraData);
    expect(contentError).toEqual(wrapper.text());
  });
});
