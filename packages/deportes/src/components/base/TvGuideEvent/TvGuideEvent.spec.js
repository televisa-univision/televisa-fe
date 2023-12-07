import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import TvGuideEvent from '.';

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
    time: 1541916000000,
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
    time: 1541980800000,
    totalWeeks: '23',
    type: 'sport',
    url: 'https://www.univision.com/deportes/futbol/liga-mx-apertura/santos-laguna-vs-america-liga-mx-apertura-2018-11-11',
    week: '16',
  },
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
    time: 1541916000000,
    tmsId: '',
    type: 'udn event',
  },
];

describe('TvGuideChannelNav tests', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TvGuideEvent />, div);
  });
  it('renders ShowCard as expected', () => {
    const wrapper = shallow(<TvGuideEvent event={events[0]} />);
    expect(wrapper.find('ShowCard')).toHaveLength(1);
  });
  it('renders TVSoccerCard as expected', () => {
    const wrapper = shallow(<TvGuideEvent event={events[1]} />);
    expect(wrapper.find('TVSoccerCard')).toHaveLength(1);
  });
  it('renders udn show card as expected', () => {
    const wrapper = shallow(<TvGuideEvent event={events[2]} />);
    expect(wrapper.find('ShowCard')).toHaveLength(1);
  });
  it('should render empty if no type on evente', () => {
    const wrapper = shallow(<TvGuideEvent event={{ t: 'wrongData' }} />);
    expect(wrapper.find('TVSoccerCard')).toHaveLength(0);
    expect(wrapper.find('ShowCard')).toHaveLength(0);
  });
  it('should render default if no type', () => {
    const wrapper = shallow(<TvGuideEvent event={{ type: 'wrongData' }} />);
    expect(wrapper.find('TVSoccerCard')).toHaveLength(0);
    expect(wrapper.find('ShowCard')).toHaveLength(0);
  });
  it('should render TVSoccerCard with "small" size on mobile', () => {
    Store.dispatch(setPageData({
      device: 'mobile',
    }));
    const wrapper = shallow(<TvGuideEvent event={events[1]} />);

    expect(wrapper.find('TVSoccerCard').at(0).props()).toHaveProperty('size', 'small');
  });
  it('should render TVSoccerCard with "medium" size on desktop', () => {
    Store.dispatch(setPageData({
      device: 'desktop',
    }));
    const wrapper = shallow(<TvGuideEvent event={events[1]} />);

    expect(wrapper.find('TVSoccerCard').at(0).props()).toHaveProperty('size', 'medium');
  });
});
