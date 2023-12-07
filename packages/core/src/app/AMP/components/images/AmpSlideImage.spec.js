import React from 'react';
import { shallow } from 'enzyme';
import AmpSlideImage from './AmpSlideImage';

describe('AmpSlideImage', () => {
  it('should return null for invalid types', () => {
    const wrapper = shallow(<AmpSlideImage type={null} />);
    expect(wrapper.getElement()).toBe(null);
  });

  it('should return null for invalid images', () => {
    const wrapper = shallow(<AmpSlideImage type="vertical" image={{}} />);
    expect(wrapper.getElement()).toBe(null);
  });

  it('should return amp-image for vertical slideshows', () => {
    const image = {
      renditions: {
        original: { href: 'test' },
        'slideshow-4x3-vertical-mobile': { href: 'test' },
      },
    };
    const wrapper = shallow(<AmpSlideImage type="vertical" image={image} />);
    expect(wrapper.getElement()).not.toBe(null);
  });

  it('should return amp-image for horizontal slideshows', () => {
    const image = {
      renditions: {
        original: { href: 'test' },
        'slideshow-mobile-horizontal': { href: 'test' },
      },
    };
    const wrapper = shallow(<AmpSlideImage type="horizontal" image={image} />);
    expect(wrapper.getElement()).not.toBe(null);
  });

  it('should use responsive layout for landscape images', () => {
    const image = {
      renditions: {
        original: { href: 'test', width: 100, height: 50 },
        'slideshow-4x3-vertical-mobile': { href: 'test' },
      },
    };
    const wrapper = shallow(<AmpSlideImage type="vertical" image={image} />);
    expect(wrapper.find('amp-img').prop('layout')).toBe('responsive');
  });

  it('should use fixed layout for portrait images', () => {
    const image = {
      renditions: {
        original: { href: 'test', width: 50, height: 100 },
        'slideshow-4x3-vertical-mobile': { href: 'test' },
      },
    };
    const wrapper = shallow(<AmpSlideImage type="vertical" image={image} />);
    expect(wrapper.find('amp-img').prop('layout')).toBe('fixed');
  });
});
