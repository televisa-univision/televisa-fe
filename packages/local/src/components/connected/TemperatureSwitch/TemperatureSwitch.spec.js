import React from 'react';
import { Provider } from 'react-redux';
import Store from '@univision/fe-commons/dist/store/store';
import { setIsCelsiusActive, setIsCelsiusDisabled } from '@univision/fe-commons/dist/store/actions/local/local-actions';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';

import TemperatureSwitchItem from './TemperatureSwitch';
import TemperatureSwitch from '.';

/** @test {TemperatureSwitch} */
describe('TemperatureSwitch', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    const el = (
      <Provider store={Store}>
        <TemperatureSwitch />
      </Provider>
    );
    ReactDOM.render(el, div);
  });

  it('should not render the component if isCelsius is null', () => {
    const wrapper = mount(
      <Provider store={Store}>
        <TemperatureSwitch />
      </Provider>
    );
    expect(wrapper.find('TemperatureSwitch__Wrapper')).toHaveLength(0);
    expect(wrapper.find('TemperatureSwitch').prop('isCelsius')).toBeNull();
  });

  it('should render with isCelsius prop true', () => {
    Store.dispatch(setIsCelsiusActive());

    const wrapper = mount(
      <Provider store={Store}>
        <TemperatureSwitch />
      </Provider>
    );

    expect(wrapper.find('TemperatureSwitch__Wrapper')).toHaveLength(1);
    expect(wrapper.find('TemperatureSwitch').prop('isCelsius')).toBeTruthy();
  });

  it('should render with isCelsius prop true', () => {
    Store.dispatch(setIsCelsiusDisabled());

    const wrapper = mount(
      <Provider store={Store}>
        <TemperatureSwitch />
      </Provider>
    );

    expect(wrapper.find('TemperatureSwitch__Wrapper')).toHaveLength(1);
    expect(wrapper.find('TemperatureSwitch').prop('isCelsius')).toBeFalsy();
  });

  it('should setIsCelsiusDisabled if isCelsius is true', () => {
    const mockFn = jest.fn();
    const wrapper = shallow(<TemperatureSwitchItem isCelsius setIsCelsiusDisabled={mockFn} />);

    wrapper.find('TemperatureSwitch__Wrapper').first().simulate('click');
    expect(mockFn).toBeCalled();
  });

  it('should setIsCelsiusActive if isCelsius is false', () => {
    const mockFn = jest.fn();
    const wrapper = shallow(
      <TemperatureSwitchItem isCelsius={false} setIsCelsiusActive={mockFn} />
    );

    wrapper.find('TemperatureSwitch__Wrapper').first().simulate('click');
    expect(mockFn).toBeCalled();
  });
});
