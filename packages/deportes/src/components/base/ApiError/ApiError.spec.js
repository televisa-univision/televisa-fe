import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import ApiError from '.';

/** @test {ApiError} */
describe('ApiError ', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ApiError />, div);
  });

  it('should render with custom message', () => {
    const message = 'Not Found';
    const wrapper = shallow(<ApiError message={message} />);

    expect(wrapper).toHaveLength(1);
    expect(wrapper.text()).toBe(message);
  });
});
