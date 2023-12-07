import React from 'react';
import { shallow } from 'enzyme';

import StreamLoading from '.';

/** @test {StreamLoading} */
describe('StreamLoading', () => {
  it('renders the StreamLoading', () => {
    const wrapper = shallow(<StreamLoading />);
    expect(wrapper.find('div'));
  });
});
