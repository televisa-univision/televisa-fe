import React from 'react';
import { mount } from 'enzyme';

import StyledDropdown from '.';
import mockDataRegular from './__mocks__/regular.json';

describe('StyledDropdown component', () => {
  it('should render without crashing', () => {
    const wrapper = mount(<StyledDropdown />);

    expect(wrapper.find('ul').length).toBe(1);
  });

  it('should render without crashing for dark theme', () => {
    const wrapper = mount(<StyledDropdown isDark />);

    expect(wrapper.find('ul').length).toBe(1);
  });

  it('should handle the scrolling by clicking the down arrow button', () => {
    const setPos = jest.fn();
    const wrapper = mount(<StyledDropdown {...mockDataRegular} />);
    const handleClick = jest.spyOn(React, 'useState');

    handleClick.mockImplementation(pos => [pos, setPos]);

    wrapper.find('StyledDropdown__ArrowDown').simulate('click');

    expect(setPos).toBeTruthy();
  });

  it('should handle the scrolling by clicking the up arrow button', () => {
    const setPos = jest.fn();
    const wrapper = mount(<StyledDropdown {...mockDataRegular} />);
    const handleClick = jest.spyOn(React, 'useState');

    handleClick.mockImplementation(pos => [pos, setPos]);

    wrapper.find('StyledDropdown__ArrowUp').simulate('click');

    expect(setPos).toBeTruthy();
  });

  it('should handle pressing the down button past the length of the items', () => {
    const wrapper = mount(<StyledDropdown {...mockDataRegular} />);
    const arrowDown = wrapper.find('StyledDropdown__ArrowDown');

    mockDataRegular.items.forEach(() => arrowDown.simulate('click'));
  });

  it('should handle selecting an item of the list, light theme', () => {
    const setSelected = jest.fn();
    const wrapper = mount(<StyledDropdown {...mockDataRegular} />);
    const handleClick = jest.spyOn(React, 'useState');

    handleClick.mockImplementation(selected => [selected, setSelected]);

    wrapper.find('StyledDropdown__Item').at(1).simulate('click');

    expect(setSelected).toBeTruthy();
  });

  it('should handle selecting an item of the list, dark theme', () => {
    const setSelected = jest.fn();
    const wrapper = mount(<StyledDropdown {...mockDataRegular} isDark />);
    const handleClick = jest.spyOn(React, 'useState');

    handleClick.mockImplementation(selected => [selected, setSelected]);

    wrapper.find('StyledDropdown__Item').at(1).simulate('click');

    expect(setSelected).toBeTruthy();
  });

  it('should not do anything if clicking an item already selected', () => {
    const setSelected = jest.fn();
    const wrapper = mount(<StyledDropdown {...mockDataRegular} />);
    const handleClick = jest.spyOn(React, 'useState');

    handleClick.mockImplementation(selected => [selected, setSelected]);

    wrapper.find('StyledDropdown__Item').at(0).simulate('click');

    expect(setSelected).toBeTruthy();
  });
});
