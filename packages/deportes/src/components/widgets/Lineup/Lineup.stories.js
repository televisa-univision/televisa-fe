import React from 'react';
import { storiesOf } from '@storybook/react';
import { Provider } from 'react-redux';

import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import lineupExtractor from '@univision/shared-components/dist/extractors/lineupExtractor';
import SportApiProvider from '../../utils/SportApiProvider';
import lineupResponse from '../../../utils/mocks/lineup.json';
import lineupIncompleteResponse from '../../../utils/mocks/lineupNotAnnounced.json';
import lineupNoHome from '../../../utils/mocks/lineupNoHomeFormation.json';
import lineupNoAway from '../../../utils/mocks/lineupNoAwayFormation.json';
import LineupConnector from './LineupConnector';
import Lineup from '.';

const settings = {
  uid: '1',
  matchId: '943127',
  soccerMatchStatus: 'PRE',
};

const props = {
  settings,
};

const lineupData = lineupExtractor(lineupResponse);
const lineupIncompleteData = lineupExtractor(lineupIncompleteResponse);
const lineupNoHomeData = lineupExtractor(lineupNoHome);
const lineupNoAwayData = lineupExtractor(lineupNoAway);

storiesOf('Widgets/Lineup/LineupWidget', module)
  .addDecorator(story => <div className="uvs-container">{story()}</div>)
  .add('Default (redux)', () => {
    Store.dispatch(
      setPageData({
        data: {
          widgets: [
            {
              extraData: {
                data: lineupExtractor(lineupResponse),
              },
              settings: {
                uid: '1',
                matchId: '943127',
                soccerMatchStatus: 'PRE',
              },
              type: 'DeportesMatchCenterLineup',
            },
          ],
        },
      })
    );
    return (
      <Provider store={Store}>
        <LineupConnector {...props} />
      </Provider>
    );
  })
  .add('default mock data', () => <Lineup data={lineupData} />)
  .add('with SportApi Wrapper', () => {
    return (
      <SportApiProvider
        path="/v1/stats/soccer/928520"
        render={(data) => {
          const lineupSAP = lineupExtractor(data);
          return <Lineup data={lineupSAP} />;
        }}
      />
    );
  })
  .add('with incomplete mock data', () => <Lineup data={lineupIncompleteData} />)
  .add('with no Home formation mock data', () => <Lineup data={lineupNoHomeData} />)
  .add('with no Away formation mock data', () => <Lineup data={lineupNoAwayData} />);
