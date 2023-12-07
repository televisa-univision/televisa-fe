import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from '../../store/configureStore';
import fetchContent from '../../utils/api/content/fetch';
import * as extractContentIds from '../../utils/helpers/extractContentIds';

import modes from './modes.json';
import LazyLoad from '.';

const store = configureStore();
store.dispatch = () => jest.fn();
jest.mock('../../utils/api/content/fetch', () => jest.fn());
jest.mock('../../store/slices/reactions/reactions-slice', () => {
  return {
    fetchReactions: jest.fn(),
  };
});

describe('LazyLoad', () => {
  beforeEach(() => {
    fetchContent.mockReset();
  });

  it('should render the placeholder while loading the data', () => {
    const wrapper = shallow((
      <LazyLoad uri="/test" placeholder={<div id="placeholder" />}>
        {() => <div id="element" />}
      </LazyLoad>
    ));

    expect(wrapper.find('#placeholder')).toHaveLength(1);
    expect(wrapper.find('#element')).toHaveLength(0);
    expect(fetchContent).not.toHaveBeenCalled();
  });

  it('should render the element when the data is loaded', async () => {
    const wrapper = shallow((
      <LazyLoad uri="/test" placeholder={<div id="placeholder" />}>
        {() => <div id="element" />}
      </LazyLoad>
    ));
    wrapper.instance().onVisible(true);
    await wrapper.instance().load();
    wrapper.update();
    expect(wrapper.find('#element')).toHaveLength(1);
    expect(wrapper.find('#placeholder')).toHaveLength(0);
    expect(fetchContent).toHaveBeenCalled();
  });

  it('should load the data when mounted if eager mode is enabled', () => {
    const wrapper = shallow((
      <LazyLoad uri="/test" placeholder={<div id="placeholder" />} fetchMode={modes.eager}>
        {() => <div id="element" />}
      </LazyLoad>
    ));
    wrapper.instance().componentDidMount();
    expect(fetchContent).toHaveBeenCalled();
  });

  it('should not load the data if not visible', () => {
    const wrapper = shallow((
      <LazyLoad uri="/test" placeholder={<div id="placeholder" />}>
        {() => <div id="element" />}
      </LazyLoad>
    ));
    wrapper.instance().onVisible(false);
    wrapper.update();
    expect(wrapper.find('#element')).toHaveLength(0);
    expect(wrapper.find('#placeholder')).toHaveLength(1);
    expect(fetchContent).not.toHaveBeenCalled();
  });

  it('should load the data just once time', async () => {
    const extractSpy = jest.spyOn(extractContentIds, 'default').mockImplementation(jest.fn());
    const dispatchSpy = jest.spyOn(store, 'dispatch').mockImplementation(jest.fn());
    const wrapper = mount((
      <Provider store={store}>
        <LazyLoad uri="/test" placeholder={<div id="placeholder" />}>
          {() => <div id="element" />}
        </LazyLoad>
      </Provider>
    ));
    await wrapper.find(LazyLoad).instance().load();
    wrapper.find(LazyLoad).instance().onVisible(true);
    wrapper.find(LazyLoad).instance().onVisible(true);
    wrapper.find(LazyLoad).instance().onVisible(true);
    expect(fetchContent).toHaveBeenCalledTimes(1);
    expect(extractSpy).toHaveBeenCalled();
    expect(dispatchSpy).toHaveBeenCalled();
  });

  it('should dispatch the fetch reactions action', async () => {
    const extractSpy = jest.spyOn(extractContentIds, 'default').mockImplementation(jest.fn());
    const dispatchSpy = jest.spyOn(store, 'dispatch').mockImplementation(jest.fn());
    const wrapper = mount((
      <Provider store={store}>
        <LazyLoad
          uri="/test"
          placeholder={<div id="placeholder" />}
        >
          {() => <div id="element" />}
        </LazyLoad>
      </Provider>
    ));
    await wrapper.find(LazyLoad).instance().load();
    expect(extractSpy).toHaveBeenCalled();
    expect(dispatchSpy).toHaveBeenCalled();
  });
});
