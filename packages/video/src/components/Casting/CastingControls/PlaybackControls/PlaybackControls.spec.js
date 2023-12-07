import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import {
  controlNames,
} from './PlaybackControls.config';
import castingTypes from '../CastingControls.config';
import PlaybackControls from '.';

const props = {
  elapsedTime: 100,
  duration: 135,
  forwardCallback: jest.fn(),
  nextCallback: jest.fn(),
  pauseCallback: jest.fn(),
  previousCallback: jest.fn(),
  rewindCallback: jest.fn(),
  volumeCallback: jest.fn(),
};

describe('Playback Controls testing suite', () => {
  it('renders without crashing', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    const div = document.createElement('div');
    ReactDOM.render(
      <PlaybackControls />,
      div
    );
  });
  it('should render as expected for livestream controls', () => {
    const pauseLive = jest.fn();
    const volumeOff = jest.fn();
    const wrapper = mount(
      <PlaybackControls
        {...props}
        type={castingTypes.LIVESTREAM}
        pauseCallback={pauseLive}
        volumeCallback={volumeOff}
      />
    );
    expect(wrapper.find('PlaybackControls__PlaybackWrapper')).toHaveLength(1);
    expect(wrapper.find('PlaybackControls__ControlsWrapper')).toHaveLength(1);
    expect(wrapper.find('CastingControlsButton')).toHaveLength(2);
    expect(wrapper.find('CastingBadge')).toHaveLength(1);
    expect(wrapper.find('LabelBadge')).toHaveLength(1);
    expect(wrapper.find('PlaybackControls__CastingTime')).toHaveLength(1);
    expect(wrapper.find('Label').prop('text')).toBe('En vivo');
    expect(wrapper.find('CastingControlsButton').first().prop('defaultName')).toBe(controlNames.PLAY);
    expect(wrapper.find('CastingControlsButton').last().prop('defaultName')).toBe(controlNames.VOLUME);
    expect(wrapper.find('PlaybackControls__CastingTime').first().text()).toBe('');
    wrapper.find('CastingControlsButton').first().simulate('click', 'event');
    expect(pauseLive).toBeCalled();
    wrapper.find('CastingControlsButton').last().simulate('click', 'event');
    expect(volumeOff).toBeCalled();
  });
  it('should not render button for livestream controls if callbacks are not valid', () => {
    const wrapper = mount(
      <PlaybackControls
        {...props}
        type={castingTypes.LIVESTREAM}
        pauseCallback={null}
        volumeCallback={null}
        duration={null}
      />
    );
    expect(wrapper.find('PlaybackControls__PlaybackWrapper')).toHaveLength(1);
    expect(wrapper.find('PlaybackControls__ControlsWrapper')).toHaveLength(1);
    expect(wrapper.find('PlaybackControls__CastingTime')).toHaveLength(1);
    expect(wrapper.find('PlaybackControls__CastingTime').first().text()).toBe('');
    expect(wrapper.find('CastingControlsButton')).toHaveLength(0);
  });
  it('should render as expected for playlist controls', () => {
    const nextVideo = jest.fn();
    const wrapper = mount(
      <PlaybackControls
        {...props}
        type={castingTypes.PLAYLIST}
        nextCallback={nextVideo}
        isPlaylist
      />
    );
    expect(wrapper.find('PlaybackControls__PlaybackWrapper')).toHaveLength(1);
    expect(wrapper.find('PlaybackControls__ControlsWrapper')).toHaveLength(1);
    expect(wrapper.find('CastingControlsButton')).toHaveLength(2);
    expect(wrapper.find('CastingFixedButton')).toHaveLength(3);
    expect(wrapper.find('CastingFixedButton').at(2).prop('name')).toBe(controlNames.NEXT);
    expect(wrapper.find('PlaybackControls__CastingTime')).toHaveLength(1);
    expect(wrapper.find('PlaybackControls__CastingTime').first().text()).toBe('1:40 - 2:15');
    wrapper.find('CastingFixedButton').at(2).simulate('click', 'event');
    expect(nextVideo).toBeCalled();
  });
  it('should not render button for playlist controls if callbacks are not valid', () => {
    const wrapper = mount(
      <PlaybackControls
        {...props}
        type={castingTypes.PLAYLIST}
        pauseCallback={null}
        volumeCallback={null}
        previousCallback={null}
        nextCallback={null}
        duration={null}
        elapsedTime={null}
      />
    );
    expect(wrapper.find('PlaybackControls__PlaybackWrapper')).toHaveLength(1);
    expect(wrapper.find('PlaybackControls__ControlsWrapper')).toHaveLength(1);
    expect(wrapper.find('CastingControlsButton')).toHaveLength(0);
    expect(wrapper.find('PlaybackControls__CastingTime')).toHaveLength(1);
    expect(wrapper.find('PlaybackControls__CastingTime').first().text()).toBe('0:00 - 0:00');
  });
  it('should return null when type has no associated controls', () => {
    const wrapper = mount(<PlaybackControls type="other" />);
    expect(wrapper).toEqual({});
  });
  it('should render as expected for mobile advertisement controls', () => {
    const pauseLive = jest.fn();
    const volumeOff = jest.fn();
    const wrapper = mount(
      <PlaybackControls
        {...props}
        type={castingTypes.ADVERTISING}
        pauseCallback={pauseLive}
        volumeCallback={volumeOff}
        isMobile
      />
    );
    expect(wrapper.find('PlaybackControls__PlaybackWrapper')).toHaveLength(1);
    expect(wrapper.find('PlaybackControls__ControlsWrapper')).toHaveLength(1);
    expect(wrapper.find('CastingControlsButton')).toHaveLength(2);
    expect(wrapper.find('CastingBadge')).toHaveLength(0);
    expect(wrapper.find('CastingControlsButton').first().prop('defaultName')).toBe(controlNames.PLAY);
    expect(wrapper.find('CastingControlsButton').last().prop('defaultName')).toBe(controlNames.VOLUME);
    wrapper.find('CastingControlsButton').first().simulate('click', 'event');
    expect(pauseLive).toBeCalled();
    wrapper.find('CastingControlsButton').last().simulate('click', 'event');
    expect(volumeOff).toBeCalled();
  });
  it('should render as expected for video clip controls', () => {
    const rewindVideo = jest.fn();
    const forwardVideo = jest.fn();
    const wrapper = mount(
      <PlaybackControls
        {...props}
        type={castingTypes.CLIP}
        rewindCallback={rewindVideo}
        forwardCallback={forwardVideo}
      />
    );
    expect(wrapper.find('PlaybackControls__PlaybackWrapper')).toHaveLength(1);
    expect(wrapper.find('PlaybackControls__ControlsWrapper')).toHaveLength(1);
    expect(wrapper.find('CastingControlsButton')).toHaveLength(2);
    expect(wrapper.find('CastingFixedButton')).toHaveLength(2);
    expect(wrapper.find('CastingFixedButton').first().prop('name')).toBe(controlNames.REWIND);
    expect(wrapper.find('CastingFixedButton').last().prop('name')).toBe(controlNames.FORWARD);
    expect(wrapper.find('PlaybackControls__CastingTime')).toHaveLength(1);
    expect(wrapper.find('PlaybackControls__CastingTime').first().text()).toBe('1:40 - 2:15');
    wrapper.find('CastingFixedButton').first().simulate('click', 'event');
    expect(rewindVideo).toBeCalled();
    wrapper.find('CastingFixedButton').last().simulate('click', 'event');
    expect(forwardVideo).toBeCalled();
  });
  it('should not render button for video clip controls if callbacks are not valid', () => {
    const wrapper = mount(
      <PlaybackControls
        {...props}
        type={castingTypes.PLAYLIST}
        pauseCallback={null}
        volumeCallback={null}
        previousCallback={null}
        nextCallback={null}
        duration={null}
        elapsedTime={null}
        rewindCallback={null}
        forwardCallback={null}
      />
    );
    expect(wrapper.find('PlaybackControls__PlaybackWrapper')).toHaveLength(1);
    expect(wrapper.find('PlaybackControls__ControlsWrapper')).toHaveLength(1);
    expect(wrapper.find('CastingControlsButton')).toHaveLength(0);
    expect(wrapper.find('CastingFixedButton')).toHaveLength(0);
    expect(wrapper.find('PlaybackControls__CastingTime')).toHaveLength(1);
    expect(wrapper.find('PlaybackControls__CastingTime').first().text()).toBe('0:00 - 0:00');
  });
});
