import React from 'react';
import PropTypes from 'prop-types';

import { getKey } from '@univision/fe-commons/dist/utils/helpers';
import Store from '@univision/fe-commons/dist/store/store';
import { getBrandable, getDevice } from '@univision/fe-commons/dist/store/storeHelpers';

import MapType from '../config/MapType';
import MapLayer from '../config/MapLayer';
import MapOverlay from '../config/MapOverlay';
import MapAlert from '../config/MapAlert';
import credentials from '../config/credentials.json';
import WxWidget from '../WxWidget';

import Styles from './TropicalSystemsMap.scss';

/**
 * Tropical Systems Map. Renders a WxWidget with these settings:
 * - Layer:     Radar and Satellite
 * - Overlays:  Storm tracks, Active Tropical track
 * - Alerts:    Severe, Tropical
 *
 * @param {Object} settings Widget settings.
 * @returns {JSX}
 * @constructor
 */
const TropicalSystemsMap = ({ settings }) => {
  const marketCall = getKey(getBrandable(Store), 'tvStation.call', '');
  const shouldOverrideMap = marketCall === 'WLTV' || marketCall === 'WLII' || marketCall === 'WUVG';
  const shouldAnimate = getDevice(Store) !== 'mobile';

  let zoomLevel = 12;

  if (shouldOverrideMap && shouldAnimate) {
    zoomLevel = 4;
  } else if (shouldOverrideMap && !shouldAnimate) {
    zoomLevel = 3;
  }

  let menuitems;

  if (shouldOverrideMap) {
    menuitems = [
      MapType.Earth,
      MapLayer.RadarSatellite,
      MapOverlay.ActiveTropicalTrack,
    ].join();
  } else {
    menuitems = [
      MapType.Earth,
      MapLayer.RadarSatellite,
      MapOverlay.StormTracks, MapOverlay.ActiveTropicalTrack,
      MapAlert.Severe, MapAlert.Tropical,
    ].join();
  }

  return (
    <div className="uvs-widget">
      <WxWidget
        titleSettings={settings}
        className={Styles.container}
        cid={credentials.cid}
        mapid={credentials.mapId}
        memberid={credentials.memberId}
        menuitems={menuitems}
        standalone
        header={false}
        theme="dark-gray" // TWC theme, don't confuse it with webapp theme.
        zoomlevel={zoomLevel}
        animate={shouldOverrideMap && shouldAnimate}
      />
    </div>
  );
};

TropicalSystemsMap.propTypes = {
  settings: PropTypes.shape({
    title: PropTypes.string,
  }),
};

export default TropicalSystemsMap;
