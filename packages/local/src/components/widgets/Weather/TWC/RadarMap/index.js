import React from 'react';
import PropTypes from 'prop-types';
import Store from '@univision/fe-commons/dist/store/store';
import { getDevice } from '@univision/fe-commons/dist/store/storeHelpers';
import credentials from '../config/credentials.json';
import WxWidget from '../WxWidget';

import Styles from './RadarMap.scss';

/**
 * Radar Map. Renders a WxWidget with these settings:
 * - Layer:     Radar and Satellite
 * - Overlays:  Temperature Plots
 *
 * @param {Object} settings Widget settings.
 * @returns {JSX}
 * @constructor
 */
const RadarMap = ({ settings }) => {
  const {
    type,
    uid,
    title,
    titleLink,
    ...widgetProps
  } = settings;

  const isMobile = getDevice(Store) === 'mobile';

  return (
    <div className="uvs-widget">
      <WxWidget
        titleSettings={{
          title,
          titleLink,
        }}
        className={Styles.container}
        cid={credentials.cid}
        mapid={credentials.mapId}
        memberid={credentials.memberId}
        fullscreen={isMobile}
        animate={!isMobile}
        standalone
        header={false}
        theme="dark-gray" // TWC theme, don't confuse it with webapp theme.
        {...widgetProps}
      />
    </div>
  );
};

RadarMap.propTypes = {
  settings: PropTypes.shape({
    title: PropTypes.string,
    titleLink: PropTypes.string,
    type: PropTypes.string,
    uid: PropTypes.string,
    animate: PropTypes.bool,
  }),
};

export default RadarMap;
