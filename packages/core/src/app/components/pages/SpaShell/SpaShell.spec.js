import React from 'react';
import { shallow } from 'enzyme';

import SpaShell from './SpaShell';

describe('SpaShell Page', () => {
  it('should render Provider', () => {
    const wrapper = shallow(<SpaShell page={{}} pageComponent={null} />);
    expect(wrapper.find('Provider')).toHaveLength(1);
  });
});
