import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import {
  WHITE, BLUE,
} from '@univision/fe-utilities/styled/constants';
import { castingIcons } from '../CastingControls.config';
import CastingControlsButton from '.';

describe('Casting Controls Button test suite', () => {
  it('renders without crashing', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    const div = document.createElement('div');
    ReactDOM.render(
      <CastingControlsButton />,
      div
    );
  });
  it('should render as expected with casting control prop', () => {
    const wrapper = mount(
      <CastingControlsButton
        defaultName={castingIcons.CAST_CONNECTED}
        isCastingControl
      />
    );
    expect(wrapper.find('Icon')).toHaveLength(1);
    expect(wrapper.find('Icon').prop('name')).toBe('castConnected');
    expect(wrapper.find('Icon').prop('fill')).toBe(WHITE);
  });
  it('should render as expected as casting control with is left prop', () => {
    const wrapper = mount(
      <CastingControlsButton
        defaultName={castingIcons.CAST_CONNECTED}
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
      <CastingControlsButton
        defaultName={castingIcons.CAST_CONNECTED}
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
      <CastingControlsButton
        defaultName={castingIcons.CAST_CONNECTED}
        buttonCallback={click}
        isCastingControl
      />
    );
    wrapper.find('CastingControlsButton__ControlButtonWrapper').first().simulate('click', 'event');
    expect(click).toBeCalled();
  });
  it('should render as playback button', () => {
    const wrapper = mount(
      <CastingControlsButton
        defaultName="play"
        isPlaybackButton
      />
    );
    expect(wrapper.find('Icon')).toHaveLength(1);
    expect(wrapper.find('Icon').prop('name')).toBe('play');
    expect(wrapper.find('Icon').prop('fill')).toBe(WHITE);
    expect(wrapper.find('CastingControlsButton__ControlButtonWrapper')).toHaveStyleRule('margin-right', '24px');
  });

  it('should update button icon when should update prop changes', () => {
    const wrapper = mount(
      <CastingControlsButton
        updateName="pause"
        defaultName="play"
        isPlaybackButton
        shouldUpdateName={false}
      />
    );
    expect(wrapper.find('Icon')).toHaveLength(1);
    expect(wrapper.find('Icon').prop('name')).toBe('play');
    wrapper.setProps({
      shouldUpdateName: true,
    });
    wrapper.update();
    expect(wrapper.find('Icon').prop('name')).toBe('pause');
  });
  it('should return null when no name is provided', () => {
    const wrapper = mount(<CastingControlsButton defaultName={null} />);
    expect(wrapper.find('Icon')).toHaveLength(0);
    expect(wrapper).toEqual({});
  });
  it('should set margin for extended controls', () => {
    const wrapper = mount(
      <CastingControlsButton
        updateName="pause"
        defaultName="play"
        isPlaybackButton
        isCastingControl
        hasExtendedControls
      />
    );
    expect(wrapper.find('CastingControlsButton__ControlButtonWrapper')).toHaveStyleRule('margin-right', '6%');
  });
});
