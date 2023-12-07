import React from 'react';
import { mount } from 'enzyme';

import Store from '@univision/fe-commons/dist/store/store';
import { Provider } from 'react-redux';
import * as storeHelpers from '@univision/fe-commons/dist/store/storeHelpers';
import * as adSelector from '@univision/fe-commons/dist/store/selectors/ads-selectors';
import * as AdActions from '@univision/fe-commons/dist/store/actions/ads-actions';
import * as adSettingsSelector from '@univision/fe-commons/dist/store/selectors/page-selectors';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';

import SectionAd from '.';

jest.mock('react-lazyload', () => jest.fn(props => <div>{props.children}</div>));
Store.dispatch(setPageData({ data: { uri: 'http://www.univision.com/' } }));

const props = {
  settings: {
    slotId: 0,
  },
  widgetContext: { id: 'test' },
};
const secondSlotProps = {
  settings: {
    slotId: 1,
  },
};
describe('SectionAd spec', () => {
  let isTopAdInsertedSpy;
  let topAdInsertedFromSpy;

  beforeAll(() => {
    jest.resetModules();
    storeHelpers.getTopAdInsertedFrom = jest.fn();
    storeHelpers.isTopAdInserted = jest.fn();
    storeHelpers.getPageUrl = jest.fn();
    isTopAdInsertedSpy = jest.spyOn(adSelector, 'isTopAdOnListInsertedSelector');
    topAdInsertedFromSpy = jest.spyOn(adSelector, 'topAdInsertedFromSelector');
    jest.spyOn(adSettingsSelector, 'adSettingsSelector');
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should render without crashing', () => {
    isTopAdInsertedSpy.mockReturnValue(false);
    topAdInsertedFromSpy.mockReturnValue(null);
    const wrapper = mount(
      <Provider store={Store}>
        <SectionAd {...props} />
      </Provider>
    );
    expect(wrapper.find('[position="TOP"]')).toHaveLength(1);
  });

  it('should render a top ad by default', () => {
    isTopAdInsertedSpy.mockReturnValue(false);
    topAdInsertedFromSpy.mockReturnValue(null);
    const wrapper = mount(
      <Provider store={Store}>
        <SectionAd {...props} />
      </Provider>
    );
    expect(wrapper.find('[position="TOP"]')).toHaveLength(1);
  });

  it('should render when slotId is 0 and top ad was inserted', () => {
    isTopAdInsertedSpy.mockReturnValue(true);
    topAdInsertedFromSpy.mockReturnValue('SectionAd');
    const wrapper = mount(
      <Provider store={Store}>
        <SectionAd {...props} />
      </Provider>
    );
    expect(wrapper.find('[position="MID"]')).toHaveLength(1);
  });

  it('should not render when slotId is 1 and top ad was not inserted from section ad', () => {
    isTopAdInsertedSpy.mockReturnValue(true);
    topAdInsertedFromSpy.mockReturnValue('SomeOtherPlace');
    const wrapper = mount(
      <Provider store={Store}>
        <SectionAd {...secondSlotProps} />
      </Provider>
    );
    expect(wrapper.find('[position="MID"]')).toHaveLength(1);
  });

  it('should render a mid ad when a top ad has been inserted', () => {
    isTopAdInsertedSpy.mockReturnValue(true);
    topAdInsertedFromSpy.mockReturnValue('SectionAd');
    const wrapper = mount(
      <Provider store={Store}>
        <SectionAd {...props} />
      </Provider>
    );
    expect(wrapper.find('[position="MID"]')).toHaveLength(1);
  });

  it('should dispatch removeTopAd on unmount', () => {
    const removeTopAdSpy = jest.spyOn(AdActions, 'removeTopAd');
    const wrapper = mount(
      <Provider store={Store}>
        <SectionAd {...props} />
      </Provider>
    );
    wrapper.unmount();
    expect(removeTopAdSpy).toBeCalled();
  });
});
