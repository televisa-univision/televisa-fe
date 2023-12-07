import React from 'react';
import { shallow } from 'enzyme';
import * as request from '@univision/fe-commons/dist/utils/api/request';
import WidgetTracker from '@univision/fe-commons/dist/utils/tracking/tealium/widget/WidgetTracker';
import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import LongformScheduleList from '.';

let props;
let schedule;

beforeEach(() => {
  props = {
    settings: {
      title: 'Test',
      networkSchedule: 'univisionny',
    },
    widgetContext: {
      type: 'grid',
    },
  };

  schedule = {
    items: [{
      tmsId: '123',
      image: 'image.jpg',
      e: 'title',
      sl: '2019-06-26T17:00:00.000',
      su: '2019-06-26T21:00:00.000',
      ds: 3600,
      permalink: 'https://link.com',
      airtime: 'LUN-VIE 12AM/11C',
      calReplyHref: 'href',
      calReplyCode: 'code',
    }],
  };
});

describe('LongformScheduleList Spec', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should process the data', () => {
    const wrapper = shallow(<LongformScheduleList {...props} />);
    wrapper.instance().date = new Date('2019-06-26T16:00:00.000');
    wrapper.instance().date.getTimezoneOffset = jest.fn(() => 300);
    const data = wrapper.instance().processSchedule(schedule);
    expect(data[0]).toEqual(expect.objectContaining({
      airtime: schedule.items[0].airtime,
      isLive: true,
      image: schedule.items[0].image,
      link: schedule.items[0].permalink,
      startTime: '4:00 PM',
      title: schedule.items[0].e,
    }));
  });

  it('should return empty data if no items on the timeframe', () => {
    const wrapper = shallow(<LongformScheduleList {...props} />);
    wrapper.instance().date = new Date('2019-06-26T10:00:00.000');
    wrapper.instance().date.getTimezoneOffset = jest.fn(() => 300);
    const data = wrapper.instance().processSchedule(schedule);
    wrapper.setState({ schedule: [{}] });
    expect(data).toEqual([]);
  });

  it('should save schedule to state', async () => {
    request.requestWithBasicAuth = jest.fn(() => Promise.resolve(schedule));
    const wrapper = shallow(<LongformScheduleList {...props} />);
    await wrapper.instance().loadNetworkData();
    const data = wrapper.instance().processSchedule(schedule);
    expect(wrapper.state().schedule).toEqual(data);
  });

  it('should save empty schedule if request fails', async () => {
    request.requestWithBasicAuth = jest.fn(() => Promise.reject());
    const wrapper = shallow(<LongformScheduleList {...props} />);
    await wrapper.instance().loadNetworkData();
    expect(wrapper.state().schedule).toEqual([]);
  });

  it('should return correct logo', async () => {
    const wrapper = shallow(<LongformScheduleList {...props} />);
    let logo = wrapper.instance().getLogo();
    expect(logo).toEqual('univision');

    wrapper.setProps({ settings: { networkSchedule: 'unimasny' } });
    logo = wrapper.instance().getLogo();
    expect(logo).toEqual('unimas');

    wrapper.setProps({ settings: { networkSchedule: 'galavisionny' } });
    logo = wrapper.instance().getLogo();
    expect(logo).toEqual('galavision');
  });

  it('should trigger the tracking event when "more episodes" button is clicked', () => {
    Store.dispatch(setPageData({ data: { type: 'section' } }));
    const trackSpy = jest.spyOn(WidgetTracker, 'track');
    const wrapper = shallow(<LongformScheduleList {...props} />);
    // Pretend schedule data has been populated
    wrapper.instance().date = new Date('2019-06-26T16:00:00.000');
    wrapper.instance().date.getTimezoneOffset = jest.fn(() => 300);
    wrapper.setState({ schedule: wrapper.instance().processSchedule(schedule) });
    // Find the clickable now that schedule is filled
    wrapper.find('.moreEpisodes').simulate('click');
    expect(trackSpy).toHaveBeenLastCalledWith(expect.any(Function), expect.any(Object));
  });
});
