import React from 'react';
import { storiesOf } from '@storybook/react';
import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import { getDevice } from '@univision/fe-commons/dist/utils/storybook';
import standingsExtractor from '@univision/shared-components/dist/extractors/standingsExtractor';
import GroupPhase from '.';
import groupstandings from '../../../../utils/mocks/groupStandings.json';
import standing from '../../../../utils/mocks/standings.json';

const device = getDevice();

const dataStandings = standingsExtractor(standing);
const groupStanding = standingsExtractor(groupstandings);
const props = {
  data: groupStanding,
};

storiesOf('Widgets/Brackets/GroupPhase', module)
  .addDecorator(story => (
    <div className="uvs-container">{story()}</div>
  ))
  .add('with multiple groups', () => {
    Store.dispatch(setPageData({ device }));

    return (
      <GroupPhase {...props} leagueId="5" />
    );
  })
  .add('with one group', () => {
    Store.dispatch(setPageData({ device }));

    return (
      <GroupPhase data={dataStandings} leagueId="385" />
    );
  });
