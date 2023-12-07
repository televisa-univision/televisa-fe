/**
 * @module PrendeTV Footer Specs
 */
import React from 'react';
import { shallow, mount } from 'enzyme';

import * as prendetvHelpers from '../../utils';

import Footer from '.';

prendetvHelpers.redirectWithLang = jest.fn();

/**
 * @test {Footer}
 */
describe('Prende TV Static Footer test', () => {
  it('should render correctly', () => {
    const wrapper = shallow(
      <Footer />
    );

    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('Footer__Wrapper')).toHaveLength(1);
  });

  it('should redirect when select another language', () => {
    const wrapper = mount(<Footer />);
    wrapper.find('select').simulate('change');
    expect(prendetvHelpers.redirectWithLang).toBeCalled();
  });
});
