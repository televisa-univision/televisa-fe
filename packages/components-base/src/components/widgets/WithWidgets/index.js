/* eslint-disable react/no-array-index-key */
import React, { Fragment } from 'react';

import Store from '@univision/fe-commons/dist/store/store';
import { getPageData } from '@univision/fe-commons/dist/store/storeHelpers';
import { hasKey, isInArray } from '@univision/fe-commons/dist/utils/helpers';
import adHelper from '@univision/fe-commons/dist/utils/ads/adHelper';
import ErrorBoundary from '@univision/fe-commons/dist/components/ErrorBoundary';

import getWidgetsConfig from './config';

/**
 * HOC to insert Widgets below or above a component
 * @param {Object} component to be proxy
 * @param {Array|string} insertionPoints for the widgets
 * @returns {React.Component}
 */
export default function(component, insertionPoints) {
  /**
   * HOC to add appropriate props to content cards if promo is radioStation
   * @returns {React.Component}
   */
  const WithWidgets = () => {
    const pageData = getPageData(Store);
    const widgetsConfig = getWidgetsConfig(pageData);
    const below = [];
    const above = [];
    // Widgets for any page category
    let widgets = widgetsConfig.any || [];
    // Page category specific widgets
    if (hasKey(pageData, 'pageCategory') && hasKey(widgetsConfig, pageData.pageCategory)) {
      widgets = widgets.concat(widgetsConfig[pageData.pageCategory]);
    }

    // Insert widgets in the corresponding position
    widgets
      .filter((config) => {
        if (Array.isArray(insertionPoints)) {
          return isInArray(config.insertionPoint, insertionPoints);
        }
        return config.insertionPoint === insertionPoints;
      })
      .filter(config => typeof config.shouldRender !== 'function' || config.shouldRender())
      .forEach((config, index) => {
        const array = config.insertionPoint.position === 'above' ? above : below;
        array.push(
          <ErrorBoundary key={`errorKey${index}`}>
            <config.widget.component {...config.widget.props} />
          </ErrorBoundary>
        );
        if (config.advertisement) {
          const ad = (
            <div className="uvs-ad-full-width" key={`adWrapper${index}`}>
              {adHelper.getAd(config.advertisement, { isLazyLoaded: false })}
            </div>
          );
          array.push(ad);
        }
      });

    // if everything is null, there's nothing to render!
    if (!(component || above.length || below.length)) {
      return null;
    }

    return (
      <Fragment>
        {above}
        {component}
        {below}
      </Fragment>
    );
  };

  return WithWidgets;
}
