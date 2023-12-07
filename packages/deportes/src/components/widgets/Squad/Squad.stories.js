import React from 'react';
import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import { getDevice } from '@univision/fe-commons/dist/utils/storybook';
import { Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';
import squadExtractor from '@univision/shared-components/dist/extractors/squadExtractor';
import * as widgetTypes from '@univision/fe-commons/dist/constants/widgetTypes';
import squad from '../../../utils/mocks/squad.json';

import SquadConnector from './SquadConnector';
import Squad from './index';

const settings = {
  uid: 1,
  competition: '385',
  season: '2018',
  team: 1283,
};
const props = {
  settings,
};
Store.dispatch(
  setPageData({
    device: getDevice(),
    data: {
      widgets: [
        {
          extraData: {
            roster: {
              data: squadExtractor(squad),
            },
          },
          settings: {
            uid: 1,
            competition: '385',
            season: '2018',
            team: 1283,
          },
          type: widgetTypes.DEPORTES_SOCCER_TEAM_SQUAD,
        },
      ],
    },
  })
);

storiesOf('Widgets/Squad', module)
  .addDecorator((story) => {
    return <Provider store={Store}>{story()}</Provider>;
  })
  .add('redux', () => <SquadConnector {...props} />)
  .add('local data', () => <Squad roster={{ data: squadExtractor(squad) }} />);
