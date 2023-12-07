import React, { useState } from 'react';

import { fetchWidgetApi } from '@univision/fe-commons/dist/utils/api/fetchApi';
import { useInterval } from '@univision/fe-commons/dist/utils/hooks';
import { getKey } from '@univision/fe-commons/dist/utils/helpers';
import OpeningCard from './OpeningCard';

const REFETCH_INTERVAL = 60000;

/**
 * The OpeningCard data provider
 * passes the original data to the card
 * and fetches new data every minute
 * @param {Object} props the props to pass to the card
 * @returns {JSX}
 */
function OpeningCardDataProvider(props) {
  const [data, setData] = useState(props);

  /**
   * Refetch the card data
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
    <OpeningCard data={getKey(data, 'content.0', {})} {...props} />
  );
}

export default OpeningCardDataProvider;
