import React from 'react';
import { shallow } from 'enzyme';

import * as videoUtils from '@univision/fe-commons/dist/utils/video';
import SocialTracker from '@univision/fe-commons/dist/utils/tracking/tealium/social/SocialTracker';

import OpeningCard from './OpeningCard';
import mockData from './__mocks__/openingCard.json';

describe('OpeningCard suite', () => {
  let props;

  const constantDate = new Date('2020-05-08T20:10:00Z');
  const RealDate = Date;
  afterEach(() => {
    global.Date = RealDate;
  });

  beforeEach(() => {
    jest.restoreAllMocks();
    global.Date = jest.fn(
      () => new RealDate(constantDate)
    );
    videoUtils.getEPGSchedule = jest.fn(() => ({
      currentShow: {},
    }));
    props = {
      data: mockData,
      device: 'desktop',
    };
  });

  it('should render layout', () => {
    const wrapper = shallow(<OpeningCard data={mockData} />);

    expect(wrapper.find('OpeningCard__Wrapper')).toHaveLength(1);
    expect(wrapper.find('OpeningCard__VideoWrapper')).toHaveLength(1);
    expect(wrapper.find('Connect(LiveStream)')).toHaveLength(1);
    expect(wrapper.find('OpeningCard__InfoWrapper')).toHaveLength(1);
    expect(wrapper.find('OpeningCard__Headline')).toHaveLength(1);
    expect(wrapper.find('OpeningCard__LiveShow')).toHaveLength(1);
    expect(wrapper.find('OpeningCard__ScheduleLink')).toHaveLength(1);
    expect(wrapper.find('OpeningCard__Title')).toHaveLength(1);
    expect(wrapper.find('OpeningCard__Title')).toHaveStyleRule('font-size', '1rem');
    expect(wrapper.find('OpeningCard__Timestamp')).toHaveLength(1);
    expect(wrapper.find('OpeningCard__Logo')).toHaveLength(1);
  });

  it('should render layout without Livestream actived', () => {
    props = {
      data: {
        ...mockData,
        active: false,
      },
      device: 'desktop',
    };
    const wrapper = shallow(<OpeningCard {...props} />);
    expect(wrapper.find('OpeningCard__Wrapper')).toHaveLength(1);
    expect(wrapper.find('Link')).toHaveLength(1);
  });

  it('should not render if no active program', () => {
    videoUtils.getEPGSchedule = jest.fn(() => null);
    const wrapper = shallow(<OpeningCard {...props} />);
    expect(wrapper.find('OpeningCard__Wrapper')).toHaveLength(0);
  });

  it('doesnt return program if is not running on the current day', () => {
    videoUtils.getEPGSchedule = jest.fn(() => null);
    const wrapper = shallow(<OpeningCard {...props} />);
    expect(wrapper.find('OpeningCard__ShortTitle')).toHaveLength(0);
  });

  it('returns null if no valid schedule is available', () => {
    videoUtils.getEPGSchedule = jest.fn(() => ({ currentShow: false }));
    const wrapper = shallow(<OpeningCard {...props} />);
    expect(wrapper.find('OpeningCard__LiveShow')).toHaveLength(0);
    expect(wrapper.find('OpeningCard__Title').text()).toEqual('TUDN 24/7 DAI Test');
  });

  it('should call SocialTracker with onShareButtonClick prop', () => {
    const trackerSpy = jest.spyOn(SocialTracker, 'track');
    const wrapper = shallow(<OpeningCard {...props} />);
    wrapper.find('ActionBar').prop('onShareButtonClick')();
    expect(wrapper.find('ActionBar')).toHaveLength(1);
    expect(trackerSpy).toHaveBeenCalled();
  });
});
