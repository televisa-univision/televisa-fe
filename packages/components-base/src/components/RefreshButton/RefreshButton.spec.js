import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import RefreshButton, { RefreshLabel } from '.';

/** @test {RefrehButton} */
describe('RefrehButton Spec', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<RefreshButton />, div);
  });
  it('should render button, icon, message and children', () => {
    const wrapper = shallow(<RefreshButton><div className="child">Test</div></RefreshButton>);
    expect(wrapper.find('Button')).toHaveLength(1);
    expect(wrapper.find('.child')).toHaveLength(1);
  });
  it('should call onclick', () => {
    const clickMock = jest.fn();
    const wrapper = shallow(<RefreshButton onClick={clickMock}><div className="child">Test</div></RefreshButton>);
    wrapper.find('Button').simulate('click');
    expect(clickMock).toBeCalled();
  });
  it('should apply theme', () => {
    const theme = {
      primary: '#00C473',
      secondary: '#4AE1A2',
    };
    const wrapper = shallow(<RefreshButton theme={theme}><div className="child">Test</div></RefreshButton>);
    expect(wrapper.find('Button').prop('style')).toEqual({ background: '#00C473' });
  });
});

/** @test {RefrehButton} */
describe('RefreshLabel Spec', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<RefreshLabel />, div);
  });
  it('should render icon, message and children', () => {
    const wrapper = shallow(<RefreshLabel><div className="child">Test</div></RefreshLabel>);
    expect(wrapper.find('Icon')).toHaveLength(2);
    expect(wrapper.find('.child')).toHaveLength(1);
    expect(wrapper.find('.refresh')).toHaveLength(1);
  });
});
