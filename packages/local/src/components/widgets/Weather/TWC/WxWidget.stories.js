import React from 'react';
import { storiesOf } from '@storybook/react';

import MapType from './config/MapType';
import MapLayer from './config/MapLayer';
import MapOverlay from './config/MapOverlay';
import MapAlert from './config/MapAlert';
import credentials from './config/credentials.json';

import RadarMap from './RadarMap';
import TropicalSystemsMap from './TropicalSystemsMap';
import WxWidget from './WxWidget';

storiesOf('Widgets/Weather/TWC', module)
  .add('Multiple Widgets', () => {
    return (
      <div>
        <WxWidget
          titleSettings={{ title: 'Mapa 1' }}
          cid={credentials.cid}
          mapid={credentials.mapId}
          memberid={credentials.memberId}
          menuitems={[MapType.Earth, MapLayer.RadarSatellite, MapOverlay.TemperaturePlots].join()}
        />
        <WxWidget
          titleSettings={{ title: 'Mapa 2' }}
          cid={credentials.cid}
          mapid={credentials.mapId}
          memberid={credentials.memberId}
          menuitems={[MapType.Earth, MapLayer.Precipitation, MapAlert.Tropical].join()}
        />
        <RadarMap settings={{ title: 'Radar Map' }} />
        <TropicalSystemsMap settings={{ title: 'Tropical Systems Map' }} />
      </div>
    );
  });
