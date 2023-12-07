import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';

import WidgetTracker from '@univision/fe-commons/dist/utils/tracking/tealium/widget/WidgetTracker';
import playByPlayExtractor from '@univision/shared-components/dist/extractors/playByPlayExtractor';
import deportes from '@univision/fe-commons/dist/config/features/deportes';

import SoccerMatchNavContext from '../../base/SoccerMatchNav/SoccerMatchNavContext';
import { image } from '../../../config/storyMocks';
import data from '../../../utils/mocks/playbyplay.json';
import PlayByPlay from '.';

jest.useFakeTimers();
jest.mock('@univision/fe-commons/dist/utils/tracking/tealium/widget/WidgetTracker', () => ({
  track: jest.fn(),
  events: {
    engagement: jest.fn(),
  },
}));
deportes.isTudn = jest.fn(() => false);
const mockCallback = jest.fn();
const eventsApi = playByPlayExtractor(data);
const events = [
  {
    key: '1',
    time: "90'+3'",
    image,
    iconName: 'goal',
    title: 'Gol',
    summary: 'Alonso Zamora (Puebla) ha sido amonestado con tarjeta amarilla por juego peligroso.',
  },
  {
    key: '4',
    time: "90'+3'",
    iconName: 'goal',
    title: 'Gol',
    summary: 'Alonso Zamora (Puebla) ha sido amonestado con tarjeta amarilla por juego peligroso.',
  },
  {
    key: '2',
    time: "90'+3'",
    iconName: 'goal',
    title: 'Gol',
    summary: 'Alonso Zamora (Puebla) ha sido amonestado con tarjeta amarilla por juego peligroso.',
  },
  {
    key: '5',
    time: "90'+3'",
    iconName: 'goal',
    title: 'Gol',
    summary: 'Alonso Zamora (Puebla) ha sido amonestado con tarjeta amarilla por juego peligroso.',
  },
  {
    key: '6',
    time: "90'+3'",
    iconName: 'goal',
    title: 'Gol',
    summary: 'Alonso Zamora (Puebla) ha sido amonestado con tarjeta amarilla por juego peligroso.',
  },
  {
    key: '7',
    time: "90'+3'",
    iconName: 'goal',
    title: 'Gol',
    summary: 'Alonso Zamora (Puebla) ha sido amonestado con tarjeta amarilla por juego peligroso.',
  },
  {
    key: '8',
    time: "90'+3'",
    iconName: 'goal',
    title: 'Gol',
    summary: 'Alonso Zamora (Puebla) ha sido amonestado con tarjeta amarilla por juego peligroso.',
  },
  {
    key: '9',
    time: "90'+3'",
    iconName: 'goal',
    title: 'Gol',
    summary: 'Alonso Zamora (Puebla) ha sido amonestado con tarjeta amarilla por juego peligroso.',
  },
  {
    key: '11',
    time: "90'+3'",
    iconName: 'goal',
    title: 'Gol',
    summary: 'Alonso Zamora (Puebla) ha sido amonestado con tarjeta amarilla por juego peligroso.',
  },
  {
    key: '18',
    time: "90'+3'",
    iconName: 'goal',
    title: 'Gol',
    summary: 'Alonso Zamora (Puebla) ha sido amonestado con tarjeta amarilla por juego peligroso.',
  },
  {
    key: '10',
    time: "90'+3'",
    iconName: 'goal',
    title: 'Gol',
    summary: 'Alonso Zamora (Puebla) ha sido amonestado con tarjeta amarilla por juego peligroso.',
  },
  {
    key: '5',
    time: "90'+3'",
    iconName: 'goal',
    title: 'Gol',
    summary: 'Alonso Zamora (Puebla) ha sido amonestado con tarjeta amarilla por juego peligroso.',
  },
];

const title = {
  title: 'Widget Title',
  titleLink: {
    uri: 'http://www.univision.com',
    href: 'http://www.univision.com',
  },
};

/** @test {PlayByPlay} */
describe('PlayByPlay ', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PlayByPlay
      title={title}
      events={eventsApi}
    />, div);
  });
  it('should not render the widget if no events', () => {
    const wrapper = shallow(<PlayByPlay title={title} />);
    expect(wrapper.type()).toBe(null);
  });
  it('should renders ad type from widget settings', () => {
    const settings = {
      widgetAd: {
        type: 'Ad Test',
      },
    };
    const wrapper = shallow(<PlayByPlay events={eventsApi} settings={settings} />);
    expect(wrapper.find('.uvs-ad-widget')).toHaveLength(1);
  });
  it('should not show clickable if not collapsed', () => {
    const wrapper = shallow(<PlayByPlay title={title} events={eventsApi} />);
    wrapper.instance().setState({ collapsed: false });
    expect(wrapper.find('Clickable')).toHaveLength(0);
  });
  it('should call getEvents if changeStatus called', () => {
    const wrapper = shallow(<PlayByPlay
      title={title}
      events={eventsApi}
      getEvents={mockCallback}
    />);
    wrapper.instance().changeStatus();
    expect(mockCallback.mock.calls.length).toBeGreaterThan(0);
  });
  it('should not call getEvents if timer is already initialized', () => {
    const wrapper = shallow(<PlayByPlay title={title} events={eventsApi} />);
    mockCallback.mockClear();
    wrapper.instance().timer = { test: true };
    wrapper.instance().changeStatus();
    expect(mockCallback).toHaveBeenCalledTimes(0);
  });
  it('should call the right tracker target', () => {
    const wrapper = shallow(<PlayByPlay title={title} events={eventsApi} />);
    WidgetTracker.track.mockClear();
    wrapper.instance().state.collapsed = false;
    wrapper.instance().changeStatus();
    expect(WidgetTracker.track.mock.calls[0][1].target).toBe('playbyplay-vermenos');
    WidgetTracker.track.mockClear();
    wrapper.instance().state.collapsed = true;
    wrapper.instance().changeStatus();
    expect(WidgetTracker.track.mock.calls[0][1].target).toBe('playbyplay-vertodos');
  });
  it('should not initialize timer if callback is not a function', () => {
    const wrapper = shallow(<PlayByPlay title={title} events={eventsApi} />);
    wrapper.instance().changeStatus();
    expect(wrapper.instance().timer).toBe(null);
  });
  it('should display 10 items if no video included', () => {
    const wrapper = shallow(<PlayByPlay title={title} events={eventsApi} />);
    expect(wrapper.find('PlayByPlayCard').length).toBe(10);
  });
  it('should display 9 items if video included', () => {
    const wrapper = shallow(<PlayByPlay title={title} events={events} />);
    expect(wrapper.find('PlayByPlayCard').length).toBe(9);
  });
  it('should no display show more button if not more than 10 events', () => {
    const wrapper = shallow(<PlayByPlay title={title} events={events.splice(0, 8)} />);
    expect(wrapper.find('Clickable').length).toBe(0);
  });
  it('should display preview props items if defined', () => {
    const previewNumber = 2;
    const wrapper = shallow(<PlayByPlay preview={previewNumber} title={title} events={events} />);
    expect(wrapper.find('PlayByPlayCard').length).toBe(previewNumber);
  });
  it('should display preview props items if defined', () => {
    const previewNumber = 2;
    const wrapper = shallow(<PlayByPlay preview={previewNumber} title={title} events={events} />);
    expect(wrapper.find('PlayByPlayCard').length).toBe(previewNumber);
  });
  it('should getPreviewItemsNumber return default if not events', () => {
    const wrapper = shallow(<PlayByPlay />);
    expect(wrapper.instance().getPreviewItemsNumber()).toBe(10);
  });
  it('should create timer if getEvents is defined and activeGame is true', () => {
    global.clearInterval = jest.fn();
    const wrapper = shallow(<PlayByPlay
      title={title}
      events={eventsApi}
      getEvents={mockCallback}
      activeGame
    />);
    wrapper.instance().startInterval();
    expect(wrapper.instance().timer).not.toEqual(null);
    wrapper.unmount();
    expect(global.clearInterval).toHaveBeenCalled();
  });
  it('should not clearInverval if time does not exist', () => {
    global.clearInterval = jest.fn();
    const wrapper = shallow(<PlayByPlay
      title={title}
      events={eventsApi}
      getEvents={mockCallback}
      activeGame
    />);
    wrapper.instance().startInterval();
    expect(wrapper.instance().timer).not.toEqual(null);
    wrapper.instance().timer = null;
    wrapper.unmount();
    expect(global.clearInterval).not.toHaveBeenCalled();
  });

  it('should stop interval if the match it\'s no longer live', () => {
    global.clearInterval = jest.fn();
    const wrapper = shallow(<PlayByPlay
      title={title}
      events={eventsApi}
      getEvents={mockCallback}
      activeGame
    />);
    wrapper.setProps({
      activeGame: false,
    });
    expect(global.clearInterval).toHaveBeenCalled();
  });

  it('should not stop interval if the match it\'s live', () => {
    global.clearInterval = jest.fn();
    const wrapper = shallow(<PlayByPlay
      title={title}
      events={eventsApi}
      getEvents={mockCallback}
      activeGame
    />);
    wrapper.setProps({
      activeGame: true,
    });
    expect(global.clearInterval).not.toHaveBeenCalled();
  });
  it('should start the interval if the match it\'s live with new data', () => {
    const mockFn = jest.fn();
    const wrapper = shallow(<PlayByPlay
      title={title}
      events={eventsApi}
      getEvents={mockFn}
    />);
    wrapper.setProps({
      activeGame: true,
    });
    wrapper.update();
    jest.runTimersToTime(60000);
    expect(mockFn).toHaveBeenCalledTimes(2);
  });
  it('should render correctly with tudn', () => {
    deportes.isTudn.mockReturnValue(true);
    const wrapper = shallow(<PlayByPlay title={title} events={eventsApi} />);
    expect(wrapper.find('Button').at(0).prop('alignment')).toEqual('center');
  });
  it('should register nav item if have context and available data', () => {
    const setNavigationItemMock = jest.fn();
    const wrapper = mount(
      <SoccerMatchNavContext.Provider value={{ setNavigationItem: setNavigationItemMock }}>
        <PlayByPlay title={title} events={eventsApi} />
      </SoccerMatchNavContext.Provider>
    );
    expect(wrapper.find('PlayByPlayCard')).toHaveLength(10);
    expect(setNavigationItemMock).toHaveBeenCalledTimes(1);
  });
  it('should have prop isWorldCupMvp into WidgetTitle', () => {
    const wrap = shallow(<PlayByPlay events={eventsApi} widgetContext={{ isWorldCupMVP: true }} />);
    expect(wrap.find('WidgetTitle').prop('isLowerCase')).toBe(true);
  });
  it('should have FALSE prop isWorldCupMvp into WidgetTitle', () => {
    const wra = shallow(<PlayByPlay events={eventsApi} widgetContext={{ isWorldCupMVP: false }} />);
    expect(wra.find('WidgetTitle').prop('isLowerCase')).toBe(false);
  });
});
