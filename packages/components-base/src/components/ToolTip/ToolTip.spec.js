import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import localStorage from '@univision/fe-utilities/storage/localStorage';

import { toolTipHide } from './ToolTip.styles';
import ToolTip from '.';

describe('Tooltip component tests', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.resetAllMocks();
  });
  it('should renders with content string', () => {
    const wrapper = mount(
      <ToolTip content="this is a string" toolTipId="testToolTip" />
    );
    expect(wrapper.find('ToolTip__Label').text()).toBe('this is a string');
  });
  it('should renders with content from react Node', () => {
    const toolTipContent = <b>{'Text'}</b>;
    const wrapper = mount(
      <ToolTip content={toolTipContent} toolTipId="testToolTip" />
    );
    expect(wrapper.find('ToolTip__Label').html()).toMatch('<b>Text</b>');
  });
  it('should renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ToolTip />, div);
  });
  it('should render with default color', () => {
    const wrapper = mount(
      <ToolTip toolTipId="testToolTip" />
    );
    expect(wrapper).toHaveStyleRule('background-color', '#3374F2');
  });
  it('should render with theme color', () => {
    const theme = {
      primary: '#FF7',
    };
    const wrapper = mount(
      <ToolTip toolTipId="testToolTip" theme={theme} />
    );
    expect(wrapper).toHaveStyleRule('background-color', '#FF7');
  });
  it('should show tooltip up', () => {
    const wrapper = mount(
      <ToolTip showToolTipUp />
    );
    expect(wrapper).toHaveStyleRule('top', '-54px');
  });
  it('should show arrow at right', () => {
    const wrapper = mount(
      <ToolTip showArrowRight />
    );
    expect(wrapper.find('ToolTip__Arrow')).toHaveStyleRule('right', '5%');
  });
  it('should close tooltip', () => {
    const wrapper = mount(<ToolTip />);
    wrapper.simulate('click');
    expect(wrapper).toHaveStyleRule('animation-name', toolTipHide.name);
  });
  it('should update local storage if close is true', () => {
    const wrapper = mount(<ToolTip close toolTipId="testToolTip" />);
    expect(JSON.parse(localStorage.get('testToolTip'))).toEqual({ count: 2, timestamp: expect.any(Number) });
    expect(wrapper.find('ToolTip__ToolTipStyled')).toHaveLength(1);
  });
  it('should show only one to the user', () => {
    localStorage.set('testToolTip', JSON.stringify({ count: 0, timestamp: Date.now() }));
    const wrapper = mount(<ToolTip showTimes={1} toolTipId="testToolTip" />);
    expect(wrapper.find('ToolTip__ToolTipStyled')).toHaveLength(1);
    wrapper.simulate('click');
    wrapper.update();
    expect(wrapper.find('ToolTip__ToolTipStyled').props().closeToolTip).toBe(true);
  });
  it('should not show if the number of times is equal o higher', () => {
    localStorage.set('testToolTip', 2);
    const wrapper = mount(<ToolTip showTimes={2} toolTipId="testToolTip" />);
    expect(wrapper.find('ToolTip__ToolTipStyled')).toHaveLength(0);
  });
  it('should not show if have legacy true value in the storage', () => {
    localStorage.set('testToolTip', 'true');
    const wrapper = mount(<ToolTip showTimes={1} toolTipId="testToolTip" />);
    expect(wrapper.find('ToolTip__ToolTipStyled')).toHaveLength(0);
  });
  it('should show if showFrequency is sent', () => {
    localStorage.set('testToolTip', JSON.stringify({ count: 1, timestamp: (new Date('04/10/2022')).getTime() }));
    const wrapper = mount(<ToolTip showTimes={3} showFrequency={30} toolTipId="testToolTip" />);
    Date.now = jest.fn(() => (new Date('05/15/2022')).getTime());
    expect(wrapper.find('ToolTip__ToolTipStyled')).toHaveLength(1);
  });

  it('should not show if showFrequency is sent but frequency days have not passed', () => {
    localStorage.set('testToolTip', JSON.stringify({ count: 2, timestamp: (new Date('04/10/2022')).getTime() }));
    const wrapper = mount(<ToolTip debug showTimes={3} showFrequency={30} toolTipId="testToolTip" />);
    Date.now = jest.fn(() => (new Date('04/15/2022')).getTime());
    expect(wrapper.find('ToolTip__ToolTipStyled')).toHaveLength(0);
  });
});
