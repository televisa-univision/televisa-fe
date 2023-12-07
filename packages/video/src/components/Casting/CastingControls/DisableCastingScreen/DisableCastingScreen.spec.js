import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import { castingIcons } from '../CastingControls.config';
import DisableCastingScreen from '.';

describe('Disable Casting Screen test suite', () => {
  it('renders without crashing', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    const div = document.createElement('div');
    ReactDOM.render(
      <DisableCastingScreen />,
      div
    );
  });
  it('should render as expected when active', () => {
    const wrapper = mount(<DisableCastingScreen showDisableScreen />);
    expect(wrapper.find('DisableCastingScreen__ScreenWrapper')).toHaveLength(1);
    expect(wrapper.find('DisableCastingScreen__ContentWrapper')).toHaveLength(2);
    expect(wrapper.find('DisableCastingScreen__Button')).toHaveLength(2);
    expect(wrapper.find('Icon')).toHaveLength(2);
    expect(wrapper.find('DisableCastingScreen__Button').last().text()).toEqual('Desconectar');
    expect(wrapper.find('Icon').first().prop('name')).toBe(castingIcons.CLOSE);
    expect(wrapper.find('Icon').last().prop('name')).toBe(castingIcons.CAST_CONNECTED);
  });
  it('should render as expected when not active', () => {
    const wrapper = mount(<DisableCastingScreen showDisableScreen={false} />);
    expect(wrapper.find('DisableCastingScreen__ScreenWrapper')).toHaveLength(0);
    expect(wrapper.find('DisableCastingScreen__ContentWrapper')).toHaveLength(0);
    expect(wrapper.find('DisableCastingScreen__Button')).toHaveLength(0);
    expect(wrapper.find('Icon')).toHaveLength(0);
  });
});
