import React from 'react';
import { shallow, mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';

import VideoPlayer from '@univision/fe-video/dist/components/VideoPlayer';
import * as videoHelpers from '@univision/fe-commons/dist/utils/video';
import configureStore from '@univision/fe-commons/dist/store/configureStore';

import LiveStreamPage, { VLL_REFETCH_INTERVAL, REFETCH_INTERVAL } from '.';
import liveStreamData from '../../../../__mocks__/liveStreamData';

const store = configureStore();

jest.useFakeTimers();

describe('LiveStreamPage', () => {
  it('should render a TudnMvpdWrapper', () => {
    const wrapper = shallow(<LiveStreamPage pageData={liveStreamData} />);
    expect(wrapper.find('TudnMvpdWrapper')).toHaveLength(1);
    expect(wrapper.find(VideoPlayer)).toHaveLength(1);
  });

  it('should call LiveStream as a function', () => {
    const wrapper = mount(
      <Provider store={store}>
        <LiveStreamPage pageData={liveStreamData} />
      </Provider>,
    );
    expect(wrapper.find('.LiveStreamMock')).toHaveLength(1);
  });

  it('should render Video if empty params', () => {
    const wrapper = shallow(<LiveStreamPage pageData={null} />);
    expect(wrapper.find(VideoPlayer)).toHaveLength(1);
  });

  it('should release FMG event when unmount', () => {
    global.FMG = {
      on: (_, fn, id) => fn([id]),
      off: jest.fn(),
      removeInstance: jest.fn(),
    };
    const wrapper = mount(
      <Provider store={store}>
        <LiveStreamPage pageData={liveStreamData} />
      </Provider>,
    );
    wrapper.unmount();
    expect(global.FMG.off).toBeCalledTimes(1);
  });

  it('should render for digital channel', () => {
    liveStreamData.streamId = 'univision-tudn';
    global.FMG = { on: (_, fn, id) => fn(id) };
    const { data } = liveStreamData;
    const pageData = {
      ...liveStreamData,
      theme: {
        layoutColor: '#000',
      },
      data: {
        ...data,
        useVLLSchedule: false,
        isDigitalChannelLiveStream: true,
        digitalChannelSchedule: [{}],
        vertical: 'Noticias',
      },
    };
    const wrapper = mount(
      <Provider store={store}>
        <LiveStreamPage pageData={pageData} />
      </Provider>,
    );
    jest.advanceTimersByTime(30000);
    expect(wrapper.find(VideoPlayer)).toHaveLength(1);
  });

  it('should render for vll schedule', () => {
    videoHelpers.getEPGSchedule = jest.fn(() => ({
      currentShow: {
        title: 'test',
      },
    }));

    videoHelpers.parseVLLSchedule = jest.fn(() => [{}]);
    const { data } = liveStreamData;
    const pageData = {
      ...liveStreamData,
      data: {
        ...data,
        useVLLSchedule: true,
        isDigitalChannelLiveStream: true,
        digitalChannelSchedule: [{}],
        vertical: 'Noticias',
      },
    };
    const wrapper = mount(
      <Provider store={store}>
        <LiveStreamPage pageData={pageData} />
      </Provider>,
    );

    act(() => {
      jest.advanceTimersByTime(VLL_REFETCH_INTERVAL);
      expect(wrapper.find(VideoPlayer).props().program).not.toBeNull();
    });
  });

  it('should render for vll schedule', () => {
    videoHelpers.parseVLLSchedule = jest.fn(() => []);
    const { data } = liveStreamData;
    const pageData = {
      ...liveStreamData,
      data: {
        ...data,
        useVLLSchedule: true,
        isDigitalChannelLiveStream: true,
        digitalChannelSchedule: [{}],
      },
    };
    const wrapper = mount(
      <Provider store={store}>
        <LiveStreamPage pageData={pageData} />
      </Provider>,
    );

    act(() => {
      jest.advanceTimersByTime(REFETCH_INTERVAL);
      expect(wrapper.find(VideoPlayer).props().program).toBeNull();
    });
  });
});
