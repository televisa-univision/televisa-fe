import React from 'react';
import { storiesOf } from '@storybook/react';
import { Provider } from 'react-redux';
import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import matchesExtractor from '@univision/shared-components/dist/extractors/matchesExtractor';
import SportApiProvider from '../../utils/SportApiProvider';
import matches from '../../../utils/mocks/matches.json';
import leagues from '../../../utils/mocks/leagues.json';
import MatchesConnector from './MatchesConnector';
import Matches from '.';

const API_BASE = '/v1/schedule-results/soccer';
const defaultProps = {
  settings: {
    uid: '00000162-6e55-d5c9-a96a-7ff5282c0000',
    type: 'soccerwidgetmatches',
    highlightedCompetitionSeasons: leagues,
  },
};
const teamData = {
  soccerTeamSeason: {
    teamName: 'Colombia',
    teamId: '832',
    soccerCompetitionSeason: {
      seasonId: '2014',
      seasonName: 'Season 2014/2015',
    },
  },
};
const dataMatches = {
  events: [],
};
const actionsMock = {
  getMatches: () => {},
};

/**
 * Create Matches widget with API wrapper
 * @param {Object} props - additional props
 * @returns {JSX}
 */
function makeMatches(props) {
  return (
    <SportApiProvider
      path={`${API_BASE}?competitionKey=5`}
      render={(data) => {
        dataMatches.events = matchesExtractor(data);
        return (
          <Matches
            {...Object.assign(
              {
                matches: dataMatches,
                getMatches: actionsMock.getMatches,
              },
              defaultProps,
              props
            )}
          />
        );
      }}
    />
  );
}

/**
 * Create Matches widget with Redux conector
 * @param {Object} extraProps - additional props
 * @returns {JSX}
 */
function makeMatchesConector(extraProps) {
  const dataProps = Object.assign({}, defaultProps, extraProps);
  Store.dispatch(
    setPageData({
      data: {
        widgets: [
          {
            extraData: {
              events: matchesExtractor(matches),
            },
            settings: dataProps.settings,
            type: 'DeportesGridSoccerMatchesResultsandCalendar',
          },
        ],
      },
    })
  );

  return (
    <Provider store={Store}>
      <MatchesConnector {...dataProps} />
    </Provider>
  );
}

storiesOf('Widgets/Matches', module)
  .addDecorator((story) => {
    let size = 'desktop';
    if (global.innerWidth <= 768 && global.innerWidth > 734) {
      size = 'tablet';
    } else if (global.innerWidth <= 734) {
      size = 'mobile';
    }
    Store.dispatch(setPageData({ device: size }));
    return <div className="uvs-container">{story()}</div>;
  })
  .add('Default ASC (redux)', () => makeMatchesConector())
  .add('Default DESC (redux)', () => makeMatchesConector({
    settings: Object.assign(
      {
        sort: 'date-desc',
      },
      defaultProps.settings
    ),
  }))
  .add('Section League ASC (redux)', () => makeMatchesConector({
    settings: Object.assign({}, defaultProps.settings, {
      sort: 'date-asc',
      displayType: {
        value: 'Full',
      },
      highlightedCompetitionSeasons: leagues.slice(0, 1),
    }),
  }))
  .add('Section League DESC (redux)', () => makeMatchesConector({
    settings: Object.assign({}, defaultProps.settings, {
      sort: 'date-desc',
      displayType: {
        value: 'Full',
      },
      highlightedCompetitionSeasons: leagues.slice(0, 1),
    }),
  }))
  .add('With reminder (redux)', () => makeMatchesConector({
    settings: Object.assign(
      {
        reminder: true,
      },
      defaultProps.settings
    ),
  }))
  .add('Collapsed', () => makeMatches())
  .add('Full', () => makeMatches({
    settings: {
      displayType: {
        value: 'Full',
      },
      highlightedCompetitionSeasons: leagues.slice(0, 1),
    },
  }))
  .add('For team', () => makeMatches({
    settings: teamData,
  }))
  .add('With mock data', () => makeMatches({
    matches: {
      events: matchesExtractor(matches),
    },
  }))
  .add('With mock data (reminder)', () => makeMatches({
    matches: {
      events: matchesExtractor(matches),
    },
    settings: Object.assign(
      {
        reminder: true,
      },
      defaultProps.settings
    ),
  }));
