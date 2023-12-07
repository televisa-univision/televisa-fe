import React from 'react';
import { shallow } from 'enzyme';

import AntiFlicker from './AntiFlicker';

/** @test {AntiFlicker} */
describe('AntiFlicker', () => {
  it('should render without crashing on SSR', () => {
    const wrapper = shallow(<AntiFlicker />);
    expect(wrapper.find('script').length).toBe(1);
  });
});
