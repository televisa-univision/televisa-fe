import React from 'react';
import { mount } from 'enzyme';
import ScheduleList from '.';

let props;

beforeEach(() => {
  props = {
    schedule: [{
      startTime: '12:00',
      title: 'First',
    }, {
      startTime: '2:00',
      title: 'Second',
    }],
  };
});

describe('LongformScheduleList Spec', () => {
  it('should render as expected', () => {
    props.variant = 'dark';
    const wrapper = mount(<ScheduleList {...props} />);
    expect(wrapper.find('div').length).toBeGreaterThan(2);
  });

  it('should render as expected', () => {
    props.variant = 'light';
    const wrapper = mount(<ScheduleList {...props} />);
    expect(wrapper.find('div').length).toBeGreaterThan(2);
  });
});
