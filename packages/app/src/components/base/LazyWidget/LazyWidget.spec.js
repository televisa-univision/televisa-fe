import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import * as redux from 'react-redux';

import fetchContent from '@univision/fe-commons/dist/utils/api/content/fetch';
import * as extractContentIds from '@univision/fe-commons/dist/utils/helpers/extractContentIds';
import configureStore from '@univision/fe-commons/dist/store/configureStore';

import { mockAllIsIntersecting } from '../../../../__mocks__/intersection';
import LazyWidget from '.';

const store = configureStore();
store.dispatch = () => jest.fn();

jest.mock('@univision/fe-commons/dist/utils/api/content/fetch', () => ({
  __esModule: true,
  get: jest.fn(() => Promise.resolve({ data: 'data' })),
  default: jest.fn(() => Promise.resolve({ data: 'data' })),
}));
redux.useDispatch = () => jest.fn();
global.console.error = jest.fn();

describe('LazyLoad', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render((
      <LazyWidget uri="/test" placeholder={<div id="placeholder" />}>
        {() => <div id="element" />}
      </LazyWidget>
    ), div);
  });

  it('should render the placeholder while loading the data', () => {
    const wrapper = mount(
      <LazyWidget uri="/test" placeholder={<div id="placeholder" />}>
        {() => <div id="element" />}
      </LazyWidget>,
    );

    expect(wrapper.childAt(0).find('#placeholder')).toHaveLength(1);
    expect(wrapper.find('#element')).toHaveLength(0);
  });

  it('should fetch content if user scrolled the page', async () => {
    const spy = jest.spyOn(global.window, 'removeEventListener');
    const wrapper = mount(
      <LazyWidget uri="/test" placeholder={<div id="placeholder" />}>
        {() => <div id="element" />}
      </LazyWidget>,
    );

    act(() => {
      global.window.dispatchEvent(new Event('scroll'));
      mockAllIsIntersecting(true);
      jest.runAllTimers();
    });

    wrapper.setProps({ uri: '/other' });

    wrapper.update();

    expect(fetchContent).toHaveBeenCalled();
    expect(spy).toHaveBeenCalled();
  });

  it('should load reactions if contentData available', async () => {
    const extractSpy = jest.spyOn(extractContentIds, 'default').mockImplementation(jest.fn());
    React.useState = jest.fn(() => [true, jest.fn()]);
    const dispatch = jest.spyOn(redux, 'useDispatch');

    mount(
      <LazyWidget uri="/test" placeholder={<div id="placeholder" />}>
        {() => <div id="element" />}
      </LazyWidget>,
    );

    expect(extractSpy).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalled();
  });
});
