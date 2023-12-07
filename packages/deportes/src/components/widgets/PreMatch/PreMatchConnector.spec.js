import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import Store from '@univision/fe-commons/dist/store/store';
import { cloneDeep } from '@univision/fe-commons/dist/utils/helpers';
import setPageData, {
  setWidgetExtraData,
} from '@univision/fe-commons/dist/store/actions/page-actions';
import preMatchExtractor from '@univision/shared-components/dist/extractors/preMatchExtractor';
import mockData from '../../../utils/mocks/prematch.json';
import PreMatchConnector from './PreMatchConnector';

const extraData = cloneDeep(preMatchExtractor(mockData));
const settings = {
  uid: 1,
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
 * Create a new PreMatchConnector connector widget
 * @param {Object} props - additional props for creation
 * @access private
 * @returns {JSX}
 */
const makePreMatchConnector = (props = {}) => {
  const element = (
    <Provider store={Store}>
      <PreMatchConnector
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

describe('PreMatchConnector', () => {
  beforeEach(() => {
    Store.dispatch(setPageData(cloneDeep(pageData)));
  });

  it('should render correctly', () => {
    const wrapper = makePreMatchConnector();

    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('PreMatch')).toHaveLength(1);
  });

  it('should render but not update if not have settings', () => {
    const otherData = cloneDeep(extraData);
    const wrapper = makePreMatchConnector({ settings: {} });
    const content = wrapper.text();

    otherData.previousEncounters.splice(0, 1);
    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('PreMatch')).toHaveLength(1);
    dispatchExtraData(otherData);
    expect(content).toEqual(wrapper.text());
  });

  it('should update prop only with valid data', () => {
    dispatchExtraData(null);
    const otherData = Object.assign(cloneDeep(extraData), { previousEncounters: [] });
    const wrapper = makePreMatchConnector(otherData);
    const contentEmpty = wrapper.text();

    dispatchExtraData(extraData);
    expect(contentEmpty).toEqual(wrapper.text());
  });

  it('should update prop only when have diferent data', () => {
    const otherData = Object.assign(cloneDeep(extraData), { previousEncounters: [] });
    dispatchExtraData(otherData);

    const wrapper = makePreMatchConnector({ data: otherData });
    const contentError = wrapper.text();

    dispatchExtraData(extraData);
    expect(contentError).not.toEqual(wrapper.text());
  });

  it('should not show the error by default', () => {
    const error = new Error('Not found');
    dispatchExtraData({ error });

    const wrapper = makePreMatchConnector();
    const contentError = wrapper.html();

    dispatchExtraData(extraData);
    expect(contentError).toEqual(wrapper.html());
  });
});
