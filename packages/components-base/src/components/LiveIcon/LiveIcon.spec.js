import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import LiveIcon from '.';

/** @test {LiveIcon} */
describe('Live Icon', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<LiveIcon />, div);
  });
  it('should render a LiveIcon', () => {
    const wrapper = shallow(<LiveIcon />);
    expect(wrapper.find('Icon')).toHaveLength(1);
  });
});
