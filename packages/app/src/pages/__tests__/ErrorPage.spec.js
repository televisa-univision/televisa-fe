import React from 'react';
import { mount } from 'enzyme';
import preloadAll from 'jest-next-dynamic';

import PageError from '../_error.main';

/**
 * @test {Error page}
 */
describe('Error page test', () => {
  beforeAll(async () => {
    await preloadAll();
  });

  it('should render correctly', () => {
    const wrapper = mount(<PageError />);

    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('ErrorLayout__TitleStyled').at(0).text()).toEqual('Esta página no está disponible temporalmente.');
  });

  it('should render static header version', () => {
    const wrapper = mount(<PageError />);

    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('header')).toHaveLength(1);
    expect(wrapper.find('header')).toHaveStyleRule('height', '50px');
  });
});
