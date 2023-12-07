/**
 * @module PrendeTV Shows Specs
 */
import React from 'react';
import { mount } from 'enzyme';

import * as helpers from '@univision/fe-commons/dist/utils/helpers';

import promoShows from './__mocks__';

import Shows from '.';

helpers.setCookie = jest.fn();

/**
 * @test {Shows}
 */
describe('Prende TV Static Shows List test', () => {
  it('should render correctly for desktop', () => {
    const wrapper = mount(
      <Shows device="desktop" {...promoShows} />
    );

    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('Shows__Row')).toHaveLength(1);
  });

  it('should render correctly for mobile', () => {
    const wrapper = mount(
      <Shows device="mobile" {...promoShows} />
    );

    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('Shows__Row')).toHaveLength(1);
  });

  it('should set the cookie when the user click on any show', () => {
    const wrapper = mount(
      <Shows device="mobile" {...promoShows} />
    );

    expect(wrapper).toHaveLength(1);
    wrapper.find('Shows__Square').at(0).simulate('click');
    expect(helpers.setCookie).toHaveBeenCalledTimes(1);
  });
});
