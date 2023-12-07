import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';

import configureStore from '@univision/fe-commons/dist/store/configureStore';
import * as request from '@univision/fe-commons/dist/utils/api/request';
import promiseMock from '@univision/fe-commons/dist/utils/jest/helpers';
import CardTracker from '@univision/fe-commons/dist/utils/tracking/tealium/card/CardTracker';

import mockData from '../__mocks__/indexList.json';
import IndexListContent from '.';

const Store = configureStore();
const { content: contents } = mockData;

describe('IndexListContent', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllTimers();
  });

  it('should return null when no content is provided', () => {
    const wrapper = mount(
      <Provider store={Store}>
        <IndexListContent />
      </Provider>
    );
    expect(wrapper.find('div')).toHaveLength(0);
  });
  it('should render a list with contents', () => {
    const wrapper = mount(
      <Provider store={Store}>
        <IndexListContent content={contents} />
      </Provider>
    );
    expect(wrapper.find('IndexListContent__Item')).toHaveLength(contents.length);
  });
  it('should fetch more items from the API when load more button is clicked', async () => {
    const mockResolve = {
      data: {
        widget: {
          contents: contents.slice(5, 10),
        },
      },
    };
    const requestSpy = jest.spyOn(request, 'default').mockReturnValue(
      promiseMock({
        resolve: mockResolve,
      })
    );
    const spyTracker = jest.spyOn(CardTracker, 'track');
    jest.runAllTimers();
    const content = contents.slice(0, 5);
    const wrapper = mount(
      <Provider store={Store}>
        <IndexListContent content={content} />
      </Provider>
    );
    await act(async () => {
      wrapper.find('ListButton').props().onClick();
    });
    wrapper.update();
    expect(requestSpy).toHaveBeenCalled();
    expect(wrapper.find('IndexListContent__Item')).toHaveLength(
      content.length + mockResolve.data.widget.contents.length
    );
    expect(spyTracker).toHaveBeenCalledWith(
      expect.any(Function),
      'ver_mas',
      null
    );
  });
  it('should filter duplicate items from API', async () => {
    const mockResolve = {
      data: {
        widget: {
          contents: contents.slice(0, 5),
        },
      },
    };
    const requestSpy = jest.spyOn(request, 'default').mockReturnValue(
      promiseMock({
        resolve: mockResolve,
      })
    );
    jest.runAllTimers();
    const content = contents.slice(0, 5);
    const wrapper = mount(
      <Provider store={Store}>
        <IndexListContent content={content} />
      </Provider>
    );
    await act(async () => {
      wrapper.find('ListButton').props().onClick();
    });
    wrapper.update();
    expect(requestSpy).toHaveBeenCalled();
    expect(wrapper.find('IndexListContent__Item')).toHaveLength(content.length);
  });
  it('should hide load button when no more items are coming from API', async () => {
    const mockResolve = {
      data: {
        widget: {
          contents: [],
        },
      },
    };
    const requestSpy = jest.spyOn(request, 'default').mockReturnValue(
      promiseMock({
        resolve: mockResolve,
      })
    );
    jest.runAllTimers();
    const content = contents.slice(0, 5);
    const wrapper = mount(
      <Provider store={Store}>
        <IndexListContent content={content} />
      </Provider>
    );
    await act(async () => {
      wrapper.find('ListButton').props().onClick();
    });
    wrapper.update();
    expect(requestSpy).toHaveBeenCalled();
    expect(wrapper.find('IndexListContent__Item')).toHaveLength(content.length);
    expect(wrapper.find('ListButton')).toHaveLength(0);
  });
});
