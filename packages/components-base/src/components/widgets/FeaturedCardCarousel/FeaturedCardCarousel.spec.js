import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import Loadable from 'react-loadable';

import WidgetTracker from '@univision/fe-commons/dist/utils/tracking/tealium/widget/WidgetTracker';

import FeaturedCardCarousel from '.';
import mockData from './mockData.json';

jest.mock('../../Author', () => 'Author');
jest.mock('@univision/fe-icons/dist/components/Icon', () => () => 'Icon');
jest.mock('../../ProgressCircle', () => () => 'ProgressCircle');
jest.mock('../../FeaturedCard', () => 'mock-widget');

jest.useFakeTimers();

beforeEach(() => {
  jest.clearAllTimers();
});

Object.defineProperty(
  document,
  'visibilityState',
  ((_value) => {
    let lng = _value;
    return {
      get: function _get() {
        return lng;
      },
      set: function _set(v) {
        lng = v;
      },
    };
  })(document.visibilityState)
);

/** @test {FeaturedCardCarousel} */
describe('FeaturedCardCarousel Spec', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<FeaturedCardCarousel content={mockData} />, div);
  });

  it('should return a plain FeaturedCard if content length is 1', () => {
    const wrapper = shallow(<FeaturedCardCarousel content={mockData.splice(0, 1)} />);
    expect(wrapper.find('CoreSlider')).toHaveLength(0);
    expect(wrapper.find('mock-widget')).toHaveLength(1);
  });

  it('should return a plain FeaturedCard if content length is 1', () => {
    const props = {
      content: mockData.splice(0, 1),
    };
    props.content[0].type = 'video';
    props.content[0].mcpid = '123';
    const wrapper = shallow(<FeaturedCardCarousel {...props} />);
    expect(wrapper.find('mock-widget').props().mcpId).toBe('123');
  });

  it('should return null if there is no content', () => {
    const wrapper = shallow(<FeaturedCardCarousel content={[]} />);
    expect(wrapper.getElement()).toBeNull();
  });

  it('should call onChangeSlide and set currentSlide with 1', async () => {
    const wrapper = mount(<FeaturedCardCarousel content={mockData} />);
    await Loadable.preloadAll();
    wrapper.update();
    const nextArrow = wrapper.find('.arrowRight');
    nextArrow.simulate('click');
    wrapper.instance().slider.current.props.settings.afterChange(1);
    expect(wrapper.state('currentSlide')).toEqual(1);
  });

  it('should call onChangeSlide and not set currentSlide if it\'s the same', async () => {
    const wrapper = mount(<FeaturedCardCarousel content={mockData} />);
    await Loadable.preloadAll();
    wrapper.update();
    const nextArrow = wrapper.find('.arrowRight');
    nextArrow.simulate('click');
    wrapper.instance().slider.current.props.settings.afterChange(0);
    expect(wrapper.state('currentSlide')).toEqual(0);
  });

  it('should call goToNextSlide and and send it to the first slide when the current slide is the last one', async () => {
    const wrapper = mount(<FeaturedCardCarousel content={mockData} />);
    const instance = wrapper.instance();
    instance.setState({ currentSlide: 4 });
    const nextArrow = wrapper.find('.arrowRight');
    nextArrow.simulate('click');
    wrapper.instance().slider.current.props.settings.afterChange(0);
    expect(wrapper.state('currentSlide')).toEqual(0);
  });

  it('should call goToNextSlide fn with autoplay', async () => {
    const wrapper = shallow(<FeaturedCardCarousel content={mockData} autoPlayDuration={5} />);
    const instance = wrapper.instance();
    instance.goToNextSlide = jest.fn();
    jest.runTimersToTime(6000);
    expect(instance.goToNextSlide).toHaveBeenCalled();
  });

  it('should call goToNextSlide with autoplay and not call the tracker', async () => {
    spyOn(WidgetTracker, 'track');
    const wrapper = mount(<FeaturedCardCarousel content={mockData} autoPlayDuration={4} />);
    const instance = wrapper.instance();
    instance.setState({ timerRunning: true });
    jest.runTimersToTime(6000);
    expect(WidgetTracker.track).not.toHaveBeenCalled();
  });

  it('should call goToPreviousSlide and send it to the last slide when currentSlide is 0', async () => {
    const wrapper = mount(<FeaturedCardCarousel content={mockData} />);
    const instance = wrapper.instance();
    instance.goToSlide = jest.fn();
    const previousArrow = wrapper.find('.arrowLeft');
    previousArrow.simulate('click');
    expect(instance.goToSlide).toHaveBeenCalled();
  });

  it('should send goToPreviousSlide when left arrow is clicked', async () => {
    const wrapper = mount(<FeaturedCardCarousel content={mockData} />);
    const instance = wrapper.instance();
    instance.setState({ currentSlide: 1 });
    instance.goToSlide = jest.fn();
    const previousArrow = wrapper.find('.arrowLeft');
    previousArrow.simulate('click');
    expect(instance.goToSlide).toHaveBeenCalled();
  });

  it('should call goToSlide when a dot is clicked', async () => {
    const wrapper = shallow(<FeaturedCardCarousel content={mockData} autoPlayDuration={5} />);
    const instance = wrapper.instance();
    instance.goToSlide = jest.fn();
    const dot = wrapper.find('.dot').first();
    dot.simulate('click');
    expect(instance.goToSlide).toHaveBeenCalled();
  });

  it('should call onChangeSlide and not set currentSlide if it\'s the same', () => {
    const wrapper = shallow(<FeaturedCardCarousel content={mockData} autoPlayDuration={5} />);
    const instance = wrapper.instance();
    instance.setState({ timerRunning: false });
    instance.goToNextSlide = jest.fn();
    jest.runTimersToTime(6000);
    expect(instance.goToNextSlide).not.toHaveBeenCalled();
  });

  it('should continue playing when the component is visible again', () => {
    const wrapper = shallow(<FeaturedCardCarousel content={mockData} autoPlayDuration={5} />);
    const instance = wrapper.instance();
    instance.setState({ shouldContinuePlaying: true });
    instance.handleSlideVisibilityChange(true);
    expect(wrapper.state('shouldContinuePlaying')).toBeFalsy();
  });

  it('should not cancelTimer if autoplay is disable but it should call widget tracker', () => {
    spyOn(WidgetTracker, 'track');
    const wrapper = mount(<FeaturedCardCarousel content={mockData} disableAutoplay widgetContext={{ type: 'test' }} />);
    const instance = wrapper.instance();
    instance.cancelTimer = jest.fn();
    const nextArrow = wrapper.find('.arrowRight');
    nextArrow.simulate('click');
    expect(instance.cancelTimer).not.toHaveBeenCalled();
    expect(WidgetTracker.track).toHaveBeenLastCalledWith(expect.any(Function), { target: 'nav_arrow', widgetContext: { type: 'test' } });
  });

  it('should not call WidgetTracker with autoplay', () => {
    spyOn(WidgetTracker, 'track');
    const wrapper = mount(<FeaturedCardCarousel content={mockData} autoPlayDuration={4} />);
    const instance = wrapper.instance();
    instance.handleSlideVisibilityChange(true);
    jest.runTimersToTime(5000);
    expect(WidgetTracker.track).not.toHaveBeenCalled();
  });

  it('should remove listeners when unmounts', () => {
    global.removeEventListener = jest.fn();
    const wrapper = mount(<FeaturedCardCarousel content={mockData} />);
    wrapper.unmount();
    expect(global.removeEventListener).toHaveBeenCalled();
  });

  it('should not remove listeners when unmounts if autoplay is disabled', () => {
    global.removeEventListener = jest.fn();
    const wrapper = mount(<FeaturedCardCarousel content={mockData} disableAutoplay />);
    wrapper.unmount();
    expect(global.removeEventListener).toHaveBeenCalled();
  });

  it('should pause the autoplay when visibility changes', () => {
    document.visibilityState = 'hidden';
    const wrapper = mount(<FeaturedCardCarousel content={mockData} autoPlayDuration={3} />);
    window.scrollTo(0, document.body.scrollHeight);
    wrapper.instance().onVisibilityChange();
    expect(wrapper.state('timerRunning')).toBe(false);
  });

  it('should not pause the autoplay when visibility changes', () => {
    document.visibilityState = 'show';
    const wrapper = shallow(<FeaturedCardCarousel content={mockData} autoPlayDuration={3} />);
    window.scrollTo(0, document.body.scrollHeight);
    wrapper.instance().onVisibilityChange();
    expect(wrapper.state('timerRunning')).toBe(true);
  });

  it('should not pause the autoplay if visibility equals null', () => {
    document.visibilityState = null;
    const wrapper = mount(<FeaturedCardCarousel content={mockData} autoPlayDuration={3} />);
    window.scrollTo(0, document.body.scrollHeight);
    wrapper.instance().onVisibilityChange();
    expect(wrapper.state('timerRunning')).toBe(false);
  });

  it('should pause the autoplay when pause is clicked', () => {
    const wrapper = mount(<FeaturedCardCarousel content={mockData} autoPlayDuration={3} />);
    const instance = wrapper.instance();
    instance.setState({ timerRunning: true });
    jest.runTimersToTime(4000);
    const playPauseButton = wrapper.find('.control');
    playPauseButton.simulate('click');
    expect(wrapper.state('timerRunning')).toBe(false);
  });

  it('should resume the autoplay when play is clicked', () => {
    const wrapper = shallow(<FeaturedCardCarousel content={mockData} autoPlayDuration={3} />);
    wrapper.instance().timer = null;
    const playPauseButton = wrapper.find('.control');
    playPauseButton.simulate('click');
    expect(wrapper.state('timerRunning')).toBe(true);
  });

  it('should cancel autoplay and call tracker when the user swipes', async () => {
    spyOn(WidgetTracker, 'track');
    const wrapper = mount(<FeaturedCardCarousel content={mockData} autoPlayDuration={3} />);
    await Loadable.preloadAll();
    wrapper.update();
    const slider = wrapper.find('CoreSlider').at(0);
    slider.props().settings.onSwipe();
    expect(WidgetTracker.track).toHaveBeenLastCalledWith(expect.any(Function), { target: 'feature_nav', widgetContext: {} });
  });
});
