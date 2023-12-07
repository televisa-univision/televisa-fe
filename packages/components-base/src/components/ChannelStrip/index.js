import React, { useState } from 'react';

import { getKey } from '@univision/fe-commons/dist/utils/helpers';
import { fetchWidgetApi } from '@univision/fe-commons/dist/utils/api/fetchApi';
import { useInterval } from '@univision/fe-commons/dist/utils/hooks';
import ChannelStrip from './ChannelStrip';

const REFETCH_INTERVAL = 60000;

/**
 * ChannelStrip component.
 * @param {Object} props React Props for this component
 * @returns {JSX}
 * @constructor
 */
function ChannelStripDataProvider(props) {
  const [data, setData] = useState(props);
  /**
   * Refetch channel strip data
   */
  const refetchData = async () => {
    const refetchUrl = `${global.window.location.origin}${global.window.location.pathname}`;
    const newData = await fetchWidgetApi(refetchUrl, getKey(props, 'settings.uid'));
    if (typeof getKey(newData, 'widget') === 'object') {
      newData.widget.content = getKey(newData, 'widget.contents', []);
      setData(newData.widget);
    }
  };

  useInterval(() => {
    refetchData();
  }, REFETCH_INTERVAL);
  return (
    <ChannelStrip data={getKey(data, 'content.0', {})} />
  );
}

export default ChannelStripDataProvider;
