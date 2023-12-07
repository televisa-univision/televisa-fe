import React from 'react';
import { shallow, mount } from 'enzyme';
import Loadable from 'react-loadable';

import Tracker from '@univision/fe-commons/dist/utils/tracking/tealium/Tracker';

import features from '@univision/fe-commons/dist/config/features';
import SoccerMatchNavContext from '../../base/SoccerMatchNav/SoccerMatchNavContext';
import MatchStats from '.';

jest.mock('../../base/StatWrapper', () => 'StatWrapper');
jest.useFakeTimers();
features.deportes.isWorldCupMVP = jest.fn();

beforeEach(() => {
  jest.clearAllTimers();
});

const props = {
  getMatchStats: () => {},
  home: {
    fullName: 'Cruz Azul',
    abbreviatedName: 'crz',
    imageURI: 'https://cdn3.uvnimg.com/a6/8f/bb85a20a470984c1006fb4aa2551/3-eb.png',
  },
  away: {
    fullName: 'barcelona',
    abbreviatedName: 'bar',
    imageURI: 'https://cdn3.uvnimg.com/a6/8f/bb85a20a470984c1006fb4aa2551/3-eb.png',
  },
  stats: [
    {
      statName: 'General',
      data: [
        { title: 'Tackles, (N/A)', range: [0, 1] },
        { title: 'Tackles success rate (N/A)', range: [0, 1] },
        { title: 'Tackles success clearances (N/A)', range: [0, 1] },
        { title: 'Fouls conceded', range: [0, 1] },
        { title: 'Yellow cards (N/A)', range: [0, 1] },
        { title: 'Red cards (N/A)', range: [0, 1] },
      ],
    },
    {
      statName: 'Distribución',
      data: [
        { title: 'Tackles, (N/A)', range: [0, 1] },
        { title: 'Tackles success rate (N/A)', range: [0, 1] },
        { title: 'Tackles success clearances (N/A)', range: [0, 1] },
        { title: 'Fouls conceded', range: [0, 1] },
        { title: 'Yellow cards (N/A)', range: [0, 1] },
        { title: 'Red cards (N/A)', range: [0, 1] },
      ],
    },
    {
      statName: 'Ataque',
      data: [
        { title: 'Tackles, (N/A)', range: [0, 1] },
        { title: 'Tackles success rate (N/A)', range: [0, 1] },
        { title: 'Tackles success clearances (N/A)', range: [0, 1] },
        { title: 'Fouls conceded', range: [0, 1] },
        { title: 'Yellow cards (N/A)', range: [0, 1] },
        { title: 'Red cards (N/A)', range: [0, 1] },
      ],
    },
    {
      statName: 'Defensa',
      data: [
        { title: 'Tackles, (N/A)', range: [0, 1] },
        { title: 'Tackles success rate (N/A)', range: [0, 1] },
        { title: 'Tackles success clearances (N/A)', range: [0, 1] },
        { title: 'Fouls conceded', range: [0, 1] },
        { title: 'Yellow cards (N/A)', range: [0, 1] },
        { title: 'Red cards (N/A)', range: [0, 1] },
      ],
    },
    {
      data: [
        { title: 'Tackles, (N/A)', range: [0, 1] },
        { title: 'Tackles success rate (N/A)', range: [0, 1] },
        { title: 'Tackles success clearances (N/A)', range: [0, 1] },
        { title: 'Fouls conceded', range: [0, 1] },
        { title: 'Yellow cards (N/A)', range: [0, 1] },
        { title: 'Red cards (N/A)', range: [0, 1] },
      ],
    },
  ],
};

describe('MatchStats tests', () => {
  it('returns null if the component has no childrens', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    const wrapper = shallow(<MatchStats />);
    expect(wrapper.getElement()).toBe(null);
  });

  it('should render as expected with props', async () => {
    const wrapper = mount(<MatchStats {...props} />);
    await Loadable.preloadAll();
    wrapper.update();
    expect(wrapper.find(MatchStats)).toBeDefined();
  });

  it('should render as expected with props and isWorldCupMVP', async () => {
    features.deportes.isWorldCupMVP = jest.fn(() => true);
    const wrapper = mount(<MatchStats {...props} />);
    await Loadable.preloadAll();
    wrapper.update();
    expect(wrapper.find(MatchStats)).toBeDefined();
  });

  it('should renders ad type from widget settings', () => {
    const settings = {
      widgetAd: {
        type: 'Ad Test',
      },
    };
    const wrapper = shallow(<MatchStats {...props} settings={settings} />);
    expect(wrapper.find('.uvs-ad-widget')).toHaveLength(1);
  });

  it('should trigger active tab', async () => {
    spyOn(MatchStats.prototype, 'toggleActiveTab').and.callThrough();
    const wrapper = mount(<MatchStats {...props} />);
    await Loadable.preloadAll();
    wrapper.update();

    const slider = wrapper.find('Slider').at(1).instance();
    spyOn(slider, 'slickGoTo').and.callThrough();
    const button = wrapper.find('.nav').find('Button').at(1);
    button.props().onPress();
    expect(MatchStats.prototype.toggleActiveTab).toHaveBeenCalledTimes(1);
    expect(slider.slickGoTo).toHaveBeenCalledTimes(1);
  });

  it('should trigger active tab but do not call slick to go if the ref does not exist', async () => {
    const wrapper = mount(<MatchStats {...props} />);
    await Loadable.preloadAll();
    wrapper.update();

    const slider = wrapper.find('Slider').at(1).instance();
    spyOn(slider, 'slickGoTo').and.callThrough();
    wrapper.instance().slider.current = null;
    wrapper.instance().componentDidUpdate();
    expect(slider.slickGoTo).toHaveBeenCalledTimes(0);
  });

  it('should trigger the last tab', async () => {
    spyOn(MatchStats.prototype, 'toggleActiveTab').and.callThrough();
    const wrapper = mount(<MatchStats {...props} />);
    await Loadable.preloadAll();
    wrapper.update();

    const slider = wrapper.find('Slider').at(1).instance();
    spyOn(slider, 'slickGoTo').and.callThrough();
    const button = wrapper.find('.nav').find('Button').at(4);
    button.props().onPress();
    expect(MatchStats.prototype.toggleActiveTab).toHaveBeenCalledTimes(1);
    expect(slider.slickGoTo).toHaveBeenCalledTimes(1);
  });
  it('should clear the timer interval before unmounting the component', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    global.clearInterval = jest.fn();
    const mockFn = jest.fn();
    const wrapper = shallow(<MatchStats {...props} getMatchStats={mockFn} />);
    wrapper.instance().componentWillUnmount();
    expect(global.clearInterval).toHaveBeenCalled();
  });
  it('should clear the timer interval when the match ends', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    global.clearInterval = jest.fn();
    const mockFn = jest.fn();
    const wrapper = shallow(<MatchStats {...props} getMatchStats={mockFn} status="live" />);
    wrapper.setProps({
      status: 'post',
    });
    expect(global.clearInterval).toHaveBeenCalled();
  });
  it('should not clear the timer interval before unmounting when it was not created', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    global.clearInterval = jest.fn();
    const mockFn = jest.fn();
    const wrapper = shallow(<MatchStats {...props} getMatchStats={mockFn} />);
    wrapper.instance().timer = null;
    wrapper.instance().componentWillUnmount();
    expect(global.clearInterval).toHaveBeenCalledTimes(0);
  });
  it('should get settings for 480 view', async () => {
    global.innerWidth = 485;
    const expectedValue = { centerPadding: 70, size: 'medium', isAbbreviated: true };
    const wrapper = mount(<MatchStats {...props} />);
    await Loadable.preloadAll();
    wrapper.update();
    const getWidth = wrapper.instance().constructor.settings;
    expect(getWidth).toEqual(expectedValue);
  });
  it('should get settings for 768 view', async () => {
    global.innerWidth = 780;
    const expectedValue = { centerPadding: 150, size: 'small', isAbbreviated: false };
    const wrapper = mount(<MatchStats {...props} />);
    await Loadable.preloadAll();
    wrapper.update();
    const getWidth = wrapper.instance().constructor.settings;
    expect(getWidth).toEqual(expectedValue);
  });
  it('should get settings for 1024 view', async () => {
    global.innerWidth = 1024;
    const expectedValue = { centerPadding: 200, size: 'medium', isAbbreviated: false };
    const wrapper = mount(<MatchStats {...props} />);
    await Loadable.preloadAll();
    wrapper.update();
    const getWidth = wrapper.instance().constructor.settings;
    expect(getWidth).toEqual(expectedValue);
  });
  it('should get settings for 1024 view', async () => {
    global.innerWidth = 1280;
    const expectedValue = { centerPadding: 300, size: 'large', isAbbreviated: false };
    const wrapper = mount(<MatchStats {...props} />);
    await Loadable.preloadAll();
    wrapper.update();
    const getWidth = wrapper.instance().constructor.settings;
    expect(getWidth).toEqual(expectedValue);
  });
  it('should get 50 if global.window does not exist', async () => {
    const expectedValue = { centerPadding: 50, size: 'small', isAbbreviated: true };
    const wrapper = mount(<MatchStats {...props} />);
    await Loadable.preloadAll();
    wrapper.update();
    const restoreGlobal = global.window;
    delete global.window;
    const getWidth = wrapper.instance().constructor.settings;
    expect(getWidth).toEqual(expectedValue);
    global.window = restoreGlobal;
  });
});

describe('MatchStats tealium', () => {
  it('should call when distribucion is tap in mobile', async () => {
    const trackerSpy = spyOn(Tracker, 'fireEvent');
    const wrapper = mount(<MatchStats {...props} device="mobile" />);
    await Loadable.preloadAll();
    wrapper.update();
    const defence = wrapper.find('.nav').find('Button').at(1);
    defence.props().onPress();
    // animation timer
    jest.runTimersToTime(500);
    expect(trackerSpy).toHaveBeenLastCalledWith(expect.any(Object));
  });
  it('should call when distribucion is tap in desktop', async () => {
    const trackerSpy = spyOn(Tracker, 'fireEvent');
    const wrapper = mount(<MatchStats {...props} device="desktop" />);
    await Loadable.preloadAll();
    wrapper.update();
    const dist = wrapper.find('.nav').find('Button').at(1);
    dist.props().onPress();
    // animation timer
    jest.runTimersToTime(500);
    expect(trackerSpy).toHaveBeenLastCalledWith(expect.any(Object));
  });
  it('should call when attack is tap', async () => {
    const trackerSpy = spyOn(Tracker, 'fireEvent');
    const wrapper = mount(<MatchStats {...props} device="mobile" />);
    await Loadable.preloadAll();
    wrapper.update();
    const attack = wrapper.find('.nav').find('Button').at(2);
    attack.props().onPress();
    // animation timer
    jest.runTimersToTime(500);
    expect(trackerSpy).toHaveBeenLastCalledWith(expect.any(Object));
  });
  it('should call when defense is tap', async () => {
    const trackerSpy = spyOn(Tracker, 'fireEvent');
    const wrapper = mount(<MatchStats {...props} />);
    await Loadable.preloadAll();
    wrapper.update();
    const defence = wrapper.find('.nav').find('Button').at(3);
    defence.props().onPress();
    // animation timer
    jest.runTimersToTime(500);
    expect(trackerSpy).toHaveBeenLastCalledWith(expect.any(Object));
  });
  it('should call when general is tap in mobile', async () => {
    const trackerSpy = spyOn(Tracker, 'fireEvent');
    const wrapper = mount(<MatchStats {...props} />);
    await Loadable.preloadAll();
    wrapper.update();
    const general = wrapper.find('.nav').find('Button').at(0);
    general.props().onPress();
    // animation timer
    jest.runTimersToTime(500);
    expect(trackerSpy).toHaveBeenLastCalledWith(expect.any(Object));
  });
  it('should call when a swipe is made in mobile to change cards', async () => {
    const trackerSpy = spyOn(Tracker, 'fireEvent');
    const wrapper = mount(<MatchStats {...props} device="mobile" />);
    await Loadable.preloadAll();
    wrapper.update();
    const slider = wrapper.find('CoreSlider');
    slider.props().settings.onSwipe();
    expect(trackerSpy).toHaveBeenLastCalledWith(expect.any(Object));
  });
  it('should call when a swipe is made in desktop to change cards', async () => {
    const trackerSpy = spyOn(Tracker, 'fireEvent');
    const wrapper = mount(<MatchStats {...props} device="desktop" />);
    await Loadable.preloadAll();
    wrapper.update();
    const slider = wrapper.find('CoreSlider').at(1);
    slider.props().settings.onSwipe();
    expect(trackerSpy).toHaveBeenLastCalledWith(expect.any(Object));
  });
  it('should update innerWidth on resize', async () => {
    const wrapper = mount(<MatchStats {...props} device="desktop" />);
    await Loadable.preloadAll();
    expect(wrapper.state('innerWidth')).toBe(1280);
    global.innerWidth = 1024;
    wrapper.instance().hasResize();
    expect(wrapper.state('innerWidth')).toBe(1024);
  });
  it('should register nav item if have context and available data', () => {
    const setNavigationItemMock = jest.fn();
    const wrapper = mount(
      <SoccerMatchNavContext.Provider value={{ setNavigationItem: setNavigationItemMock }}>
        <MatchStats {...props} />
      </SoccerMatchNavContext.Provider>
    );

    expect(wrapper.find('MatchStatsCard')).toHaveLength(1);
    expect(setNavigationItemMock).toHaveBeenCalledTimes(1);
  });
});
