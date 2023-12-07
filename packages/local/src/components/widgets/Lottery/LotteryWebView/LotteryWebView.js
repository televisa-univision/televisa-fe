import React from 'react';
import PropTypes from 'prop-types';

import Lottery from '..';

/**
 * Renders the lottery widget using the prop in the webview
 * @param {string} market Local market name
 * @returns {JSX}
 */
const LotteryWebView = ({ market }) => {
  if (!market) {
    return null;
  }
  return <Lottery market={decodeURI(market)} disableTopAd />;
};

/**
 * propTypes
 * @property {String} market - Local market name: Miami, Nueva York, Atlanta, Los Angeles, etc
 */
LotteryWebView.propTypes = {
  market: PropTypes.string,
};

export default LotteryWebView;
