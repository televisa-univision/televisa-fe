import React from 'react';
import { shallow } from 'enzyme';

import defaultImage from '@univision/fe-commons/dist/assets/images/default-content-image.png';

import Image from '.';

jest.mock('@univision/fe-commons/dist/assets/images/default-content-image.png', () => jest.fn());
/**
 * Dummy parameter to be used as the desktop image URL for the image component
 * @type {string}
 */
const desktopImagePath = 'desktopImagePath';

/**
 * Props for the the image component
 * @type {{alt: string, desktopImage: string, mobileImage: string}}
 */
const imageProps = {
  alt: 'A cute cat',
  src: desktopImagePath,
  className: 'imageClass',
};

/** @test {Image} */
describe('Image Spec', () => {
  const wrapper = shallow(<Image {...imageProps} />);
  it('should render image', () => {
    expect(wrapper.find('img').length).toBe(1);
  });
  it('should pass onError to the img element', () => {
    const onError = jest.fn();
    wrapper.setProps({ onError });
    const img = wrapper.find('img');
    img.simulate('error');
    expect(onError).toBeCalled();
  });
  it('should use default image if none is provided', () => {
    wrapper.setProps({ src: undefined });
    expect(wrapper.find('img').prop('src')).toEqual(defaultImage);
  });
  it('should pass custom className to rendered element', () => {
    wrapper.setProps({ className: 'custom' });
    expect(wrapper.find('img').prop('className')).toEqual('custom');
  });
  it('should not add any custom className if none is passed', () => {
    wrapper.setProps({ className: null });
    expect(wrapper.find('img').prop('className').trim()).toEqual('');
  });
});
