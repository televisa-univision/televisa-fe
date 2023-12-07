import React from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';

import OpeningWeatherForecastPlaceholder from '@univision/fe-components-base/dist/components/Placeholder/OpeningWeatherForecast';
import toRelativeUrl from '@univision/fe-utilities/helpers/url/toRelativeUrl';

const OpeningWidgetController = dynamic(
  () => import(/* webpackChunkName: "localMarketsWidgets-cpm" */ '@univision/fe-local/dist/components/connected/OpeningWeatherForecast'),
  { loading: OpeningWeatherForecastPlaceholder },
);

/**
 * OpeningWidgetWrapper to show OpeningWidgetController
 * when this is a local page
 * @param {Object} props component props
 * @param {Object} props.tvStation current local market
 * @param {string} props.uri current page uri
 * @returns {JSX}
 */
const OpeningWidgetWrapper = ({ tvStation, uri }) => {
  const localMarketUri = toRelativeUrl(tvStation?.uri);
  const isLocalPage = `${localMarketUri}/tiempo` === toRelativeUrl(uri);

  if (!isLocalPage) return null;

  return <OpeningWidgetController />;
};

OpeningWidgetWrapper.propTypes = {
  tvStation: PropTypes.object,
  uri: PropTypes.string,
};

export default OpeningWidgetWrapper;
