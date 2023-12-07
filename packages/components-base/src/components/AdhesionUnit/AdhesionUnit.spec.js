import React from 'react';
import ReactDOM from 'react-dom';
import * as redux from 'react-redux';
import { mount, shallow } from 'enzyme';
import AdhesionUnit from '.';

/** @test {AdhesionUnit} */
describe('AdhesionUn', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.clearAllTimers();
  });
  jest.spyOn(redux, 'useSelector').mockImplementation(() => 'mobile');
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AdhesionUnit />, div);
  });
  it('should render AdhesionUnit', () => {
    const wrapper = mount(<AdhesionUnit closeTimeOut={2000} />);
    jest.runAllTimers();
    expect(wrapper.find('AdhesionUnit').length).toBe(1);
  });
  it('should close AdhesionUnit', () => {
    const wrapper = shallow(<AdhesionUnit />);
    wrapper.find('AdhesionUnit__CloseWrapper').simulate('click');
    wrapper.update();
    expect(wrapper.find('AdhesionUnit').length).toBe(0);
  });
  it('should close AdhesionUnit is 2 seconds', async () => {
    const wrapper = shallow(<AdhesionUnit closeTimeOut={2000} />);
    jest.runAllTimers();
    expect(wrapper.find('AdhesionUnit').length).toBe(0);
  });
  it('should call clearInterval unmount', () => {
    const clearIntervalMock = jest.spyOn(window, 'clearInterval');
    const wrapper = mount(<AdhesionUnit />);
    wrapper.unmount();
    expect(clearIntervalMock).toHaveBeenCalled();
  });
});
