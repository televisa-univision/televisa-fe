import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import EmptyPlaceholder from '.';

/** @test {EmptyPlaceholder} */
describe('EmptyPlaceholder', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    const el = (
      <EmptyPlaceholder />
    );
    ReactDOM.render(el, div);
  });

  it('should not render', () => {
    const wrapper = shallow(<EmptyPlaceholder />);
    expect(wrapper.getElement()).toBeNull();
  });
});
