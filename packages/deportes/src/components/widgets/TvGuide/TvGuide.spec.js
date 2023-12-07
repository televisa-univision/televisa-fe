import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';
import TvGuide from '.';

jest.mock('./TvGuide.scss', () => jest.fn());

const getEventsMock = jest.fn();
const setChannelMock = jest.fn();
const setContentMock = jest.fn();
const setDateMock = jest.fn();

const simulate = {};

const events = [
  {
    d: 90,
    ds: 5400,
    e: 'Spider-Man 2',
    ed: 'Peter Parker lucha contra hombre que tiene tentáculos mecánicos.',
    image: '',
    img: 'https://neul.tmsimg.com/assets/p34442_i_h13_ac.jpg',
    progId: 3915,
    rootId: '',
    seriesId: '',
    sl: '2018-11-11T00:00:00.000',
    su: '2018-11-11T05:00:00.000',
    t: 'Feature Film',
    time: 1541916000001,
    tmsId: '',
    type: 'shows',
  },
  {
    date: '2018-11-12T00:00:00Z',
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
    time: 1541980800002,
    totalWeeks: '23',
    type: 'sport',
    url: 'https://www.univision.com/deportes/futbol/liga-mx-apertura/santos-laguna-vs-america-liga-mx-apertura-2018-11-11',
    week: '16',
  },
  {
    d: 90,
    ds: 5400,
    e: 'SportsEvent',
    ed: 'Peter Parker lucha contra hombre que tiene tentáculos mecánicos.',
    image: '',
    img: 'https://neul.tmsimg.com/assets/p34442_i_h13_ac.jpg',
    progId: 3915,
    rootId: '',
    seriesId: '',
    sl: '2018-11-11T00:00:00.000',
    su: '2018-11-11T05:00:00.000',
    t: 'Sports event',
    time: 1541916000003,
    tmsId: '',
    type: 'shows',
  },
  {
    d: 90,
    ds: 5400,
    e: 'Pagado',
    ed: 'Peter Parker lucha contra hombre que tiene tentáculos mecánicos.',
    image: '',
    img: 'https://neul.tmsimg.com/assets/p34442_i_h13_ac.jpg',
    progId: 3915,
    rootId: '',
    seriesId: '',
    sl: '2018-11-11T00:00:00.000',
    su: '2018-11-11T05:00:00.000',
    t: 'Paid Programming',
    time: 1541916000004,
    tmsId: '',
    type: 'shows',
  },
  {
    d: 90,
    ds: 5400,
    e: 'Vecinos',
    ed: 'Peter Parker lucha contra hombre que tiene tentáculos mecánicos.',
    image: '',
    img: 'https://neul.tmsimg.com/assets/p34442_i_h13_ac.jpg',
    progId: 3915,
    rootId: '',
    seriesId: '',
    sl: '2018-11-11T00:00:00.000',
    su: '2018-11-11T05:00:00.000',
    t: 'Series',
    time: 1541916000005,
    tmsId: '',
    type: 'shows',
  },
];

const mockEvent = {
  preventDefault: jest.fn(),
  nativeEvent: {},
};
mockEvent.nativeEvent = mockEvent;

// Jest Mocks
jest.useFakeTimers();
jest.mock('lodash.debounce', () => jest.fn(fn => fn));

window.addEventListener = jest.fn((event, cb) => {
  simulate[event] = cb;
});

/** @test {TvGuide} */
describe('TvGuide ', () => {
  beforeEach(() => {
    setChannelMock.mockClear();
    getEventsMock.mockClear();
    setContentMock.mockClear();
    setDateMock.mockClear();
  });
  afterAll(() => {
    jest.clearAllTimers();
  });

  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TvGuide />, div);
  });

  it('should have events', () => {
    const wrapper = shallow(<TvGuide ready events={events} />);
    expect(wrapper.find('TvGuideEvent')).toHaveLength(5);
  });

  it('should use default type if content type not exist', () => {
    const wrapper = shallow(<TvGuide ready events={events} contentType="abc" />);
    expect(wrapper.find('FilterTabMenu').props().activeFilter).toBe('0');
  });

  it('should call functions', () => {
    mount(<TvGuide
      ready
      events={events}
      date={new Date()}
      setChannel={setChannelMock}
      getAllEvents={getEventsMock}
    />);
    expect(setChannelMock).toBeCalled();
    expect(getEventsMock).toBeCalled();
  });

  it('should not call setContent on FilterChange if function is not valid', () => {
    const wrapper = mount(<TvGuide ready events={events} setContent={null} date={new Date()} />);
    wrapper.find('TabName').at(1).props().onPress(mockEvent);
    expect(setChannelMock).not.toBeCalled();
  });
  it('should not call getEvents or setChannel on ChannelButton press if functions are not valid', () => {
    const wrapper = mount(<TvGuide ready events={events} date={new Date()} />);
    wrapper.find('TvGuideNav').at(0).props().onPress(mockEvent);
    expect(setChannelMock).not.toBeCalled();
    expect(getEventsMock).not.toBeCalled();
  });
  it('should not call getEvents or setChannel on ChannelButton press if functions are not valid', () => {
    const wrapper = mount(<TvGuide ready events={events} date={new Date()} />);
    wrapper.find('ChannelButton').at(1).props().onPress(mockEvent);
    expect(setChannelMock).not.toBeCalled();
    expect(getEventsMock).not.toBeCalled();
  });
  it('should call getEvents and setChannel on ChannelButton press', () => {
    const wrapper = mount(<TvGuide
      ready
      events={events}
      setChannel={setChannelMock}
      getAllEvents={getEventsMock}
      date={new Date()}
    />);
    wrapper.find('ChannelButton').at(0).props().onPress(mockEvent);
    expect(setChannelMock).toBeCalled();
    expect(getEventsMock).toBeCalled();
  });
  it('should call the functions getAllEvents and setDate if defined', () => {
    const wrapper = mount(<TvGuide
      ready
      events={events}
      setDate={setDateMock}
      setChannel={setChannelMock}
      getAllEvents={getEventsMock}
      date={new Date()}
    />);
    wrapper.find('TvGuideDateNav').at(0).props().onPress();
    expect(setDateMock).toBeCalled();
    expect(getEventsMock).toBeCalled();
  });
  it('should not call the functions getEvents and setDate if not defined', () => {
    const wrapper = mount(<TvGuide
      ready
      events={events}
      date={new Date()}
    />);
    wrapper.find('TvGuideDateNav').at(0).props().onPress();
    expect(setDateMock).not.toBeCalled();
    expect(getEventsMock).not.toBeCalled();
  });
});

describe('channelHandler', () => {
  const getAllEventsMock = jest.fn();
  it('should call the functions getAllEvents and setChannel if defined', () => {
    const wrapper = shallow(<TvGuide
      ready
      events={events}
      getAllEvents={getAllEventsMock}
      setChannel={setChannelMock}
      date={new Date()}
    />);
    wrapper.instance().channelHandler();
    expect(setChannelMock).toBeCalled();
    expect(getAllEventsMock).toBeCalled();
  });
});

describe('contentTypeHandler', () => {
  it('should call the functions setContent if defined', () => {
    const wrapper = shallow(<TvGuide
      ready
      events={events}
      setContent={setContentMock}
    />);
    wrapper.instance().contentTypeHandler({ preventDefault: () => {} }, 'test');
    expect(setContentMock).toBeCalled();
  });
});
