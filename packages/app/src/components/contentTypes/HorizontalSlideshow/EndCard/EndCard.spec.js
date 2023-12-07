/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable require-jsdoc */
import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';
import SocialTracker from '@univision/fe-commons/dist/utils/tracking/tealium/social/SocialTracker';
import Features from '@univision/fe-commons/dist/config/features';
// eslint-disable-next-line no-restricted-imports
import configureStore from '@univision/fe-commons/dist/store/configureStore';
import ContentCardGrid from '@univision/fe-components-base/dist/components/widgets/ContentCardGrid';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import SlideshowTracker from '@univision/fe-commons/dist/utils/tracking/tealium/slideshow/SlideshowTracker';
import * as createTimer from '@univision/fe-commons/dist/utils/timer';
import * as helpers from '@univision/fe-commons/dist/utils/helpers';
import ConnectedEndCard, { EndCard } from '.';

const Store = configureStore();

helpers.toAbsoluteUrl = jest.fn();
helpers.locationRedirect = jest.fn(() => jest.fn());

const mockPerformance = { now: jest.fn() };
const performanceSpy = jest.spyOn(global, 'performance', 'get');

performanceSpy.mockImplementation(() => mockPerformance);

jest.useFakeTimers();
jest.mock('react-loadable');
jest.mock('@univision/fe-components-base/dist/components/ContentCard', () => {
  const ContentCard = ({ onClick }) => <button type="button" onClick={onClick}>test</button>;

  return ContentCard;
});

const getBoundingClientRect = jest.fn(() => ({
  width: 300,
  height: 300,
  top: -310,
  left: 0,
  bottom: 0,
  right: 0,
}));

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
  })(document.visibilityState),
);

/** @test {EndCard} */
describe('EndCard', () => {
  const timer = {
    start: jest.fn(),
    stop: jest.fn(),
    cancel: jest.fn(),
  };
  const mockEvent = {
    preventDefault: jest.fn(),
    currentTarget: {
      getAttribute: jest.fn(),
    },
  };
  const props = {
    data: [
      {
        mainImage: {
          href: 'http://univision-bs.s3.amazonaws.com/0b/25/5f29b0704700a8ae089958ee54d2/e5.jpg',
          uid: '0000015c-a4cc-d8ae-abde-eeff3c960001',
          title: 'test 2',
        },
        title:
          'Arranca el ensayo oficial de cara a Rusia 2018 y estas son las cartas de presentación de la Copa Confederaciones.',
        slideCount: 5,
        url: 'https://www.google.com',
      },
      {
        mainImage: {
          href: 'http://univision-bs.s3.amazonaws.com/7c/c8/5222b323473db13cd593534feb33/e1.jpg',
          uid: '0000015c-a4cc-d8ae-abde-eeff3c960002',
          title: 'test 3',
        },
        title:
          'El póster oficial de la ciudad sede de Kazan tiene al animal simbólico de la República de Tartaristán: el leopardo de las nieves.',
        slideCount: 15,
        url: 'https://www.google.com',
      },
      {
        mainImage: {
          href:
            'http://univision-bs.s3.amazonaws.com/f9/9a/d97be88b4b7fb80b13a7599060f0/gettyimages-56469369.jpg',
          uid: '0000015c-a4cc-d8ae-abde-eeff3c960003',
          title: 'test 4',
        },
        title:
          'El leopardo de las nieves está en peligro de extinción. En 2003 se calculaba una población mundial de casi siete mil adultos. Hoy día, el número sigue siendo inferior a diez mil.',
        slideCount: 30,
        url: 'https://www.google.com',
      },
      {
        mainImage: {
          href:
            'http://univision-bs.s3.amazonaws.com/26/7e/d4e62329401b992d02d8cb38afba/gettyimages-480411022.jpg',
          uid: '0000015c-a4cc-d8ae-abde-eeff3c960004',
          title: 'test 5',
        },
        title:
          'La Arena Kazan fue inaugurada en 2013 y reemplazó al Estadio Central como el recinto futbolístico de una de las ciudades más importantes de la Federación Rusa. Costó 450 millones de dólares.',
        slideCount: 20,
        url: 'https://www.google.com',
      },
      {
        mainImage: {
          href:
            'http://univision-bs.s3.amazonaws.com/97/b4/217d0c2e4c8593283136ee47fb81/gettyimages-480412580.jpg',
          uid: '0000015c-59c4-d938-a15e-d9df74110005',
          title: 'test 6',
        },
        title:
          'En el 2015 le fueron adaptadas piscinas olímpicas y un techo retráctil para el Mundial de Natación.',
        slideCount: 10,
        url: 'https://www.google.com',
      },
    ],
    shareData: {
      title: 'test',
      uid: '0000015c-a4cc-d8ae-abde-eeff3c960006',
      primaryTag: {
        name: 'EndCard',
        link: null,
      },
    },
    autoplayDuration: 7,
    onRestartClick: jest.fn(),
    onHideAdByIds: jest.fn(),
    onShouldRefresh: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllTimers();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render without crashing', () => {
    const div = document.createElement('div');

    act(() => {
      ReactDOM.render(
        <Provider store={Store}>
          <ConnectedEndCard {...props} />
        </Provider>,
        div,
      );
    });
  });

  it('should add the visibilitychange & scroll event listener on mount', () => {
    global.addEventListener = jest.fn();
    const wrapper = shallow(<EndCard {...props} />);
    wrapper.instance().componentDidMount();
    expect(global.addEventListener).toHaveBeenCalled();
  });

  it('should call onCardVisibility when is passed as prop', () => {
    global.addEventListener = jest.fn();
    const onCardVisibility = jest.fn();
    const wrapper = shallow(<EndCard {...props} onCardVisibility={onCardVisibility} />);
    wrapper.instance().componentDidMount();

    expect(onCardVisibility).toHaveBeenCalled();
  });

  it('should not call onCardVisibility when is not passed as prop', () => {
    global.addEventListener = jest.fn();
    const onCardVisibility = jest.fn();
    const wrapper = shallow(<EndCard {...props} />);
    wrapper.instance().componentDidMount();

    expect(onCardVisibility).not.toHaveBeenCalled();
  });

  it('should remove visibilitychange & scroll event listener on unmount', () => {
    global.removeEventListener = jest.fn();
    const wrapper = shallow(<EndCard {...props} />);
    wrapper.instance().componentWillUnmount();
    expect(global.removeEventListener).toHaveBeenCalled();
  });

  it('should clear the timer on unmount', () => {
    const wrapper = shallow(<EndCard {...props} />);
    const instance = wrapper.instance();
    instance.timer = timer;
    instance.componentWillUnmount();
    expect(instance.timer.cancel).toHaveBeenCalled();
  });

  it('should change the timeRunning state when onTogglePlaying is called', () => {
    const wrapper = shallow(
      <EndCard {...props} />,
    );

    act(() => {
      wrapper.instance().initTimer();
      wrapper.instance().onTogglePlaying();
      expect(wrapper.state('timerRunning')).toEqual(true);
      wrapper.instance().onTogglePlaying();
    });
    expect(wrapper.state('timerRunning')).toEqual(false);
  });

  it('should call timer stop if time is running', () => {
    const wrapper = mount(<EndCard {...props} />);
    const stopSpy = spyOn(timer, 'stop');
    const instance = wrapper.instance();
    instance.timer = timer;
    instance.setState({ timerRunning: false });
    instance.onTogglePlaying();
    expect(stopSpy).toHaveBeenCalled();
  });

  it('should track a click to related gallery - with event', () => {
    const node = Features.slideshows.horizontal.stitchingEnabled()
      ? 'ContentCard'
      : ContentCardGrid;
    spyOn(SlideshowTracker, 'track');
    const wrapper = shallow(<EndCard {...props} />);
    wrapper.find(node).first().simulate('click', mockEvent);
    jest.runAllTimers();
    expect(SlideshowTracker.track).toHaveBeenCalledTimes(1);
  });

  it('should not change the timerRunning value if timer is not defined', () => {
    const wrapper = shallow(<EndCard {...props} />);
    const instance = wrapper.instance();
    instance.timer = null;
    instance.onTogglePlaying();
    expect(wrapper.state('timerRunning')).toEqual(false);
  });

  it('should reset the state when onRestartClick is called', () => {
    const wrapper = mount(<EndCard {...props} />);
    const instance = wrapper.instance();
    const resetTimerSpy = spyOn(instance, 'resetTimer');
    const hideBottomAdSpy = spyOn(instance, 'hideBottomAdAndStatus');
    instance.timer = timer;
    instance.onRestartClick();
    expect(resetTimerSpy).toHaveBeenCalled();
    expect(hideBottomAdSpy).toHaveBeenCalled();
  });

  it('should not reset the state if timer is not defined', () => {
    const wrapper = shallow(<EndCard {...props} />);
    const instance = wrapper.instance();
    const resetTimerSpy = spyOn(instance, 'resetTimer');
    instance.timer = null;
    instance.onRestartClick();
    expect(resetTimerSpy).not.toHaveBeenCalled();
  });

  it('should save the current tick in the onCurrentTick method', () => {
    const wrapper = mount(<EndCard {...props} />);
    const instance = wrapper.instance();
    instance.timer = timer;
    instance.onCurrentTick(1);
    expect(wrapper.state('timerFrame')).toBe(1);
    expect(wrapper.state('activeSlideProgress')).toBe(0.00014285714285714287);
  });

  it('should pause the state if timerControl is called and this.timer exists', () => {
    const wrapper = mount(<EndCard {...props} />);
    const instance = wrapper.instance();
    const pauseTimerSpy = jest.spyOn(instance, 'pauseTimer');
    instance.timer = timer;
    instance.container.current.getBoundingClientRect = getBoundingClientRect;
    instance.timerControl();
    expect(pauseTimerSpy).toHaveBeenCalled();
  });

  it('should not reset the state if timerControl is called and this.timer not exists', () => {
    const wrapper = mount(<EndCard {...props} />);
    const instance = wrapper.instance();
    const resetTimerSpy = jest.spyOn(instance, 'resetTimer');
    instance.timer = null;
    instance.container.current.getBoundingClientRect = getBoundingClientRect;
    instance.timerControl();
    expect(resetTimerSpy).not.toHaveBeenCalled();
  });

  it('should call timer cancel if timer exists and initTimer is called', () => {
    const wrapper = shallow(<EndCard {...props} />);
    const instance = wrapper.instance();
    const cancelSpy = jest.spyOn(timer, 'cancel');
    instance.timer = timer;
    instance.initTimer();
    expect(cancelSpy).toHaveBeenCalled();
  });

  it('should redirect the page when interval ends', () => {
    const wrapper = shallow(<EndCard {...props} />);
    const instance = wrapper.instance();
    instance.timer = timer;
    instance.onIntervalEnd();
    expect(wrapper.state('timerFrame')).toBe(0);
  });

  it('should pause the timer when the method is called', () => {
    const wrapper = shallow(<EndCard {...props} />);
    wrapper.instance().timer = timer;
    wrapper.instance().pauseTimer();
    expect(wrapper.state('timerRunning')).toBe(false);
  });

  it('should show the playButton when endCard is visible', () => {
    const wrapper = shallow(<EndCard {...props} />);
    wrapper.instance().timer = timer;
    wrapper.instance().timerControl();
    expect(wrapper.state('timerRunning')).toBe(false);
    expect(wrapper.state('showPlayButton')).toBe(undefined);
  });

  it('should pause the time when onShareBarClick is called', () => {
    const SocialTrackerSpy = spyOn(SocialTracker, 'track');
    const wrapper = shallow(<EndCard {...props} device="desktop" slideshowType="horizontal" />);
    const instance = wrapper.instance();
    const pauseTimerSpy = jest.spyOn(instance, 'pauseTimer');
    instance.timer = timer;
    wrapper.find('ShareBar').simulate('click', 'facebook');
    expect(pauseTimerSpy).toHaveBeenCalled();
    expect(SocialTrackerSpy).toBeCalled();
  });

  it('should pause timer when visibility changes', () => {
    document.visibilityState = 'hidden';
    const wrapper = shallow(<EndCard {...props} />);
    const instance = wrapper.instance();
    const pauseTimerSpy = jest.spyOn(instance, 'pauseTimer');
    instance.timer = timer;
    instance.onVisibilityChange();
    expect(pauseTimerSpy).toHaveBeenCalled();
    instance.timer = null;
    instance.onVisibilityChange();
  });

  it('should not pause timer when visibility not changed', () => {
    document.visibilityState = 'show';
    const wrapper = shallow(<EndCard {...props} />);
    const instance = wrapper.instance();
    const pauseTimerSpy = jest.spyOn(instance, 'pauseTimer');
    instance.timer = timer;
    instance.onVisibilityChange();
    expect(pauseTimerSpy).not.toHaveBeenCalled();
  });

  it('should limit the content to 3 for mobile', () => {
    const wrapper = shallow(<EndCard device="mobile" {...props} />);
    let dataMapping;
    act(() => {
      dataMapping = wrapper.instance().dataMapping();
    });
    expect(dataMapping).toHaveLength(3);
  });

  it('should limit the content to 5 for desktop', () => {
    const wrapper = shallow(<EndCard {...props} device="desktop" />);
    const dataMapping = wrapper.instance().dataMapping();
    expect(dataMapping).toHaveLength(5);
  });

  it('should not call dataMapping if data is empty', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    const wrapper = shallow(<EndCard {...props} data={undefined} />);
    const instance = wrapper.instance();
    const dataMapping = instance.dataMapping();
    expect(instance.data).toEqual(undefined);
    expect(dataMapping).toHaveLength(0);
  });

  it('should not call timerControl if timer is defined', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    const wrapper = shallow(<EndCard {...props} data={undefined} />);
    const instance = wrapper.instance();
    const timerControlSpy = jest.spyOn(instance, 'timerControl');
    instance.timer = 200;
    instance.componentDidMount();
    expect(timerControlSpy).not.toHaveBeenCalled();
  });

  it('should render the correct horizontal slideshow desktop end card', () => {
    jest.spyOn(Features.slideshows.horizontal, 'stitchingEnabled').mockReturnValue(true);
    const wrapper = shallow(<EndCard {...props} slideshowType="horizontal" device="desktop" />);

    expect(wrapper.find('.vertical').length).toBe(0);
    expect(wrapper.find('.horizontalSlideshowDesktopEndCard').length).toBe(1);
    expect(wrapper.find('.nextSlideshowsListContainer').length).toBe(1);
  });

  it('should render the correct horizontal slideshow mobile end card', () => {
    jest.spyOn(Features.slideshows.horizontal, 'stitchingEnabled').mockReturnValue(true);
    Store.dispatch(
      setPageData({
        device: 'mobile',
      }),
    );
    const wrapper = shallow(<EndCard {...props} slideshowType="horizontal" />);

    expect(wrapper.find('.horizontalSlideshowDesktopEndCard').length).toBe(0);
    expect(wrapper.find('.vertical').length).toBe(0);
    expect(wrapper.find('.nextSlideshowsListContainer').length).toBe(1);
  });

  it('should render the correct vertical slideshow end card', () => {
    const wrapper = shallow(<EndCard {...props} slideshowType="vertical" />);

    expect(wrapper.find('.horizontalSlideshowDesktopEndCard').length).toBe(0);
    expect(wrapper.find('.nextSlideshowsListContainer').length).toBe(0);
    expect(wrapper.find('.vertical').length).toBe(1);
  });

  it('should create correct timer for horizontal slideshows', () => {
    const wrapper = shallow(<EndCard {...props} slideshowType="horizontal" />);
    const createTimerSpy = jest.spyOn(createTimer, 'default');

    wrapper.instance().initTimer();

    expect(createTimerSpy).toHaveBeenCalledWith(7, expect.any(Function), expect.any(Function), 100);
  });

  it('should create correct timer for vertical slideshows', () => {
    const wrapper = shallow(<EndCard {...props} slideshowType="vertical" />);
    const createTimerSpy = jest.spyOn(createTimer, 'default');

    wrapper.instance().initTimer();

    expect(createTimerSpy).toHaveBeenCalledWith(
      7,
      expect.any(Function),
      expect.any(Function),
      1000,
    );
  });

  it('should have onCurrentTick calculate correct progress for horizontal slideshows', () => {
    const wrapper = shallow(<EndCard {...props} slideshowType="horizontal" />);
    wrapper.instance().onCurrentTick(7000);

    expect(wrapper.state().activeSlideProgress).toBe(1);
  });

  it('should have onCurrentTick calculate correct progress for vertical slideshows', () => {
    const wrapper = shallow(<EndCard {...props} slideshowType="vertical" />);
    wrapper.instance().onCurrentTick(7000);

    expect(wrapper.state().activeSlideProgress).toBe(1000);
  });

  it('should correctly show the play button for the overlay element', () => {
    const wrapper = mount(<Provider store={Store}><EndCard {...props} slideshowType="vertical" /></Provider>);
    wrapper.childAt(0).setState({ showPlayButton: true });

    expect(wrapper.find('.show').length).toBe(1);
  });

  it('should correctly hide the play button for the overlay element', () => {
    const wrapper = mount(<Provider store={Store}><EndCard {...props} slideshowType="vertical" /></Provider>);
    wrapper.childAt(0).setState({ showPlayButton: false });

    expect(wrapper.find(EndCard).find('.show').length).toBe(0);
  });
});
