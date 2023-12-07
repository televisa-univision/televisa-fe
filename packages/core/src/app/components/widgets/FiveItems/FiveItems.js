import PropTypes from 'prop-types';
import React from 'react';

import PromoItem from '@univision/fe-components-base/dist/components/PromoItem';
import * as sizes from '@univision/fe-components-base/dist/components/Picture/imageSizes';
import { exists } from '@univision/fe-commons/dist/utils/helpers';
/**
 * Opening Widget with Five Promo Items.
 * Uses the bootstrap grid to create a layout of one large
 * {@link PromoItem} and a 2x2 grid of 4 {PromoItem}s
 * @param {Object} props React Props for this component
 * @returns {JSX}
 * @constructor
 */
const FiveItems = ({ content }) => {
  if (exists(content) && Array.isArray(content)) {
    const relatedContent = content.filter((item, index) => index !== 0 && index < 5);
    // DeviceSizeOverride for first item
    const firstPromoItemDSO = {
      xl: sizes.MEDIUM,
      lg: sizes.MEDIUM,
    };

    const relatedPromoItems = relatedContent.map(contentData => (
      <div key={contentData.uid} className="col-md-6">
        <PromoItem key={contentData.uid} {...contentData} />
      </div>
    ));

    return (
      <div className="uvs-widget opening-five-items row">
        <div className="col-md">
          <PromoItem {...content[0]} deviceSizeOverrides={firstPromoItemDSO} />
        </div>
        <div className="col-md">
          <div className="row">{relatedPromoItems}</div>
        </div>
      </div>
    );
  }
  return <div />;
};

/**
 * propTypes
 * @property {Array} content Array of content items to be used by this widget
 */
FiveItems.propTypes = {
  content: PropTypes.array.isRequired,
};

export default FiveItems;
