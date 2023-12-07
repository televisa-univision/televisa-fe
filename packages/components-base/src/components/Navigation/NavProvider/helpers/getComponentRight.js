import React from 'react';
import Loadable from 'react-loadable';

import * as brandableTypes from '@univision/fe-commons/dist/utils/brandable/types';
import { PODCAST, RADIO, MUSIC } from '@univision/fe-commons/dist/constants/pageCategories';

/**
 * Private helper to get a loadable component options object
 * otherwise jest will not cover the loading for the second component tested
 * @param {string} path the current page type
 * @returns {{ loading, modules, webpack  }}
 */
function getLoadableComponentOptions() {
  return {
    loading: () => null,
  };
}

const PodcastCTA = Loadable({
  loader: () => import(/* webpackChunkName: "podcastCTAIcon" */ '../../../PodcastCTA'),
  ...getLoadableComponentOptions(),
});

const WeatherConditionIcon = Loadable({
  loader: () => import(/* webpackChunkName: "weatherConditionIcon" */ '../../../widgets/Weather/WeatherConditionIcon'),
  ...getLoadableComponentOptions(),
});

/**
 * Returns the component to be added to the right column based off the brandableType
 * @param {string} brandableType Type of section
 * @param {string} pageCategory page category
 * @returns {function}
 */
export default function (brandableType, pageCategory) {
  if (brandableType === brandableTypes.tv) {
    return () => <WeatherConditionIcon />;
  }

  if ([PODCAST, RADIO, MUSIC].includes(pageCategory)) {
    return () => <PodcastCTA />;
  }

  return null;
}
