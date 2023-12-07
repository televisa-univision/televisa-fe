import React from 'react';

import { storiesOf } from '@storybook/react';
import Icon from '@univision/fe-icons/dist/components/Icon';

import { PlayStationButtonComponent } from './PlayStationButton';

const props = {
  abacastId: '2315',
  stationTitle: 'KLVE',
  type: 'stationList',
  device: 'mobile',
};

storiesOf('Widgets/PlayStationButton', module)
  .add('stationList context', () => (
    <PlayStationButtonComponent {...props}>
      Play station <Icon name="play" size="small" fill="black" />
    </PlayStationButtonComponent>
  ))
  .add('toolbar context', () => <PlayStationButtonComponent {...props} type="toolbar" color="#0d63bc" />)
  .add('nowPlaying context', () => <PlayStationButtonComponent {...props} type="nowPlaying" color="#0d63bc" />)
  .add('desktop device', () => <PlayStationButtonComponent {...props} type="nowPlaying" color="#0d63bc" device="desktop" />);
