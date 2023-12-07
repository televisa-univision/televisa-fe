import React from 'react';

import { storiesOf } from '@storybook/react';
import { Provider } from 'react-redux';
import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import standingsExtractor from '@univision/shared-components/dist/extractors/standingsExtractor';
import SportApiProvider from '../../utils/SportApiProvider';
import standing from '../../../utils/mocks/standings.json';
import groupstandings from '../../../utils/mocks/groupStandings.json';
import leagues from '../../../utils/mocks/leagues.json';
import altLeagues from '../../../utils/mocks/altLeagues.json';
import StandingsConnector from './StandingsConnector';
import Standings from '.';

const settings = {
  highlightedCompetitionSeasons: leagues,
  highlightedAlternativeCompetitionSeasons: altLeagues,
  uid: '00000162-6e55-d5c9-a96a-7ff5282c0000',
  type: 'soccerwidgetstandings',
  displayType: {
    value: 'Collapsed',
  },
};

const settings2 = {
  highlightedCompetitionSeasons: [
    {
      seasonId: '2017',
      seasonName: 'Season 2016/2017',
      soccerCompetition: {
        code: 'ES_PL',
        league: {
          name: 'Liga MX',
          id: 'l.femexfut.mx.primera',
          uri: 'http://sports.dev.y.univision.com/deportes/futbol/liga-mx',
        },
        name: 'Liga MX',
        id: '199',
      },
    },
  ],
};

const settings3 = {
  highlightedCompetitionSeasons: [
    {
      seasonId: '2017',
      seasonName: 'Season 2016/2017',
      soccerCompetition: {
        code: 'ES_PL',
        league: {
          name: 'Liga MX',
          id: 'l.femexfut.mx.primera',
          uri: 'http://sports.dev.y.univision.com/deportes/futbol/champions',
        },
        name: 'Champions League',
        id: '5',
      },
    },
    leagues[0],
    leagues[3],
    leagues[2],
  ],
};

Store.dispatch(
  setPageData({
    data: {
      widgets: [
        {
          extraData: {
            standings: {
              data: standingsExtractor(standing),
            },
          },
          settings: {
            highlightedCompetitionSeasons: leagues,
            uid: '00000162-6e55-d5c9-a96a-7ff5282c0000',
            type: 'soccerwidgetstandings',
            displayType: {
              value: 'Collapsed',
            },
          },
          type: 'DeportesGridSoccerStandings',
        },
      ],
    },
  })
);

const dataStandings = standingsExtractor(standing);
const groupStanding = standingsExtractor(groupstandings);

const props = {
  settings,
};

const propsWithProfile = {
  settings,
  profile: 'uefa',
};

storiesOf('Widgets/Standings', module)
  .addDecorator((story) => {
    Store.dispatch(setPageData({ device: global.innerWidth > 768 ? 'desktop' : 'mobile' }));
    return <div className="uvs-container">{story()}</div>;
  })
  .add('Default (redux and core profile)', () => (
    <Provider store={Store}>
      <StandingsConnector {...props} />
    </Provider>
  ))
  .add('With Profile UEFA (redux)', () => {
    return (
      <Provider store={Store}>
        <StandingsConnector {...propsWithProfile} />
      </Provider>
    );
  })
  .add('isWorldCupMVP With Profile UEFA (redux)', () => {
    return (
      <Provider store={Store}>
        <StandingsConnector {...propsWithProfile} widgetContext={{ isWorldCupMVP: true }} />
      </Provider>
    );
  })
  .add('Default with mock data (display type COLLAPSED)', () => (
    <Standings standings={dataStandings} {...props} getStandings={() => {}} />
  ))
  .add('with primary league passed down in league page expanded (display type FULL) ', () => (
    <Standings
      standings={dataStandings}
      settings={{ ...settings2, displayType: { value: 'Full' } }}
      getStandings={() => {}}
    />
  ))
  .add('with primary league passed down in match center (display type FLEXIBLE)', () => (
    <Standings
      standings={dataStandings}
      settings={{ ...settings2, displayType: { value: 'Flexible' } }}
      getStandings={() => {}}
    />
  ))
  .add('isWorldCupMVP with primary league passed down in match center (display type FLEXIBLE)', () => (
    <Standings
      standings={dataStandings}
      widgetContext={{ isWorldCupMVP: true }}
      settings={{ ...settings2, displayType: { value: 'Flexible' } }}
      getStandings={() => {}}
    />
  ))
  .add('with standing group in match center page', () => (
    <Standings
      settings={{ ...settings3, displayType: { value: 'Flexible' } }}
      standings={groupStanding}
      getStandings={() => {}}
    />
  ))
  .add('with relegation primary league passed down in league page expanded (display type FULL) ', () => (
    <Standings
      standings={dataStandings}
      settings={{ ...settings2, displayType: { value: 'Full' }, hasRelegation: true }}
      getStandings={() => {}}
    />
  ))
  .add('with SportApi Wrapper', () => {
    return (
      <SportApiProvider
        path="/v1/standings/soccer/2017/199"
        render={(data) => {
          dataStandings.data = standingsExtractor(data);
          return (
            <Standings settings={settings} standings={dataStandings} getStandings={() => {}} />
          );
        }}
      />
    );
  });
