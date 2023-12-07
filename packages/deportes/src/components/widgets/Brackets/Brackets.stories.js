import React from 'react';
import { storiesOf } from '@storybook/react';
import bracketsExtractor from '@univision/shared-components/dist/extractors/bracketsExtractor';
import standingsExtractor from '@univision/shared-components/dist/extractors/standingsExtractor';
import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import tournamentData from '../../../utils/mocks/tournamentCopaOro.json';
import tournamentLive from '../../../utils/mocks/tournamentLiveMatches.json';
import groupstandings from '../../../utils/mocks/groupStandings.json';
import standingsData from '../../../utils/mocks/standingsBrackets.json';
import tournamentUFC from '../../../utils/mocks/tournamentUFC.json';
import Brackets from '.';

const fromQuartersProps = {
  data: {
    tournamentData: bracketsExtractor(tournamentData),
    standingsData: standingsExtractor(standingsData),
  },
};

const fromRoundOf16Props = {
  data: {
    tournamentData: bracketsExtractor(tournamentUFC),
    standingsData: standingsExtractor(groupstandings),
  },
};

const liveProps = {
  data: {
    tournamentData: bracketsExtractor(tournamentLive),
    standingsData: standingsExtractor(groupstandings),
  },
};

storiesOf('Widgets/Brackets/', module)
  .addDecorator((story) => {
    Store.dispatch(setPageData({ device: global.innerWidth > 480 ? 'desktop' : 'mobile' }));
    return (
      <div
        style={{
          background: '#FFFFFF',
          height: '100vh',
          width: '100vw',
          position: 'absolute',
        }}
      >
        <div className="uvs-container">{story()}</div>
      </div>
    );
  })
  .add('from quarters', () => <Brackets {...fromQuartersProps} />)
  .add('from Round of 16 ', () => <Brackets {...fromRoundOf16Props} />)
  .add('from quarters with live matches', () => <Brackets {...liveProps} />);
