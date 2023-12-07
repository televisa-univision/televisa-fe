import React from 'react';
import { shallow, mount } from 'enzyme';
import VideoPlayer from '@univision/fe-video/dist/components/VideoPlayer';
import * as storeHelpers from '@univision/fe-commons/dist/store/storeHelpers';
import * as videoHelpers from '@univision/fe-commons/dist/utils/video';
import LiveStreamPage, { VLL_REFETCH_INTERVAL, REFETCH_INTERVAL } from './LiveStreamPage';
import { data } from './LiveStreamData.json';

jest.useFakeTimers();

describe('LiveStreamPage', () => {
  it('should render a Header + Footer', () => {
    const wrapper = shallow(<LiveStreamPage page={{}} />);

    expect(wrapper.find('Header')).toHaveLength(1);
    expect(wrapper.find('FooterWrapper')).toHaveLength(1);
  });

  it('should render a Header + Livestream + Footer', () => {
    global.FMG = { on: (_, fn, id) => fn([id]) };
    const wrapper = mount(<LiveStreamPage page={data} />);
    expect(wrapper.find('Header')).toHaveLength(1);
    expect(wrapper.find('FooterWrapper')).toHaveLength(1);
  });

  it('should release FMG event when unmount', () => {
    global.FMG = {
      on: (_, fn, id) => fn([id]),
      off: jest.fn(),
      removeInstance: jest.fn(),
    };
    const wrapper = mount(<LiveStreamPage page={data} />);
    wrapper.unmount();
    expect(global.FMG.off).toBeCalledTimes(1);
  });

  it('should render a TudnMvpdWrapper', () => {
    storeHelpers.getVertical = jest.fn(() => 'noticias');
    const wrapper = shallow(<LiveStreamPage page={data} />);

    expect(wrapper.find('TudnMvpdWrapper')).toHaveLength(1);
  });

  it('should render for digital channel', () => {
    storeHelpers.getVertical = jest.fn(() => 'noticias');
    global.FMG = { on: (_, fn, id) => fn(id) };
    storeHelpers.getTheme = jest.fn(() => ({
      layoutColor: 'blue',
    }));
    const props = {
      page: {
        ...data,
        useVLLSchedule: false,
        isDigitalChannelLiveStream: true,
        digitalChannelSchedule: [{}],
      },
    };
    const wrapper = mount(<LiveStreamPage {...props} />);
    jest.advanceTimersByTime(30000);
    expect(wrapper.find('Header')).toHaveLength(1);
  });

  it('should render for vll schedule', () => {
    videoHelpers.parseVLLSchedule = jest.fn(() => [{}]);
    storeHelpers.getVertical = jest.fn(() => 'noticias');
    const props = {
      page: {
        ...data,
        useVLLSchedule: true,
        isDigitalChannelLiveStream: true,
        digitalChannelSchedule: [{}],
      },
    };
    const wrapper = mount(<LiveStreamPage {...props} />);
    jest.advanceTimersByTime(VLL_REFETCH_INTERVAL);
    expect(wrapper.find(VideoPlayer).props().tab).not.toBeNull();
  });

  it('should render for vll schedule', () => {
    storeHelpers.getVertical = jest.fn(() => 'noticias');
    videoHelpers.parseVLLSchedule = jest.fn(() => []);
    const props = {
      page: {
        ...data,
        isDigitalChannelLiveStream: true,
        digitalChannelSchedule: [{}],
        useVLLSchedule: true,
      },
    };
    const wrapper = mount(<LiveStreamPage {...props} />);
    jest.advanceTimersByTime(REFETCH_INTERVAL);
    expect(wrapper.find(VideoPlayer).props().tab).toBeNull();
  });
});
