import React from 'react';

import { storiesOf } from '@storybook/react';
import preMatchExtractor from '@univision/shared-components/dist/extractors/preMatchExtractor';

import data from '../../../../../utils/mocks/prematch.json';
import LatestMatchesCard from '.';

const props = preMatchExtractor(data);

storiesOf('Widgets/PreMatch/PreMatchLayout/LatestMatchesCard', module)
  .add('default', () => (
    <LatestMatchesCard events={props.previousEncounters} />))
  .add('no events', () => (
    <LatestMatchesCard />));
