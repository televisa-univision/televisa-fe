import React from 'react';
import { shallow } from 'enzyme';

import Link from '../Link';
import Image from '../Image';

import Logo from '.';

jest.mock('../Image', () => jest.fn());

/**
 * Dummy classname for testing Logo component
 * @type {string}
 */
let props;
beforeEach(() => {
  props = {
    uri: 'http://test.com',
    src: 'image.jpg',
    alt: 'alternate',
  };
});

/** @test {Logo} */
describe('Logo', () => {
  it('should render a Link component', () => {
    const wrapper = shallow(<Logo {...props} />);
    expect(wrapper.find(Link)).toBeTruthy();
  });

  it('should pass uri property to the Link component', () => {
    const wrapper = shallow(<Logo {...props} />);
    expect(wrapper.find(Link).prop('href')).toBe(props.uri);
  });

  it('should render an img', () => {
    const wrapper = shallow(<Logo {...props} />);
    expect(wrapper.find(Image)).toBeDefined();
  });

  it('should render the className prop in the img', () => {
    props.className = 'customClass';
    const wrapper = shallow(<Logo {...props} />);
    const img = wrapper.find(Image);
    expect(img.hasClass(props.className)).toBeTruthy();
  });

  it('should render the src prop in the img', () => {
    const wrapper = shallow(<Logo {...props} />);
    const img = wrapper.find(Image);
    expect(img.prop('src')).toBe(props.src);
  });

  it('should render the alt prop in the img', () => {
    const wrapper = shallow(<Logo {...props} />);
    const img = wrapper.find(Image);
    expect(img.prop('alt')).toBe(props.alt);
  });

  it('should not render if it doesn\'t has an image', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    props.src = undefined;
    const wrapper = shallow(<Logo {...props} />);
    expect(wrapper.getElement()).toBe(null);
  });

  it('should render only the image if uri is null', () => {
    props.uri = null;
    const wrapper = shallow(<Logo {...props} />);
    expect(wrapper.find(Link)).toHaveLength(0);
  });

  it('should render a map tag', () => {
    const wrapper = shallow(<Logo {...props} logoMap={[{}]} />);
    expect(wrapper.find('map')).toHaveLength(1);
  });
});
