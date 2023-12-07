import React from 'react';
import { shallow } from 'enzyme';
import Tracker from '@univision/fe-commons/dist/utils/tracking/tealium/Tracker';
import features from '@univision/fe-commons/dist/config/features';
import * as helpers from '@univision/fe-commons/dist/utils/helpers';
import Styles from './SoccerMatchNav.scss';

import SoccerMatchNav from '.';

helpers.locationRedirect = jest.fn();
helpers.isInViewport = jest.fn();
features.deportes.isWorldCupMVP = jest.fn();
jest.mock('lodash.throttle', () => jest.fn(fn => fn));
const mockEvent = {
  preventDefault: jest.fn(),
  nativeEvent: {},
};
mockEvent.nativeEvent = mockEvent;
jest.useFakeTimers();

const simulate = {};
window.addEventListener = jest.fn((event, cb) => {
  simulate[event] = cb;
});

let navContent = [];

beforeEach(() => {
  const mockWindow = {
    location: {},
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  };
  // Use jest.spyOn to mock the global window object
  const windowSpy = jest.spyOn(global, 'window', 'get');
  windowSpy.mockImplementation(() => mockWindow);

  navContent = [
    { name: 'En vivo', link: '#link1', type: 'link1' },
    { name: 'Comentarios', link: '#link2', type: 'link2' },
    { name: 'Alineaciones', link: '#link3', type: 'link3' },
    { name: 'Estadísticas', link: '#link4', type: 'link4' },
    { name: 'Resumen', link: '#link5', type: 'link5' },
  ];
  helpers.locationRedirect.mockClear();
  helpers.isInViewport.mockClear();
});

afterAll(() => {
  jest.clearAllTimers();
});

/** @test {SoccerMatchNav} */
describe('SoccerMatchNav ', () => {
  it('should render as expected', () => {
    const wrapper = shallow(<SoccerMatchNav navLinks={navContent} />);
    expect(wrapper.find('NavWrapper').length).toBe(1);
  });
  it('should not render is no array of links present', () => {
    const wrapper = shallow(<SoccerMatchNav navLinks={[]} />);
    expect(wrapper.find(`div.${Styles.nav}`).length).toBe(0);
  });
  it('should render the modifierClass prop', () => {
    const className = 'modifier-class';
    const wrapper = shallow(<SoccerMatchNav navLinks={navContent} className={className} />);
    expect(wrapper.find(`.${className}`)).toBeDefined();
  });
  it('should render nav links', () => {
    const wrapper = shallow(<SoccerMatchNav navLinks={navContent} />);
    expect(wrapper.find('Button').length).toBe(5);
  });
  it('should render nav links (isTudn)', () => {
    const wrapper = shallow(<SoccerMatchNav navLinks={navContent} isTudn />);
    expect(wrapper.find('Button').length).toBe(5);
  });
  it('should call toggleActiveTab handler and redirect', () => {
    navContent = [{ name: 'En vivo', link: '#link' }, { name: 'Alineación', link: '#link' }];
    const trackerSpy = spyOn(Tracker, 'fireEvent');
    const showAllHandlerSpy = jest.spyOn(SoccerMatchNav.prototype, 'toggleActiveTab');
    const wrapper = shallow(<SoccerMatchNav navLinks={navContent} />);

    wrapper.find('.nav').find('Button').at(1).props()
      .onPress(mockEvent);
    jest.runOnlyPendingTimers();

    expect(showAllHandlerSpy).toHaveBeenCalledTimes(1);
    expect(trackerSpy).toHaveBeenLastCalledWith(expect.any(Object));
    expect(helpers.locationRedirect).toBeCalledWith(expect.stringMatching(new RegExp('#link')));

    showAllHandlerSpy.mockRestore();
  });
  it('should call toggleActiveTab handler and not redirect if not valid url', () => {
    navContent = [{ name: 'En vivo' }, { name: 'Posiciones' }];
    const trackerSpy = spyOn(Tracker, 'fireEvent');
    const showAllHandlerSpy = jest.spyOn(SoccerMatchNav.prototype, 'toggleActiveTab');
    const wrapper = shallow(<SoccerMatchNav navLinks={navContent} />);
    wrapper.find('.nav').find('Button').at(1).props()
      .onPress(mockEvent);
    jest.runOnlyPendingTimers();

    expect(showAllHandlerSpy).toHaveBeenCalledTimes(1);
    expect(trackerSpy).not.toHaveBeenCalled();
    expect(helpers.locationRedirect).not.toHaveBeenCalled();

    showAllHandlerSpy.mockRestore();
  });
  it('updates state when nav button is clicked', () => {
    const wrapper = shallow(<SoccerMatchNav navLinks={navContent} />);
    expect(wrapper.state('active')).toEqual(0);
    wrapper.instance().toggleActiveTab(1, '#Inicio');
    expect(wrapper.state('active')).toEqual(1);
    wrapper.instance().toggleActiveTab(2, '#Posiciones');
    expect(wrapper.state('active')).toEqual(2);
  });
  it('should call onScroll and toggle active nav if its related element is in viewport', () => {
    helpers.isInViewport.mockReturnValue(true);
    const onScrollSpy = jest.spyOn(SoccerMatchNav.prototype, 'onScroll');
    const toggleActiveSpy = jest.spyOn(SoccerMatchNav.prototype, 'toggleActiveTab');
    const wrapper = shallow(<SoccerMatchNav navLinks={navContent} />);
    wrapper.instance().onScroll();
    expect(onScrollSpy).toHaveBeenCalled();
    expect(toggleActiveSpy).toHaveBeenCalled();
    onScrollSpy.mockClear();
    toggleActiveSpy.mockClear();
  });
  it('should call onScroll and not toggle active nav if its related element is not in viewport', () => {
    helpers.isInViewport.mockReturnValue(false);
    const onScrollSpy = jest.spyOn(SoccerMatchNav.prototype, 'onScroll');
    const toggleActiveSpy = jest.spyOn(SoccerMatchNav.prototype, 'toggleActiveTab');
    const wrapper = shallow(<SoccerMatchNav navLinks={navContent} />);
    wrapper.instance().onScroll();
    expect(onScrollSpy).toHaveBeenCalled();
    expect(toggleActiveSpy).not.toHaveBeenCalled();
    onScrollSpy.mockClear();
    toggleActiveSpy.mockClear();
  });
  it('should call onScroll and not toggle active nav if navLinks is an empty array', () => {
    helpers.isInViewport.mockReturnValue(false);
    const onScrollSpy = jest.spyOn(SoccerMatchNav.prototype, 'onScroll');
    const toggleActiveSpy = jest.spyOn(SoccerMatchNav.prototype, 'toggleActiveTab');
    const wrapper = shallow(<SoccerMatchNav navLinks={[]} />);
    wrapper.instance().onScroll();
    expect(onScrollSpy).toHaveBeenCalled();
    expect(toggleActiveSpy).not.toHaveBeenCalled();
    wrapper.unmount();
    onScrollSpy.mockClear();
    toggleActiveSpy.mockClear();
  });
  it('should have in NavWrapper the prop isWorldCupMVP', () => {
    features.deportes.isWorldCupMVP = jest.fn(() => true);
    const wrap = shallow(
      <SoccerMatchNav navLinks={navContent} />
    );
    expect(wrap.find('NavWrapper').prop('isWorldCupMVP')).toBe(true);
  });

  it('should have FALSE in NavWrapper the prop isWorldCupMVP', () => {
    features.deportes.isWorldCupMVP = jest.fn(() => false);
    const wrap = shallow(
      <SoccerMatchNav navLinks={navContent} />
    );

    expect(wrap.find('NavWrapper').prop('isWorldCupMVP')).toBe(false);
  });
});
