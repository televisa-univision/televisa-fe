/**
 * @module PrendeTV Headline Specs
 */
import React from 'react';
import { mount } from 'enzyme';

import { PRENDE_TV_LANDING, PRENDE_TV_PARTNERS } from '../../constants';
import Headline from '.';

/**
 * @test {Headline}
 */
describe('Prende TV Static Headline test', () => {
  it('should render correctly', () => {
    const wrapper = mount(
      <Headline />
    );

    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('Headline__Wrapper')).toHaveLength(1);
  });

  it('should render correctly when is the landing page', () => {
    const wrapper = mount(
      <Headline page={PRENDE_TV_LANDING} />
    );

    expect(wrapper).toHaveLength(1);
  });
  it('should render correctly when is a partner page', () => {
    const wrapper = mount(
      <Headline page={PRENDE_TV_PARTNERS} />
    );

    expect(wrapper).toHaveLength(1);
  });
});
