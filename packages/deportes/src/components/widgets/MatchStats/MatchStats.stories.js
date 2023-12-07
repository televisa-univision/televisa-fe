import React from 'react';
import { Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';
import Store from '@univision/fe-commons/dist/store/store';
import deportes from '@univision/fe-commons/dist/config/features/deportes';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import { getDevice } from '@univision/fe-commons/dist/utils/storybook';
import MatchStatsConnector from './MatchStatsConnector';
import MatchStats from '.';

const device = getDevice();

const props = {
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
        { title: 'Tackles', range: [1, 2] },
        { title: 'Tackles success rate (N/A)', range: [7, 2] },
        { title: 'Tackles success clearances (N/A)', range: [4, 3] },
        { title: 'Fouls conceded', range: [3, 8] },
        { title: 'Yellow cards (N/A)', range: [9, 2] },
        { title: 'Red cards (N/A)', range: [1, 10] },
        { title: 'Performance', range: [1, 10] },
      ],
    },
    {
      statName: 'Distribución',
      data: [
        { title: 'Tackles', range: [1, 2] },
        { title: 'Tackles success rate (N/A)', range: [7, 2] },
        { title: 'Tackles success clearances (N/A)', range: [4, 3] },
        { title: 'Fouls conceded', range: [3, 8] },
        { title: 'Yellow cards (N/A)', range: [9, 2] },
        { title: 'Red cards (N/A)', range: [1, 10] },
        { title: 'Performance', range: [1, 10] },
      ],
    },
    {
      statName: 'Ataque',
      data: [
        { title: 'Tackles', range: [1, 2] },
        { title: 'Tackles success rate (N/A)', range: [7, 2] },
        { title: 'Tackles success clearances (N/A)', range: [4, 3] },
        { title: 'Fouls conceded', range: [3, 8] },
        { title: 'Yellow cards (N/A)', range: [9, 2] },
        { title: 'Red cards (N/A)', range: [1, 10] },
        { title: 'Performance', range: [1, 10] },
      ],
    },
    {
      statName: 'Defensa',
      data: [
        { title: 'Tackles', range: [1, 2] },
        { title: 'Tackles success rate (N/A)', range: [7, 2] },
        { title: 'Tackles success clearances (N/A)', range: [4, 3] },
        { title: 'Fouls conceded', range: [3, 8] },
        { title: 'Yellow cards (N/A)', range: [9, 2] },
        { title: 'Red cards (N/A)', range: [1, 10] },
        { title: 'Performance', range: [1, 10] },
      ],
    },
    {
      statName: 'Disciplina',
      data: [
        { title: 'Tackles', range: [1, 2] },
        { title: 'Tackles success rate (N/A)', range: [7, 2] },
        { title: 'Tackles success clearances (N/A)', range: [4, 3] },
        { title: 'Fouls conceded', range: [3, 8] },
        { title: 'Yellow cards (N/A)', range: [9, 2] },
        { title: 'Red cards (N/A)', range: [1, 10] },
      ],
    },
  ],
};

storiesOf('Widgets/MatchStats', module)
  .addDecorator(story => (
    <div className="uvs-container">{story()}</div>
  ))
  .add('default', () => {
    Store.dispatch(setPageData({ device }));
    deportes.isTudn = () => (false);
    return (
      <MatchStats {...props} />
    );
  })
  .add('with SportApi Wrapper', () => {
    const settings = {
      uid: '666',
      type: 'DeportesMatchStats',
      matchId: '983129',
    };

    const props2 = {
      settings,
    };

    Store.dispatch(setPageData({
      data: {
        widgets: [{
          extraData: {
            data: {},
          },
          settings: {
            uid: '666',
            type: 'DeportesMatchStats',
          },
          type: 'DeportesMatchStats',
        }],
      },
      device,
    }));

    return (
      <Provider store={Store} key="matchStats-story">
        <MatchStatsConnector {...props2} />
      </Provider>
    );
  })
  .add('TUDN flag on', () => {
    Store.dispatch(setPageData({ device }));
    deportes.isTudn = () => (true);
    return (
      <MatchStats {...props} />
    );
  });
