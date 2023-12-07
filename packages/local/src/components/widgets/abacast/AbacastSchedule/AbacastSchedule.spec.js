import React from 'react';
import { shallow } from 'enzyme';

import AbacastSchedule from './AbacastSchedule';

/** @test {AbacastSchedule} */
describe('AbacastSchedule', () => {
  let props;
  beforeEach(() => {
    props = {
      schedule: []
    };
  });

  it('should not render extraneous classes', () => {
    const wrapper = shallow(<AbacastSchedule {...props} />);
    expect(wrapper.find('div.nonExistingClass').length).toBe(0);
  });
});
