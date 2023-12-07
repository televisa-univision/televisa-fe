import React from 'react';
import PropTypes from 'prop-types';

import features from '@univision/fe-commons/dist/config/features';
import { US } from '@univision/fe-commons/dist/constants/userLocation';
import Taboola from './Taboola';

/**
 * Wrapper to lazy load Taboola component
 * @param {string} mode mode for taboola
 * @param {string} placement placement of the taboola widget
 * @param {Object} page data of the page
 * @returns {JSX}
 */
const TaboolaContainer = ({
  mode, placement, page, isFeed, articleDepth, uri,
}) => {
  const isTaboolaDisabled = features.article.isTaboolaDisabled();
  const { data: { type }, userLocation, originalUrl } = page;
  const showTaboola = userLocation === US && !isTaboolaDisabled;
  /**
 * Renders the Taboola component.
 *
 * @param {boolean} showTaboola Whether to show the Taboola component.
 * @param {boolean} isFeed Whether the component is in Feed mode.
 * @returns {ReactNode} The rendered Taboola component.
 */
  const renderTaboola = () => {
    if (!showTaboola) {
      return null;
    }
    if (isFeed) {
      return (
        <Taboola
          mode={mode}
          placement={placement}
          pageType={type}
          uri={uri}
          isFeed={isFeed}
          articleDepth={articleDepth}
        />
      );
    }
    return (
      <Taboola
        mode={mode}
        placement={placement}
        pageType={type}
        uri={originalUrl}
        isFeed={isFeed}
        articleDepth={articleDepth}
      />
    );
  };

  return renderTaboola();
};

TaboolaContainer.propTypes = {
  mode: PropTypes.string,
  placement: PropTypes.string,
  page: PropTypes.object,
  isFeed: PropTypes.bool,
  articleDepth: PropTypes.number,
};

export default TaboolaContainer;
