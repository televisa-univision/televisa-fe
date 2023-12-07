/**
 * @module PrendeTV WatchNow Specs
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import WatchNow from '.';

/**
* @test {WatchNow}
*/
describe('WatchNow component', () => {
  it('should render correctly in the DOM', () => {
    const div = document.createElement('div');
    ReactDOM.render(<WatchNow />, div);
  });
  it('should render the correct icons', () => {
    const wrapper = mount(<WatchNow />);
    const icons = wrapper.find('Icon');
    expect(icons.first().prop('name')).toEqual('liveTv');
    expect(icons.last().prop('name')).toEqual('playnocircle');
  });
});
