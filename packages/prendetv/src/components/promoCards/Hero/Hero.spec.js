/**
 * @module PrendeTV Hero Specs
 */
import React from 'react';
import { shallow, mount } from 'enzyme';

import * as helpers from '@univision/fe-commons/dist/utils/helpers';

import * as prendeHelpers from '../../../utils';

import data from './__mocks__/heroMock';

import Hero from '.';

helpers.setCookie = jest.fn();
prendeHelpers.setContentTracking = jest.fn();

/**
 * @test {Hero}
 */
describe('Prende TV Static Hero test', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Hero {...data} />);

    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('Hero__Wrapper')).toHaveLength(1);
  });

  it('should render platform images for desktop', () => {
    const wrapper = mount(<Hero {...data} />);

    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('Hero__PlatformImage')).toHaveLength(3);
  });

  it('should render platform images for mobile', () => {
    const wrapper = mount(<Hero {...data} device="mobile" />);

    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('Hero__PlatformImage')).toHaveLength(3);
  });

  it('should render correctly if not bottom image', () => {
    const wrapper = shallow(<Hero {...data} />);

    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('Hero__HeroImage').prop('src')).toBe(data.image.renditions.original.href);
  });

  it('should render correctly if bottom image', () => {
    const wrapper = shallow(<Hero {...data} bottomImage />);

    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('Hero__HeroImage').prop('src')).toBe(data.image.renditions.original.href);
  });

  it('should set the cookie and track when the user click in the link', () => {
    const wrapper = shallow(<Hero {...data} />);

    expect(wrapper).toHaveLength(1);
    wrapper.find('Hero__Link').at(0).simulate('click');
    expect(prendeHelpers.setContentTracking).toHaveBeenCalledTimes(1);
    expect(helpers.setCookie).toHaveBeenCalledTimes(1);
  });

  it('should set default platformPromos when supportedPlatformPromos is not a valid array', () => {
    const newData = { ...data };
    delete newData.supportedPlatformPromos;

    const wrapper = shallow(<Hero {...newData} />);

    expect(wrapper.find('Hero__Link')).toHaveLength(2);
  });
});
