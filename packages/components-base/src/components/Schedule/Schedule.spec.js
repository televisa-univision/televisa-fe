import React from 'react';
import { mount } from 'enzyme';

import CoreSlider from '../CoreSlider';
import Carousel from '../Carousel';

import Schedule from '.';

jest.mock('../SlideArrow', () => jest.fn());

let props;
beforeEach(() => {
  props = {
    content: [{
      program: 'Omar y Argelia',
      'time-slot': '5 AM - 10 AM',
    },
    {
      program: 'Donaji',
      'time-slot': '10 AM - 3 PM',
    },
    {
      program: 'Ysaac Alvarez',
      'time-slot': '3 PM - 7 PM',
    },
    {
      program: 'Bertha Andrea Gonzalez',
      'time-slot': '7 PM - 12 AM',
    }],
  };
});

/** @test {Schedule} */
describe('Schedule ', () => {
  it('should render without crashing', () => {
    const wrapper = mount(<Schedule {...props} />);

    return wrapper.instance().updateComponentVersion().then((() => {
      wrapper.update();
      expect(wrapper.find(Carousel).at(0).children()).toHaveLength(1);
    }));
  });

  it('should render without crashing (mobile)', () => {
    const originalWidth = window.innerWidth;
    window.innerWidth = 700;
    const wrapper = mount(<Schedule {...props} />);

    return wrapper.instance().updateComponentVersion().then((() => {
      wrapper.update();
      expect(wrapper.find('p.uvs-font-a-regular').at(1).children()).toHaveLength(1);
    })).finally(() => { window.innerWidth = originalWidth; });
  });

  it('should not show if empty', () => {
    const wrapper = mount(<Schedule />);
    return wrapper.instance().updateComponentVersion().then((() => {
      wrapper.update();
      expect(wrapper.find(CoreSlider).at(0).children()).toHaveLength(0);
    }));
  });
  it('should remove event listener when unmounted.', () => {
    const wrapper = mount(<Schedule />);
    const fn = wrapper.instance().updateComponentVersion;
    spyOn(global.window, 'removeEventListener');
    wrapper.unmount();
    expect(global.window.removeEventListener).toHaveBeenCalledWith('resize', fn);
  });
});
