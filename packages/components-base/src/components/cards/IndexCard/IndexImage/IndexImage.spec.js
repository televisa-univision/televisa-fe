import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import mockData from '../__mocks__/indexCard.json';
import IndexImage from '.';

describe('IndexImage', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    const element = mount(<IndexImage {...mockData[0]} />);
    ReactDOM.render(element, div);
  });
  it('should not trigger onClick when tracking callback is not declared', () => {
    const mockTrackClick = jest.fn();
    const wrapper = mount(
      <IndexImage {...mockData[0]} />
    );
    wrapper.find('Link').simulate('click');
    expect(mockTrackClick).not.toHaveBeenCalled();
  });
  it('should trigger onClick when tracking callback is declared', () => {
    const mockTrackClick = jest.fn();
    const wrapper = mount(
      <IndexImage {...mockData[0]} trackClick={mockTrackClick} />
    );
    wrapper.find('Link').simulate('click');
    expect(mockTrackClick).toHaveBeenCalled();
  });
});
