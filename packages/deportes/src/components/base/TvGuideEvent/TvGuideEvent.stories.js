import React from 'react';
import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import { storiesOf } from '@storybook/react';
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
];

storiesOf('Base/TvGuideEvent', module)
  .addDecorator((story) => {
    Store.dispatch(setPageData({ device: global.innerWidth > 767 ? 'desktop' : 'mobile' }));
    return <div>{story()}</div>;
  })
  .add('with show event card', () => (
    <TvGuideEvent event={events[0]} />
  ))
  .add('with match event card', () => (
    <TvGuideEvent event={events[1]} />
  ));
