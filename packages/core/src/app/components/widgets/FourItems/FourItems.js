import PropTypes from 'prop-types';
import React from 'react';

import Store from '@univision/fe-commons/dist/store/store';
import { getTheme } from '@univision/fe-commons/dist/store/storeHelpers';
import PromoItem from '@univision/fe-components-base/dist/components/PromoItem';
import TopicBar from '@univision/fe-components-base/dist/components/TopicBar';
import { exists } from '@univision/fe-commons/dist/utils/helpers';
import Styles from './FourItems.scss';

/**
 * Widget with Four Items.
 * @param {Object} props React Props for this component
 * @returns {JSX}
 * @constructor
 */
const FourItems = ({ content, settings }) => {
  if (exists(content) && content.length > 0) {
    const maxItems = 4;
    // PromoItem grid 4x1 where all have horizontal view
    const mobileStructure = content
      .filter((contentData, index) => index < maxItems)
      .map(contentData => (
        <div key={contentData.uid} className="col-xs-12">
          <PromoItem {...contentData} key={contentData.uid} view="horizontal" />
        </div>
      ));
    // PromoItem grid 2x2 where all have vertical view
    const desktopStructure = content
      .filter((contentData, index) => index < maxItems)
      .map(contentData => (
        <div key={contentData.uid} className="col-sm-6">
          <PromoItem {...contentData} key={contentData.uid} />
        </div>
      ));

    return (
      <div className="uvs-widget">
        {settings
          && settings.title && (
            <TopicBar
              settings={settings}
              separator="bottom"
              align="center"
              theme={getTheme(Store)}
            />
        )}
        <div className={`${Styles.mobile} row`}>{mobileStructure}</div>
        <div className={`${Styles.desktop} row`}>{desktopStructure}</div>
      </div>
    );
  }
  return <div />;
};

/**
 * propTypes
 * @property {Array} content Array of content items to be used by this widget
 * @property {Object} settings Object with this widget's settings
 */
FourItems.propTypes = {
  content: PropTypes.array,
  settings: PropTypes.object,
};

export default FourItems;
