import React from 'react';
import { storiesOf } from '@storybook/react';
import { Provider } from 'react-redux';
import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import * as widgetTypes from '@univision/fe-commons/dist/constants/widgetTypes';
import matchCenterExtractor from '@univision/shared-components/dist/extractors/matchCenterExtractor';
import mockMatch from '../../../utils/mocks/match.json';
import SportApiProvider from '../../utils/SportApiProvider';
import MatchCenterOpeningConnector from './MatchCenterOpeningConnector';
import MatchCenterOpening from '.';

const END_POINT = '/v1/schedule-results/soccer';
const defaultProps = {
  settings: {
    uid: '00000162-6e55-d5c9-a96a-7ff5282c0000',
    type: 'soccerwidgetmatchopening',
    matchId: '919268',
    soccerCompetitionSeason: {
      seasonId: '2017',
      seasonName: 'Season 2017/2018',
      soccerCompetition: {
        league: {
          coverage: 'Performance',
          activeSoccerCompetitionURL:
            'https://performance.univision.com/deportes/futbol/copa-mundial/*',
          name: 'Copa Mundial',
          id: 'l.fifaworldcup.com',
          abbreviation: 'Copa Mundial',
          uri: 'https://performance.univision.com/deportes/futbol/copa-mundo',
        },
        name: 'Copa Mundial',
        id: '4',
      },
    },
  },
  match: {},
};
const mockActions = {
  getMatch: () => {},
};
let matchData = {};

Store.dispatch(
  setPageData({
    data: {
      widgets: [
        {
          extraData: matchCenterExtractor(mockMatch),
          settings: defaultProps.settings,
          type: widgetTypes.DEPORTES_GRID_SOCCER_MATCH_OPENING,
        },
      ],
    },
  })
);
const scorerProps = {
  scorersAway: [
    { id: 1, player: 'Paul Pogba', minutesElapsed: '20' },
    { id: 3, player: 'Octavio Rivero', minutesElapsed: '40' },
  ],
  scorersHome: [
    { id: 2, player: 'James Milner', minutesElapsed: '15' },
    { id: 4, player: 'James Milner', minutesElapsed: '18' },
  ],
};

/**
 * Crate the MatchCenterOpening component
 * @param {Object} props - additional props
 * @returns {JSX}
 */
const makeMatchCenter = (props) => {
  return (
    <SportApiProvider
      path={`${END_POINT}/${defaultProps.settings.matchId}`}
      render={(data) => {
        defaultProps.match = matchCenterExtractor(data);

        return <MatchCenterOpening {...Object.assign({}, defaultProps, mockActions, props)} />;
      }}
    />
  );
};

/**
 * Create MatchCenterOpening widget with Redux conector
 * @param {Object} props - additional props
 * @returns {JSX}
 */
function makeMatchCenterConector(props) {
  return (
    <Provider store={Store}>
      <MatchCenterOpeningConnector {...Object.assign({}, defaultProps, props)} />
    </Provider>
  );
}

storiesOf('Widgets/MatchCenterOpening', module)
  .addDecorator((story) => {
    let size = 'desktop';
    if (global.innerWidth <= 768 && global.innerWidth > 734) {
      size = 'tablet';
    } else if (global.innerWidth <= 734) {
      size = 'mobile';
    }
    Store.dispatch(setPageData({ device: size }));
    matchData = JSON.parse(JSON.stringify(matchCenterExtractor(mockMatch)));
    return <div className="uvs-container">{story()}</div>;
  })
  .add('With fetched data', () => {
    matchData.channels = ['univision'];
    matchData.fixture = 'Ida';
    return makeMatchCenter({ match: matchData });
  })
  .add('With fetched data (redux)', () => {
    return makeMatchCenterConector();
  })
  .add('With pre match data', () => {
    matchData.channels = ['udn'];
    matchData.type = '1stLegEvent';
    matchData.fixture = 'Ida';
    matchData.previousOutcomes = {
      away: ['draw', 'draw', 'draw', 'win'],
      home: ['draw', 'win', 'loss', 'loss'],
    };
    return makeMatchCenter({ match: matchData });
  })
  .add('With live match data', () => {
    matchData.channels = ['unimas'];
    matchData.status = 'live';
    matchData.elapsedTime = 15;
    matchData.teams.home.scoreValue.score = 0;
    matchData.teams.away.scoreValue.score = 1;

    return makeMatchCenter({ match: matchData });
  })
  .add('With live match data and scorers', () => {
    matchData = matchCenterExtractor(mockMatch);
    matchData.channels = ['unimas'];
    matchData.status = 'live';
    matchData.elapsedTime = 15;
    matchData.leagueName = 'Liga MX';
    matchData.teams.home.scoreValue.score = 0;
    matchData.teams.away.scoreValue.score = 1;
    matchData.scorersHome = scorerProps.scorersHome;
    matchData.scorersAway = scorerProps.scorersAway;
    return (
      <MatchCenterOpening
        match={matchData}
        settings={defaultProps.settings}
        getMatch={() => {}}
      />
    );
  })
  .add('With middle time match data', () => {
    matchData.status = 'live';
    matchData.elapsedTime = 'mt';
    matchData.teams.home.scoreValue.score = 0;
    matchData.teams.away.scoreValue.score = 1;
    matchData.channels = ['univision'];
    matchData.fixture = 'Vuelta (1-2 global)';

    return makeMatchCenter({ match: matchData });
  })
  .add('With post match data', () => {
    matchData.status = 'post';
    matchData.elapsedTime = 'ft';
    matchData.type = '2ndLegEvent';
    matchData.teams.home.scoreValue.score = 1;
    matchData.teams.home.scoreValue.penalty = 2;
    matchData.teams.away.scoreValue.score = 1;
    matchData.teams.away.scoreValue.penalty = 1;
    matchData.teams.home.isWinner = true;
    matchData.channels = ['univision'];
    matchData.fixture = 'Vuelta (1-2 global)';

    return makeMatchCenter({ match: matchData });
  })
  .add('With reminder and countdown', () => {
    const now = new Date();
    matchData.date = now.setHours(now.getHours() - 2);
    matchData.type = '1stLegEvent';
    matchData.fixture = 'Ida';

    return makeMatchCenter({
      match: matchData,
      settings: Object.assign(
        {
          reminder: true,
        },
        defaultProps.settings
      ),
    });
  });
