import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import castingTypes from './CastingControls.config';
import CastingControls from '.';

const props = {
  elapsedTime: 100,
  duration: 174,
  castingDeviceName: '[TV][LG]42LA620T-DA',
  title: 'Machester United espera la visita del Bayern  en Champions League',
  pauseCallback: jest.fn(),
  volumeCallback: jest.fn(),
  isPlaying: true,
  hasVolume: true,
  showDisableScreenCallback: jest.fn(),
  showDisableScreen: false,
  disableCallback: jest.fn(),
  onCasting: false,
  rewindCallback: jest.fn(),
  forwardCallback: jest.fn(),
  nextCallback: jest.fn(),
  previousCallback: jest.fn(),
};

describe('Casting Controls test suite', () => {
  it('renders without crashing', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    const div = document.createElement('div');
    ReactDOM.render(
      <CastingControls />,
      div
    );
  });
  it('should render as expected with type livestream', () => {
    const wrapper = mount(
      <CastingControls
        {...props}
        onCasting
        type={castingTypes.LIVESTREAM}
      />
    );
    expect(wrapper.find('CastingControls__ControlsWrapper')).toHaveLength(1);
    expect(wrapper.find('CastingControls__MobileTitleWrappere')).toHaveLength(0);
    expect(wrapper.find('PlaybackControls')).toHaveLength(1);
    expect(wrapper.find('CastingControlsButton')).toHaveLength(3);
    expect(wrapper.find('DisableCastingScreen')).toHaveLength(1);
    expect(wrapper.find('CastingTitle__TitleWrapper')).toHaveLength(1);
    expect(wrapper.find('CastingBadge')).toHaveLength(1);
    expect(wrapper.find('LabelBadge')).toHaveLength(1);
    expect(wrapper.find('Label').prop('text')).toBe('En vivo');
  });
  it('should render as expected with type livestream in mobile', () => {
    const wrapper = mount(
      <CastingControls
        {...props}
        isMobile
        onCasting
        type={castingTypes.LIVESTREAM}
      />
    );
    expect(wrapper.find('CastingControls__ControlsWrapper')).toHaveLength(1);
    expect(wrapper.find('CastingControls__MobileTitleWrapper')).toHaveLength(1);
    expect(wrapper.find('PlaybackControls')).toHaveLength(1);
    expect(wrapper.find('CastingControlsButton')).toHaveLength(3);
    expect(wrapper.find('DisableCastingScreen')).toHaveLength(1);
    expect(wrapper.find('CastingTitle__TitleWrapper')).toHaveLength(1);
    expect(wrapper.find('CastingBadge')).toHaveLength(1);
    expect(wrapper.find('LabelBadge')).toHaveLength(1);
    expect(wrapper.find('Label').prop('text')).toBe('En vivo');
  });
  it('should render as expected with type advertising', () => {
    const wrapper = mount(
      <CastingControls
        {...props}
        onCasting
        type={castingTypes.ADVERTISING}
      />
    );
    expect(wrapper.find('CastingControls__ControlsWrapper')).toHaveLength(1);
    expect(wrapper.find('CastingControls__MobileTitleWrappere')).toHaveLength(0);
    expect(wrapper.find('PlaybackControls')).toHaveLength(1);
    expect(wrapper.find('CastingControlsButton')).toHaveLength(3);
    expect(wrapper.find('DisableCastingScreen')).toHaveLength(1);
    expect(wrapper.find('CastingTitle__TitleWrapper')).toHaveLength(1);
    expect(wrapper.find('CastingBadge')).toHaveLength(1);
    expect(wrapper.find('LabelBadge')).toHaveLength(1);
    expect(wrapper.find('Label').prop('text')).toBe('Publicidad');
  });
  it('should render as expected with type type advertising in mobile', () => {
    const wrapper = mount(
      <CastingControls
        {...props}
        isMobile
        onCasting
        type={castingTypes.ADVERTISING}
      />
    );
    expect(wrapper.find('CastingControls__ControlsWrapper')).toHaveLength(1);
    expect(wrapper.find('CastingControls__MobileTitleWrapper')).toHaveLength(1);
    expect(wrapper.find('PlaybackControls')).toHaveLength(1);
    expect(wrapper.find('CastingControlsButton')).toHaveLength(3);
    expect(wrapper.find('DisableCastingScreen')).toHaveLength(1);
    expect(wrapper.find('CastingTitle__TitleWrapper')).toHaveLength(1);
    expect(wrapper.find('CastingBadge')).toHaveLength(1);
    expect(wrapper.find('LabelBadge')).toHaveLength(1);
    expect(wrapper.find('Label').prop('text')).toBe('Publicidad');
  });
  it('should render as expected with type playlist', () => {
    const wrapper = mount(
      <CastingControls
        {...props}
        onCasting
        type={castingTypes.PLAYLIST}
      />
    );
    expect(wrapper.find('CastingControls__ControlsWrapper')).toHaveLength(1);
    expect(wrapper.find('CastingControls__MobileTitleWrappere')).toHaveLength(0);
    expect(wrapper.find('PlaybackControls')).toHaveLength(1);
    expect(wrapper.find('CastingControlsButton')).toHaveLength(3);
    expect(wrapper.find('CastingTitle__TitleWrapper')).toHaveLength(1);
    expect(wrapper.find('CastingBadge')).toHaveLength(1);
    expect(wrapper.find('LabelBadge')).toHaveLength(0);
  });
  it('should render as expected with type clip', () => {
    const wrapper = mount(
      <CastingControls
        {...props}
        onCasting
        type={castingTypes.CLIP}
      />
    );
    expect(wrapper.find('CastingControls__ControlsWrapper')).toHaveLength(1);
    expect(wrapper.find('CastingControls__MobileTitleWrappere')).toHaveLength(0);
    expect(wrapper.find('PlaybackControls')).toHaveLength(1);
    expect(wrapper.find('CastingControlsButton')).toHaveLength(3);
    expect(wrapper.find('CastingFixedButton')).toHaveLength(2);
    expect(wrapper.find('DisableCastingScreen')).toHaveLength(1);
    expect(wrapper.find('CastingTitle__TitleWrapper')).toHaveLength(1);
    expect(wrapper.find('CastingBadge')).toHaveLength(1);
    expect(wrapper.find('LabelBadge')).toHaveLength(0);
  });
  it('should render disable casting screen when active', () => {
    const showScreenCallback = jest.fn();
    const wrapper = mount(
      <CastingControls
        {...props}
        isMobile
        onCasting
        showDisableScreen={false}
        showDisableScreenCallback={showScreenCallback}
        type={castingTypes.LIVESTREAM}
      />
    );
    expect(wrapper.find('DisableCastingScreen')).toHaveLength(1);
    expect(wrapper.find('DisableCastingScreen__ScreenWrapper')).toHaveLength(0);
    wrapper.find('CastingControlsButton').last().simulate('click', 'event');
    expect(showScreenCallback).toBeCalled();
    wrapper.setProps({
      showDisableScreen: true,
    });
    wrapper.update();
    expect(wrapper.find('DisableCastingScreen__ScreenWrapper')).toHaveLength(1);
  });
});
