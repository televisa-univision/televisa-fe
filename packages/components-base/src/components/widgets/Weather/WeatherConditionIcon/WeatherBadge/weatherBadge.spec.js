import React from 'react';
import { mount } from 'enzyme';
import ReactDOM from 'react-dom';
import WeatherBadge from '.';

/** @test {WeatherBadge} */

describe('WeatherBadge Component', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<WeatherBadge amount={5} />, div);
  });
  it('should render displaying passed amount', () => {
    const wrapper = mount(
      <WeatherBadge amount={5} />
    );
    const Label = wrapper.find('WeatherBadge__LabelAlert');
    expect(Label.text()).toEqual('5');
  });
  it('should display 9+ if amount is bigger then 9', () => {
    const wrapper = mount(
      <WeatherBadge amount={10} />
    );
    const Label = wrapper.find('WeatherBadge__LabelAlert');
    expect(Label.text()).toEqual('9+');
  });
  it('should not render a WeatherBadge without props', () => {
    const wrapper = mount(<WeatherBadge />);
    const Label = wrapper.find('WeatherBadge__LabelAlert');
    expect(Label).toHaveLength(0);
  });
  it('should not display if is not a valid number', () => {
    const wrapper = mount(
      <WeatherBadge amount={'amount'} />
    );
    const Label = wrapper.find('WeatherBadge__LabelAlert');
    expect(Label).toHaveLength(0);
  });
});
