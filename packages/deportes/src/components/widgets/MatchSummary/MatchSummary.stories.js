import React from 'react';
import { storiesOf } from '@storybook/react';
import { Provider } from 'react-redux';
import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import matchSummaryExtractor from '@univision/shared-components/dist/extractors/summaryMatchExtractor';
import { getDevice } from '@univision/fe-commons/dist/utils/storybook';
import lineupResponse from '../../../utils/mocks/lineup.json';
import MatchSummaryConnector from './MatchSummaryConnector';
import MatchSummary from '.';

const device = getDevice();

const settings = {
  uid: '666',
  type: 'DeportesMatchSummary',
  matchId: '983129',
};

storiesOf('Widgets/MatchSummary', module)
  .addDecorator(story => (
    <div className="uvs-container">{story()}</div>
  ))
  .add('default (redux)', () => {
    Store.dispatch(setPageData({
      data: {
        widgets: [{
          extraData: {
            data: matchSummaryExtractor(lineupResponse),
          },
          settings: {
            uid: '666',
            type: 'DeportesMatchSummary',
          },
          type: 'DeportesMatchSummary',
        }],
      },
      device,
    }));

    const props = {
      settings,
    };

    return (
      <Provider store={Store} key="matchSummary-story">
        <MatchSummaryConnector {...props} />
      </Provider>
    );
  })
  .add('with mock data', () => {
    Store.dispatch(setPageData({ device }));
    return <MatchSummary data={matchSummaryExtractor(lineupResponse)} />;
  });
