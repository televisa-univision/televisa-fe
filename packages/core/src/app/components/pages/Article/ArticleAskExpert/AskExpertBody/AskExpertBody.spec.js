import React from 'react';
import { shallow } from 'enzyme';

import AskExpertBody from '.';

/** @test {Ask Expert Body} */
describe('Ask Expert Body', () => {
  it('should render without crashing', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    const wrapper = shallow(<AskExpertBody />);
    expect(wrapper.find(AskExpertBody)).toBeDefined();
  });
});
