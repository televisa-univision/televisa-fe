import React from 'react';
import { shallow } from 'enzyme';
import ScheduleCard from '.';

let props;

beforeEach(() => {
  props = {
    isDesktop: true,
    calreply: {
      code: 'code',
      href: 'href',
    },
    airtime: 'L-V',
    image: 'image.jpg',
    isLive: true,
    title: 'title',
    startTime: '5:00 PM',
  };
});

describe('LongformScheduleList Spec', () => {
  it('should show live button', () => {
    const wrapper = shallow(<ScheduleCard {...props} />);
    expect(wrapper.find('.isLive')).toHaveLength(1);
  });

  it('should have desktop components in place', () => {
    const wrapper = shallow(<ScheduleCard {...props} />);
    expect(wrapper.find('.imageWrapper .title')).toHaveLength(1);
    expect(wrapper.find('.timeWrapper .calReply')).toHaveLength(1);
  });

  it('should have mobile components in place', () => {
    props.isDesktop = false;
    const wrapper = shallow(<ScheduleCard {...props} />);
    expect(wrapper.find('.timeWrapper .title')).toHaveLength(1);
    expect(wrapper.find('.imageWrapper .calReply')).toHaveLength(1);
  });
});
