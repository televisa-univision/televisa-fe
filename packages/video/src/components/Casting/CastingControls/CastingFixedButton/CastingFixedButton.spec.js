import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import {
  WHITE, BLUE,
} from '@univision/fe-utilities/styled/constants';
import { castingIcons } from '../CastingControls.config';
import CastingFixedButton from '.';

describe('Casting Fixed Button test suite', () => {
  it('renders without crashing', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    const div = document.createElement('div');
    ReactDOM.render(
      <CastingFixedButton />,
      div
    );
  });
  it('should render as expected with casting control prop', () => {
    const wrapper = mount(
      <CastingFixedButton
        name={castingIcons.CAST_CONNECTED}
        isCastingControl
      />
    );
    expect(wrapper.find('Icon')).toHaveLength(1);
    expect(wrapper.find('Icon').prop('name')).toBe('castConnected');
    expect(wrapper.find('Icon').prop('fill')).toBe(WHITE);
  });
  it('should render as expected as casting control with is left prop', () => {
    const wrapper = mount(
      <CastingFixedButton
        name={castingIcons.CAST_CONNECTED}
        isCastingControl
        isLeft
      />
    );
    expect(wrapper.find('Icon')).toHaveLength(1);
    expect(wrapper.find('Icon').prop('name')).toBe('castConnected');
    expect(wrapper.find('Icon').prop('fill')).toBe(WHITE);
  });
  it('should render as expected with custom fill', () => {
    const wrapper = mount(
      <CastingFixedButton
        name={castingIcons.CAST_CONNECTED}
        isCastingControl
        fill={BLUE}
      />
    );
    expect(wrapper.find('Icon')).toHaveLength(1);
    expect(wrapper.find('Icon').prop('name')).toBe('castConnected');
    expect(wrapper.find('Icon').prop('fill')).toBe(BLUE);
  });
  it('should use button callback function onClick', () => {
    const click = jest.fn();
    const wrapper = mount(
      <CastingFixedButton
        name={castingIcons.CAST_CONNECTED}
        buttonCallback={click}
        isCastingControl
      />
    );
    wrapper.find('CastingFixedButton__ControlButtonWrapper').first().simulate('click', 'event');
    expect(click).toBeCalled();
  });
  it('should render as playback button', () => {
    const wrapper = mount(
      <CastingFixedButton
        name="play"
        isPlaybackButton
      />
    );
    expect(wrapper.find('Icon')).toHaveLength(1);
    expect(wrapper.find('Icon').prop('name')).toBe('play');
    expect(wrapper.find('Icon').prop('fill')).toBe(WHITE);
    expect(wrapper.find('CastingFixedButton__ControlButtonWrapper')).toHaveStyleRule('margin-right', '24px');
  });

  it('should return null when no name is provided', () => {
    const wrapper = mount(<CastingFixedButton defaultName={null} />);
    expect(wrapper.find('Icon')).toHaveLength(0);
    expect(wrapper).toEqual({});
  });
  it('should set margin for extended controls', () => {
    const wrapper = mount(
      <CastingFixedButton
        name="play"
        isPlaybackButton
        isCastingControl
        hasExtendedControls
      />
    );
    expect(wrapper.find('CastingFixedButton__ControlButtonWrapper')).toHaveStyleRule('margin-right', '6%');
  });
});
