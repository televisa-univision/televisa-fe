import React from 'react';
import { storiesOf } from '@storybook/react';
import { Provider } from 'react-redux';
import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import teamsExtractor from '@univision/shared-components/dist/extractors/teamsExtractor';
import * as widgetTypes from '@univision/fe-commons/dist/constants/widgetTypes';
import SportApiProvider from '../../utils/SportApiProvider';
import mockTeams from '../../../utils/mocks/teams.json';
import TeamsGridConnector from './TeamsGridConnector';
import TeamsGrid from '.';

const API_BASE = '/v1/rosters/soccer';
const defaultProps = {
  settings: {
    uid: '00000162-6e55-d5c9-a96a-7ff5282c0000',
    type: 'soccerwidgetteams',
    soccerCompetitionSeason: {
      seasonId: '2017',
      soccerCompetition: {
        id: '5',
        league: {
          activeSoccerCompetitionURL: 'https://www.univision.com/deportes/futbol/liga-mx-clausura',
        },
      },
    },
  },
};
const dataTeams = {
  data: teamsExtractor(mockTeams),
};
const actionsMock = {
  getTeams: () => {},
};

Store.dispatch(
  setPageData({
    data: {
      widgets: [
        {
          extraData: {
            data: teamsExtractor(mockTeams),
          },
          settings: defaultProps.settings,
          type: widgetTypes.DEPORTES_GRID_SOCCER_TEAMS_CRESTS,
        },
      ],
    },
  })
);

/**
 * Create TeamsGrid widget with API wrapper
 * @param {Object} props - additional props
 * @returns {JSX}
 */
function makeTeamsGrid(props) {
  return (
    <SportApiProvider
      path={`${API_BASE}/2017?competitionKey=5`}
      render={(data) => {
        dataTeams.data = teamsExtractor(data);

        return (
          <TeamsGrid
            {...Object.assign(
              {
                teams: dataTeams,
                getTeams: actionsMock.getTeams,
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
 * Create TeamsGrid widget with Redux conector
 * @param {Object} props - additional props
 * @returns {JSX}
 */
function makeTeamsGridConector(props) {
  return (
    <Provider store={Store}>
      <TeamsGridConnector {...Object.assign({}, defaultProps, props)} />
    </Provider>
  );
}

storiesOf('Widgets/TeamsGrid', module)
  .addDecorator(story => <div className="uvs-container">{story()}</div>)
  .add('Default (redux): square', () => makeTeamsGridConector())
  .add('Default (redux): bar', () => makeTeamsGridConector({
    settings: Object.assign(
      {
        styleType: 'bar',
      },
      defaultProps.settings
    ),
  }))
  .add('Summary (redux)', () => makeTeamsGridConector({
    settings: Object.assign(
      {
        displayType: {
          value: 'Collapsed',
        },
      },
      defaultProps.settings
    ),
  }))
  .add('With fetch data', () => makeTeamsGrid())
  .add('With mock data', () => <TeamsGrid {...defaultProps} {...actionsMock} teams={dataTeams} />);
