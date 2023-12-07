import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import Features from '@univision/fe-commons/dist/config/features';
import Store from '@univision/fe-commons/dist/store/store';
import * as horizontalSlideshowActions from '@univision/fe-commons/dist/store/actions/slideshow/horizontal-slideshow-actions';
import SlideshowTracker from '@univision/fe-commons/dist/utils/tracking/tealium/slideshow/SlideshowTracker';
import SlideshowProvider from './SlideshowProvider';

jest.mock('@univision/fe-commons/dist/utils/tracking/tealium/slideshow/SlideshowTracker', () => ({
  events: {
    start: jest.fn(),
    change: jest.fn(),
  },
  track: jest.fn(),
}));

jest.mock('../Ads/AdBelowSlideshow', () => jest.fn(() => <div>ad below slideshow</div>));

jest.useFakeTimers();
global.history.replaceState = jest.fn();

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

/** @test {SlideshowProvider} */
describe('SlideshowProvider', () => {
  const props = {
    title: 'example title',
    uid: '123456789',
    autoplay: true,
    autoplayDuration: 7,
    endSlideIndex: 30,
    slideImageIds: ['0', '1', '2'],
    slides: [
      {
        image: {
          href: 'http://univision.com',
        },
      },
    ],
    children: () => <div />,
  };

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SlideshowProvider {...props} />, div);
  });

  it('should set timerRunning to true if timer does not exist', () => {
    const wrapper = shallow(<SlideshowProvider {...props} />);
    const instance = wrapper.instance();
    instance.timer = false;
    instance.toggleAutoplay();
    expect(wrapper.state().timerRunning).toEqual(true);
  });

  it('should clear the timer if it exists on initTimer', () => {
    global.clearInterval = jest.fn();
    const wrapper = shallow(<SlideshowProvider {...props} />);
    const instance = wrapper.instance();
    instance.timer = {};
    instance.initTimer();
    expect(global.clearInterval).toHaveBeenCalled();
  });

  it('should invoke onAutoplay', () => {
    const onAutoplay = jest.fn();
    const wrapper = shallow(<SlideshowProvider {...props} onAutoplay={onAutoplay} />);
    wrapper.instance().initTimer();
    jest.runTimersToTime(10000);
    expect(onAutoplay).toHaveBeenCalled();
  });

  it('should not invoke onAutoplay if undefined', () => {
    const wrapper = shallow(<SlideshowProvider {...props} onAutoplay={null} />);
    wrapper.instance().initTimer();
    jest.runTimersToTime(10000);
  });

  it('should update active slide progress', () => {
    const wrapper = shallow(<SlideshowProvider {...props} />);
    jest.clearAllTimers();
    wrapper.instance().initTimer();
    jest.runTimersToTime(3000);
    expect(wrapper.state().timerFrame).toEqual(3);
  });

  it('should not update active slide progress if not running', () => {
    const wrapper = shallow(<SlideshowProvider {...props} autoplay={false} />);
    wrapper.instance().initTimer();
    jest.runTimersToTime(3000);
    expect(wrapper.state().timerFrame).toEqual(0);
  });

  it('should update active slide index', () => {
    const wrapper = shallow(<SlideshowProvider {...props} />);
    jest.clearAllTimers();
    wrapper.instance().initTimer();
    jest.runTimersToTime(7100);
    expect(wrapper.state().activeSlideIndex).toEqual(0);
  });

  it('should have toggleAutoplay pause the timer correctly', () => {
    const wrapper = shallow(<SlideshowProvider {...props} />);
    // stop timer (autoplay was set in the props)
    wrapper.instance().toggleAutoplay();
    expect(wrapper.state().timerRunning).toBe(false);
  });

  it('should pause timer in state', () => {
    const wrapper = shallow(<SlideshowProvider {...props} />);
    wrapper.instance().pauseTimer();
    expect(wrapper.state().timerRunning).toEqual(false);
  });

  it('should go to prev slide', () => {
    const wrapper = shallow(<SlideshowProvider {...props} />);
    const instance = wrapper.instance();
    const setActiveSlideSpy = jest.spyOn(instance, 'setActiveSlide');
    instance.setState({ activeSlideIndex: 1 });
    instance.goToPrevSlide();
    expect(setActiveSlideSpy).toHaveBeenCalledWith(0);
  });

  it('should go to prev slideshow', () => {
    jest.spyOn(Features.slideshows.horizontal, 'stitchingEnabled').mockReturnValue(true);
    const dispatchArg = jest.fn();
    const goToPreviousSlideshowSpy = jest.spyOn(
      horizontalSlideshowActions,
      'goToPreviousSlideshow'
    ).mockReturnValue(dispatchArg);
    const dispatchSpy = jest.spyOn(Store, 'dispatch');
    const wrapper = shallow(<SlideshowProvider {...props} isFirstSlideshow={false} />);
    const instance = wrapper.instance();

    instance.setState({ activeSlideIndex: 0 });
    instance.goToPrevSlide();

    expect(goToPreviousSlideshowSpy).toHaveBeenCalled();
    expect(dispatchSpy).toHaveBeenCalledWith(dispatchArg);
  });

  it('should go to next slide', () => {
    const wrapper = shallow(<SlideshowProvider {...props} />);
    const instance = wrapper.instance();
    const setActiveSlideSpy = jest.spyOn(instance, 'setActiveSlide');
    instance.setState({ activeSlideIndex: 1 });
    instance.goToNextSlide();
    expect(setActiveSlideSpy).toHaveBeenCalledWith(2);
  });

  it('should go to the next slideshow', () => {
    jest.spyOn(Features.slideshows.horizontal, 'stitchingEnabled').mockReturnValue(true);
    const dispatchArg = jest.fn();
    const goToNextSlideshowSpy = jest.spyOn(
      horizontalSlideshowActions,
      'goToNextSlideshow'
    ).mockReturnValue(dispatchArg);
    const dispatchSpy = jest.spyOn(Store, 'dispatch');
    const wrapper = shallow(<SlideshowProvider {...props} endSlideIndex={10} />);
    const instance = wrapper.instance();
    const isFinalSlide = jest.spyOn(instance, 'isFinalSlide');

    instance.setState({ activeSlideIndex: 10 });
    instance.goToNextSlide();

    expect(isFinalSlide).toHaveBeenCalled();
    expect(goToNextSlideshowSpy).toHaveBeenCalled();
    expect(dispatchSpy).toHaveBeenCalledWith(dispatchArg);
  });

  it('should not go to previous slide if at the beginning of an inline slideshow', () => {
    const wrapper = shallow(<SlideshowProvider {...props} type="inline" />);
    const instance = wrapper.instance();
    const setActiveSlideSpy = jest.spyOn(instance, 'setActiveSlide');
    instance.goToPrevSlide();
    expect(setActiveSlideSpy).not.toHaveBeenCalled();
  });

  it('should not go to next slide if at the end of an inline slideshow', () => {
    const wrapper = shallow(<SlideshowProvider {...props} endSlideIndex={0} type="inline" />);
    const instance = wrapper.instance();
    const setActiveSlideSpy = jest.spyOn(instance, 'setActiveSlide');
    instance.goToNextSlide();
    expect(setActiveSlideSpy).not.toHaveBeenCalled();
  });

  it('should restart a slideshow', () => {
    const wrapper = shallow(<SlideshowProvider {...props} />);
    wrapper.instance().restartSlideshow();
    expect(wrapper.instance().state.activeSlideIndex).toBe(0);
  });

  it('should cancel the timer on the last slide of an inline slideshow', () => {
    const wrapper = shallow(
      <SlideshowProvider {...props} endSlideIndex={10} type="inline" />
    );
    const instance = wrapper.instance();
    instance.cancelTimer = jest.fn();
    instance.timer = true;
    wrapper.setState({ activeSlideIndex: 10 });
    instance.componentDidUpdate({}, { activeSlideIndex: 0 });
    expect(instance.cancelTimer).toHaveBeenCalled();
  });

  it('should not cancel the timer on last slide if no nextslideshow if no timer', () => {
    const wrapper = shallow(
      <SlideshowProvider {...props} endSlideIndex={10} nextSlideshow={null} />
    );
    const instance = wrapper.instance();
    instance.cancelTimer = jest.fn();
    instance.timer = false;
    wrapper.setState({ activeSlideIndex: 10 });
    expect(instance.cancelTimer).not.toHaveBeenCalled();
  });

  it('should not init timer on replay if not autoplay', () => {
    const wrapper = shallow(<SlideshowProvider {...props} autoplay={false} />);
    const instance = wrapper.instance();
    instance.initTimer = jest.fn();
    instance.restartSlideshow();
    expect(instance.initTimer).not.toHaveBeenCalled();
  });

  it('should not init timer on mount if not autoplay', () => {
    const wrapper = shallow(<SlideshowProvider {...props} autoplay={false} />);
    const instance = wrapper.instance();
    instance.initTimer = jest.fn();
    instance.componentDidMount();
    expect(instance.initTimer).not.toHaveBeenCalled();
  });

  it('should clearInterval on unmount', () => {
    global.clearInterval = jest.fn();
    const wrapper = shallow(<SlideshowProvider {...props} />);
    wrapper.instance().componentWillUnmount();
    expect(global.clearInterval).toHaveBeenCalled();
  });

  it('should clearInterval when cancel timer is called', () => {
    global.clearInterval = jest.fn();
    const wrapper = shallow(<SlideshowProvider {...props} />);
    wrapper.instance().cancelTimer();
    expect(global.clearInterval).toHaveBeenCalled();
    expect(wrapper.instance().timer).toBe(null);
  });

  it('should pause the autoplay when share button is clicked', () => {
    const wrapper = shallow(<SlideshowProvider {...props} />);
    wrapper.instance().onShareClick();
    expect(wrapper.state('timerRunning')).toBe(false);
  });

  it('should pause the autoplay when visibility changes', () => {
    document.visibilityState = 'hidden';
    const wrapper = shallow(<SlideshowProvider {...props} />);
    window.scrollTo(0, document.body.scrollHeight);
    wrapper.instance().onVisibilityChange();
    expect(wrapper.state('timerRunning')).toBe(false);
  });

  it('should not pause the autoplay when document is visible', () => {
    document.visibilityState = 'show';
    const wrapper = shallow(<SlideshowProvider {...props} />);
    window.scrollTo(0, document.body.scrollHeight);
    wrapper.instance().onVisibilityChange();
    expect(wrapper.state('timerRunning')).toBe(true);
  });

  it('should noopFallback (noop function) returns null', () => {
    expect(SlideshowProvider.noopFallback()).toEqual(null);
  });

  it('should not set hash if type is inline', () => {
    global.location.hash = '#523';
    const wrapper = shallow(<SlideshowProvider {...props} type="inline" />);
    expect(wrapper.state().activeSlideIndex).not.toEqual(2);
  });

  it('should not update hash if type is inline', () => {
    global.location.hash = '#3124';
    const wrapper = shallow(<SlideshowProvider {...props} type="inline" />);
    wrapper.instance().componentDidUpdate({}, { activeSlideIndex: 0 });
    expect(wrapper.state().activeSlideIndex).not.toEqual('3124');
  });

  it('should add activeSlideIndex if url has hash', () => {
    global.location.hash = '#2';
    const wrapper = shallow(<SlideshowProvider {...props} />);
    expect(wrapper.state().activeSlideIndex).toEqual(2);
  });

  it('should call replaceState if activeSlideIndex exists', () => {
    const wrapper = shallow(<SlideshowProvider {...props} />);
    const instance = wrapper.instance();
    instance.componentDidUpdate({}, { activeSlideIndex: 1 });
    expect(global.history.replaceState).toHaveBeenCalled();
  });

  it('should call replaceState if activeSlideIndex is different to prevState', () => {
    const wrapper = shallow(<SlideshowProvider {...props} />);
    const instance = wrapper.instance();
    instance.setState({ activeSlideIndex: 0 });
    instance.componentDidUpdate({}, { activeSlideIndex: 0 });
    expect(global.history.replaceState).toHaveBeenCalled();
  });

  it('should call replaceState if location hash exists', () => {
    window.location.hash = '#ffc8748f0000';
    const wrapper = shallow(<SlideshowProvider {...props} />);
    const instance = wrapper.instance();
    instance.setState({ activeSlideIndex: 10 });
    instance.componentDidUpdate({}, { activeSlideIndex: 11 });
    expect(global.history.replaceState).toHaveBeenCalled();
  });

  it('should remove hash from url if not on image slide', () => {
    global.location.hash = '#3';
    const wrapper = shallow(<SlideshowProvider {...props} />);
    wrapper.instance().componentDidUpdate({}, { activeSlideIndex: 0 });
    expect(global.history.replaceState).toHaveBeenCalled();
  });

  it('should not call tracker if doesn not have slides', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    const wrapper = shallow(<SlideshowProvider {...props} autoplay={false} slides={null} />);
    const instance = wrapper.instance();
    const SlideshowTrackerSpy = spyOn(SlideshowTracker, 'track');
    instance.componentDidMount();
    expect(SlideshowTrackerSpy).not.toHaveBeenCalled();
  });

  it('should call tracker with correct slides length when it has opening card', () => {
    const slides = [{ name: 'test' }, { name: 'test2' }, { name: 'test3' }, { name: 'test4' }];
    const slideshowTitle = 'test title';
    const slideshowUid = '123456';
    global.location.hash = '#2';
    const SlideshowTrackerSpy = jest.spyOn(SlideshowTracker, 'track');
    mount(
      <SlideshowProvider
        {...props}
        autoplay={false}
        hasOpeningCard
        slides={slides}
        title={slideshowTitle}
        uid={slideshowUid}
      />
    );

    expect(SlideshowTrackerSpy)
      .toHaveBeenCalledWith(
        SlideshowTracker.events.change,
        expect.objectContaining({
          slidesLength: slides.length - 1,
        })
      );
  });

  it('should preserve hash in url if not on image slide', () => {
    global.location.hash = '#aweb';
    const wrapper = shallow(<SlideshowProvider {...props} />);
    wrapper.setState({ activeSlideIndex: 4 });
    wrapper.instance().componentDidUpdate({}, { activeSlideIndex: 1 });
    expect(global.history.replaceState).toHaveBeenCalled();
  });

  it('should not send to cover image when duplicate ids are present', () => {
    global.location.hash = '#test';
    const slideImageIds = ['test', 'test', 'end'];
    const wrapper = shallow(<SlideshowProvider {...props} type="default" slideImageIds={slideImageIds} />);
    const instance = wrapper.instance();
    instance.componentDidMount();
    expect(instance.state.activeSlideIndex).toBe(1);
  });

  it('should correctly restart timer when it needs to', () => {
    const wrapper = shallow(<SlideshowProvider {...props} />);
    wrapper.setState({ timerFrame: 5, activeSlideProgress: 50 });
    wrapper.instance().restartTimer();
    const state = wrapper.state();

    expect(state.timerFrame).toBe(0);
    expect(state.activeSlideProgress).toBe(0);
  });

  it('should automatically go to next slideshow if autoplay is on', () => {
    jest.spyOn(Features.slideshows.horizontal, 'stitchingEnabled').mockReturnValue(true);
    const dispatchSpy = jest.spyOn(Store, 'dispatch');
    const dispatchArg = jest.fn();
    const goToNextSlideshowSpy = jest.spyOn(
      horizontalSlideshowActions,
      'goToNextSlideshow'
    ).mockReturnValue(dispatchArg);
    const wrapper = shallow(
      <SlideshowProvider
        {...props}
        endSlideIndex={4}
        isFinalSlideshow={false}
      />
    );
    const instance = wrapper.instance();
    const restartTimerSpy = jest.spyOn(instance, 'restartTimer');

    instance.triggerNextSlideshow();

    expect(goToNextSlideshowSpy).toHaveBeenCalled();
    expect(dispatchSpy).toHaveBeenCalledWith(dispatchArg);
    expect(restartTimerSpy).toHaveBeenCalled();
  });

  it('should set the final slide as active and refresh ads if going back to previous slideshow', () => {
    const wrapper = shallow(<SlideshowProvider {...props} />);
    const instance = wrapper.instance();
    const handleSlideshowChange = jest.spyOn(instance, 'handleSlideshowChange');
    const prevProps = { currentSlideshowIndex: 10 };
    const currentProps = {
      currentSlideshowIndex: 9,
      endSlideIndex: 12,
      endSlideNumber: 13,
    };

    instance.checkIfWentToPreviousSlideshow(prevProps, currentProps);

    expect(handleSlideshowChange).toHaveBeenCalledWith({
      newActiveSlideIndex: currentProps.endSlideIndex,
      slideshowPageViewNumber: currentProps.endSlideNumber,
    });
  });

  it('should set the first slide as active and refresh ads if going to next slideshow', () => {
    const wrapper = shallow(<SlideshowProvider {...props} />);
    const instance = wrapper.instance();
    const handleSlideshowChange = jest.spyOn(instance, 'handleSlideshowChange');
    const prevProps = { currentSlideshowIndex: 10 };
    const currentProps = { currentSlideshowIndex: 11 };

    instance.checkIfWentToNextSlideshow(prevProps, currentProps);

    expect(handleSlideshowChange).toHaveBeenCalledWith({
      newActiveSlideIndex: 0,
      slideshowPageViewNumber: 1,
    });
  });

  it('should handle slideshow change correctly', () => {
    const wrapper = shallow(<SlideshowProvider {...props} />);
    const instance = wrapper.instance();
    const setActiveSlideIndexSpy = jest.spyOn(instance, 'setActiveSlide');
    const trackHorizontalSlideshowPageViewSpy = jest.spyOn(
      instance,
      'trackHorizontalSlideshowPageView'
    );

    instance.handleSlideshowChange({
      newActiveSlideIndex: 3,
      slideshowPageViewNumber: 4,
    });

    expect(setActiveSlideIndexSpy).toHaveBeenCalledWith(3);
    expect(setActiveSlideIndexSpy).toHaveBeenCalledTimes(1);
    expect(trackHorizontalSlideshowPageViewSpy).toHaveBeenCalledWith(4);
    expect(trackHorizontalSlideshowPageViewSpy).toHaveBeenCalledTimes(1);
  });

  it('should have timerLogic trigger the next slideshow if necessary', () => {
    const wrapper = shallow(
      <SlideshowProvider
        {...props}
        endSlideIndex={4}
        isFinalSlideshow={false}
      />
    );
    const instance = wrapper.instance();
    const triggerNextSlideshowSpy = jest.spyOn(instance, 'triggerNextSlideshow');

    wrapper.setState({ timerFrame: 8, activeSlideIndex: 4 });
    instance.timerLogic();
    expect(triggerNextSlideshowSpy).toHaveBeenCalled();
  });

  it('should not have triggerNextSlideshow try to go to next slideshow if HSS is disabled', () => {
    jest.spyOn(Features.slideshows.horizontal, 'stitchingEnabled').mockReturnValue(false);
    const dispatchSpy = jest.spyOn(Store, 'dispatch');
    const goToNextSlideshowSpy = jest.spyOn(
      horizontalSlideshowActions,
      'goToNextSlideshow'
    );
    const wrapper = shallow(
      <SlideshowProvider
        {...props}
        endSlideIndex={4}
        isFinalSlideshow={false}
      />
    );
    const instance = wrapper.instance();
    const restartTimerSpy = jest.spyOn(instance, 'restartTimer');

    instance.triggerNextSlideshow();

    expect(goToNextSlideshowSpy).not.toHaveBeenCalled();
    expect(dispatchSpy).not.toHaveBeenCalled();
    expect(restartTimerSpy).not.toHaveBeenCalled();
  });

  it('should track a slideshow page view with image position', () => {
    const trackSpy = jest.spyOn(SlideshowTracker, 'track');
    const activeSlideNumber = 4;
    const wrapper = shallow(<SlideshowProvider {...props} hasOpeningCard={false} />);

    wrapper.instance().trackHorizontalSlideshowPageView(activeSlideNumber);

    expect(trackSpy)
      .toHaveBeenCalledWith(
        SlideshowTracker.events.slideshowPageView,
        {
          activeSlideNumber,
          shouldTrackImagePosition: true,
          title: props.title,
          uid: props.uid,
        },
      );
  });

  it('should track a slideshow page view without image position when mounting on opening card', () => {
    const trackSpy = jest.spyOn(SlideshowTracker, 'track');
    const activeSlideNumber = 0;
    const wrapper = shallow(<SlideshowProvider {...props} hasOpeningCard />);

    wrapper.instance().trackHorizontalSlideshowPageView(activeSlideNumber);

    expect(trackSpy)
      .toHaveBeenCalledWith(
        SlideshowTracker.events.slideshowPageView,
        {
          activeSlideNumber,
          shouldTrackImagePosition: false,
          title: props.title,
          uid: props.uid,
        },
      );
  });
});
