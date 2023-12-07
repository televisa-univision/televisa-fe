import React from 'react';
import { shallow } from 'enzyme';

import SongInfo from '.';

/** @test {SongInfo} */
describe('SongInfo', () => {
  it('renders the SongInfo', () => {
    const wrapper = shallow(<SongInfo artist="artist" title="title" />);
    expect(wrapper.find('div'));
  });

  it('animates the marquee if it overflows', () => {
    const wrapper = shallow(<SongInfo artist="artist" title="title" />);
    const instance = wrapper.instance();
    instance.marqueeContainer = {
      current: {
        offsetWidth: 10,
        scrollWidth: 20,
      },
    };
    expect(instance.shouldMarqueeAnimate()).toEqual(true);
  });

  it('should render two spans if animating', () => {
    const wrapper = shallow(<SongInfo artist="artist" title="title" />);
    const instance = wrapper.instance();
    instance.shouldMarqueeAnimate = () => true;
    wrapper.setProps({});
    expect(wrapper.find('span')).toHaveLength(2);
  });
});
