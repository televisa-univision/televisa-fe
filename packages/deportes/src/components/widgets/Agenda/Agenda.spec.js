import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';
import { getDevice } from '@univision/fe-commons/dist/store/storeHelpers';
import Agenda from '.';

jest.mock('@univision/fe-commons/dist/store/storeHelpers', () => ({
  getDevice: jest.fn(() => 'mobile'),
}));
const getEventsMock = jest.fn();
const today = new Date();
const tomorrow = new Date(new Date(today).setDate(new Date(today).getDate() + 1));
const todayEvent = {
  date: today.toISOString(),
  elapsedTime: '—',
  fixture: null,
  hasLiveStream: true,
  id: '993913',
  leagueKey: '199',
  leagueName: 'Mexican Primera (Apertura)',
  round: null,
  stadiumName: 'Estadio Corona',
  status: 'post',
  teams: {
    away: {
      abbreviatedName: 'AME',
      fullName: 'América',
      id: '1292',
      imageURI: 'https://cdn7.uvnimg.com/univision-media/image/upload/v1539271247/prod/sports/teams_logos/1292.png',
      isWinner: false,
      scoreValue: { score: 1, penalty: null },
      url: '/deportes/futbol/america',
    },
    home: {
      abbreviatedName: 'SAN',
      fullName: 'Santos Laguna',
      id: '1287',
      imageURI: 'http://cdn7.uvnimg.com/univision-media/image/upload/v1/prod/sports/teams_logos/1287',
      isWinner: false,
      scoreValue: {
        score: 1,
        penalty: null,
      },
      url: '/deportes/futbol/santos-laguna',
    },
  },
  time: today.getTime(),
  totalWeeks: '23',
  type: 'sport',
  url: 'https://www.univision.com/deportes/futbol/liga-mx-apertura/santos-laguna-vs-america-liga-mx-apertura-2018-11-11',
  week: '16',
};

const tomorrowEvent = {
  ...todayEvent,
  date: today.toISOString(),
  time: tomorrow.getTime(),
};

const events = [todayEvent, tomorrowEvent];

/** @test {Agenda} */
describe('Agenda ', () => {
  beforeEach(() => {
    getEventsMock.mockClear();
  });

  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Agenda />, div);
  });

  it('should render events', () => {
    const wrapper = shallow(<Agenda ready events={events} date={today} />);
    expect(wrapper.find('TvGuideEvent')).toHaveLength(1);
  });

  it('should render date if there is not event today', () => {
    const wrapper = shallow(<Agenda ready events={[tomorrowEvent]} date={today} />);
    expect(wrapper.find('DateTime')).toHaveLength(1);
  });

  it('should render no info if not events', () => {
    const wrapper = shallow(<Agenda ready events={[]} date={today} />);
    expect(wrapper.find('.noInfo')).toHaveLength(1);
  });

  it('should render placeholder if not ready', () => {
    const wrapper = shallow(<Agenda ready={false} />);
    expect(wrapper.find('TVGuidePlaceholder')).toHaveLength(1);
  });

  it('should call functions', () => {
    mount(<Agenda
      ready
      events={events}
      date={today}
      getAllEvents={getEventsMock}
    />);
    expect(getEventsMock).toBeCalled();
  });
});

describe('renderEvent and EventsByDay', () => {
  const wrapper = shallow(<Agenda />);
  it('should return null if not events', () => {
    expect(wrapper.instance().constructor.renderEventList(null)).toBe(null);
    expect(wrapper.instance().renderEvents(null)).toBe(null);
  });
  it('should return right events by date', () => {
    const ev = [
      { time: 1548713127014 },
      { time: 1548713127015 },
      { time: 1548799527014 },
      { noTime: 'arbitrary key' },
    ];
    const eventsByDate = wrapper.instance().constructor.getEventsByDay(ev);
    expect(Object.keys(eventsByDate)).toHaveLength(2);
  });
  it('should return null if not appropriate events collected', () => {
    const ev = [
      { noTime: 'arbitrary key' },
      { noTime: 'arbitrary key' },
    ];
    const eventsByDate = wrapper.instance().constructor.getEventsByDay(ev);
    expect(eventsByDate).toBe(null);
  });
  it('should render the date with the right format in desktop', () => {
    getDevice.mockReturnValueOnce('desktop');
    const date = wrapper.instance().renderDate('2019-01-29T09:01:59Z');
    expect(date.props.format).toBe('dddd, DD [de] MMMM [de] YYYY');
  });
});
