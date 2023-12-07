import React from 'react';
import { mount } from 'enzyme';

import fetch from '@univision/fe-commons/dist/utils/api/content/fetch';
import features from '@univision/fe-commons/dist/config/features';
import * as storeHelpers from '@univision/fe-commons/dist/store/storeHelpers';
import * as widgetFactory from '../../../utils/factories/widgetFactory';
import * as refreshableHelper from './refreshableHelper';
import Refreshable from './Refreshable';

const firstcall = 1000 * 30;
const defaultData = { widgets: [{ type: 'a' }, { type: 'b' }, { type: 'c' }] };
const fetchedData = { widgets: [{ type: 'd' }, { type: 'e' }, { type: 'f' }] };
const defaultWidgets = [<div key="a" className="firstDefaultItem">a</div>, <div key="b">b</div>, <div key="c">c</div>];
const afterfetchingWidgets = [<div key="d" className="firstItem">d</div>, <div key="e">e</div>, <div key="f">f</div>];
// Fecth mocking
jest.mock('@univision/fe-commons/dist/utils/api/content/fetch', () => jest.fn());
fetch.mockImplementation(() => new Promise((resolve) => {
  resolve(fetchedData);
}));

// Store Mocking
storeHelpers.getPageUrl = jest.fn(() => '/');
storeHelpers.isTudnSite = jest.fn(() => true);
widgetFactory.parseWidgetsWithAds = jest.fn(() => afterfetchingWidgets);
refreshableHelper.isRefreshable = jest.fn(() => true);
features.section = {
  refreshable: jest.fn(() => true),
  hardRefresh: jest.fn(() => false),
};

describe('Refreshable component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  it('should render WidgetsListWithAds with initial widgets', () => {
    const wrapper = mount(<Refreshable widgets={defaultWidgets} />);
    expect(wrapper.find('.firstDefaultItem').length).toBe(1);
  });
  it('should set interval only if content is refreshable', () => {
    features.section.refreshable.mockReturnValueOnce(false);
    const wrapper = mount(<Refreshable widgets={defaultWidgets} />);
    expect(wrapper.instance().refreshInterval).not.toBeDefined();
  });
  it('should clear interval after unmout', () => {
    const wrapper = mount(<Refreshable widgets={defaultWidgets} />);
    const clearIntervalSpy = jest.spyOn(
      window,
      'clearInterval'
    );
    wrapper.unmount();
    expect(clearIntervalSpy).toHaveBeenCalled();
  });
  it('should display refresh button and be able to click on it if change on API data', (done) => {
    const fetchWithClick = jest.spyOn(Refreshable.prototype, 'fetchWithClick');
    const wrapper = mount(<Refreshable widgets={defaultWidgets} />);
    wrapper.instance().currentData = {
      widgets: [{ uid: 1 }],
    };
    jest.advanceTimersByTime(firstcall);
    process.nextTick(() => {
      try {
        wrapper.update();
        const RefreshButtonWrapper = wrapper.find('RefreshButton');
        expect(RefreshButtonWrapper).toHaveLength(1);
        // Checking click event
        RefreshButtonWrapper.simulate('click');
        expect(fetchWithClick).toHaveBeenCalled();
        // Check use of place holder
        wrapper.update();
        expect(wrapper.find('OpeningPlaceholder')).toHaveLength(3);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('should no fetch if refresh button is alredy visible', () => {
    const fetchDataSpy = jest.spyOn(Refreshable.prototype, 'fetchData');
    const wrapper = mount(<Refreshable widgets={defaultWidgets} />);
    const setParticularStateSpy = jest.spyOn(wrapper.instance(), 'setParticularState');
    wrapper.setState({ displayButton: true });
    jest.advanceTimersByTime(firstcall);
    expect(fetchDataSpy).toHaveBeenCalled();
    expect(setParticularStateSpy).not.toHaveBeenCalled();
  });
  it('should refresh the page if hard refresh enabled', () => {
    const wrapper = mount(<Refreshable widgets={defaultWidgets} />);
    features.section.hardRefresh.mockReturnValueOnce(true);
    delete window.location;
    window.location = {
      reload: jest.fn(),
    };
    wrapper.instance().fetchWithClick();
    expect(features.section.hardRefresh).toHaveBeenCalled();
  });
  it('should display widgets if fetch error', () => {
    const wrapper = mount(<Refreshable widgets={defaultWidgets} />);
    fetch.mockReturnValueOnce(Promise.reject(new Error('something bad happened')));
    jest.advanceTimersByTime(firstcall);
    expect(wrapper.instance().state.displayButton).toBeFalsy();
    expect(wrapper.instance().state.displayWidgets).toBeTruthy();
  });
  it('should keep the button hidden if fetched data is the same', () => {
    const wrapper = mount(<Refreshable widgets={defaultWidgets} />);
    wrapper.instance().currentData = defaultData;
    wrapper.instance().afterFetchingData(false, defaultData);
    expect(wrapper.instance().state.displayButton).toBeFalsy();
  });
  it('should update component state when prop change', () => {
    const wrapper = mount(<Refreshable widgets={defaultWidgets} />);
    wrapper.setProps({ widgets: afterfetchingWidgets });
    expect(wrapper.instance().state.widgets).toEqual(afterfetchingWidgets);
  });
});
