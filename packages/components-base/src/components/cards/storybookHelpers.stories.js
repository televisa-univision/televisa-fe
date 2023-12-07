import React from 'react';
import { Provider } from 'react-redux';
import MainTracking from '@univision/fe-commons/dist/components/tracking/MainTracking';

import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';

/**
 * Set the DIMs config in the Store.
 */
export const setDimsConfig = () => {
  Store.dispatch(setPageData({
    config: {
      dims: {
        baseUrl: 'https://uat2.x.univision.com/dims4/default/',
        sharedSecret: '2bbd31304d3e4a2a72bd064722797943',
      },
    },
  }));
};

/**
 * Enable tracking.
 * @param {Object} Component React component
 * @param {Object} content Card content
 * @param {string} cardName Card name
 * @param {string} cardType Card type
 * @param {string} cardSize Card size
 * @param {boolean} showNative Param from native ad marker
 * @param {Object} overrideContext overrides widget context data
 * @returns {*}
 */
export const withTracker = (
  Component,
  content,
  cardName,
  cardType,
  cardSize,
  showNative = false,
  overrideContext = {},
) => {
  const widgetContext = {
    title: 'Test title',
    name: 'Test name',
    position: 1,
    metaData: {
      cardName,
      cardType,
    },
    isActionBarEnabled: true,
    ...overrideContext,
  };
  const props = {
    ...content,
    type: cardType,
    showNative,
    widgetContext,
    size: cardSize,
  };
  return (
    <Provider store={Store}>
      <React.Fragment>
        <MainTracking page={{ data: { ...content } }} />
        <Component {...props} />
      </React.Fragment>
    </Provider>
  );
};
