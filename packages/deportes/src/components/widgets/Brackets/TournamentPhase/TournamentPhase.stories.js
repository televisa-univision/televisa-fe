import React from 'react';
import { storiesOf } from '@storybook/react';
import bracketsExtractor from '@univision/shared-components/dist/extractors/bracketsExtractor';
import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import tournamentData from '../../../../utils/mocks/tournamentCopaOro.json';
import tournamentUFC from '../../../../utils/mocks/tournamentUFC.json';
import TournamentPhase from '.';

const props1 = {
  tournament: bracketsExtractor(tournamentData),
};

const props2 = {
  tournament: bracketsExtractor(tournamentUFC),
};

storiesOf('Widgets/Brackets/TournamentPhase', module)
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
  .add('from QuarterFinals ', () => <TournamentPhase {...props1} />)
  .add('from Round of 16 ', () => <TournamentPhase {...props2} />)
  .add('mobile active:  Round of 16 ', () => <TournamentPhase {...props2} active="roundOf16" isMobile />)
  .add('mobile active: quarter Finals ', () => <TournamentPhase {...props2} active="quarterFinals" isMobile />)
  .add('mobile active: semifinals ', () => <TournamentPhase {...props2} active="semiFinals" isMobile />)
  .add('mobile active: finals', () => <TournamentPhase {...props2} active="finals" isMobile />);
