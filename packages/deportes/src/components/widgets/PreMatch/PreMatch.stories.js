import React from 'react';

import { storiesOf } from '@storybook/react';
import preMatchExtractor from '@univision/shared-components/dist/extractors/preMatchExtractor';
import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import SportApiProvider from '../../utils/SportApiProvider';
import prematch from '../../../utils/mocks/prematch.json';
import prematch2 from '../../../utils/mocks/prematch_v2.json';

import PreMatch from '.';

const preMatch2Data = preMatchExtractor(prematch2);
const preMatchData = preMatchExtractor(prematch);
storiesOf('Widgets/PreMatch/PreMatchWidget', module)
  .addDecorator((story) => {
    Store.dispatch(setPageData({ device: global.innerWidth > 768 ? 'desktop' : 'mobile' }));
    return (<div className="uvs-container">{story()}</div>);
  })
  .add('with SportApi Wrapper', () => {
    return (
      <SportApiProvider
        path="/v1/schedule-results/soccer/920438"
        render={(data) => {
          const preMatch = preMatchExtractor(data);
          return (
            <PreMatch
              data={preMatch}
            />
          );
        }}
      />
    );
  })
  .add('with local mock data no Top scorers', () => (
    <PreMatch data={preMatchData} />))
  .add('with local mock data no Top scorers, with empty latest matches', () => (
    <PreMatch data={preMatch2Data} />));
