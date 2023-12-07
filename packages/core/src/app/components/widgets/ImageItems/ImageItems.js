import PropTypes from 'prop-types';
import React from 'react';

import Store from '@univision/fe-commons/dist/store/store';
import { getTheme } from '@univision/fe-commons/dist/store/storeHelpers';
import FourItems from 'components/widgets/FourItems/FourItems';
import SixItems from 'components/widgets/SixItems/SixItems';
import PromoItem from '@univision/fe-components-base/dist/components/PromoItem';
import TopicBar from '@univision/fe-components-base/dist/components/TopicBar';
import { hasKey } from '@univision/fe-commons/dist/utils/helpers';

/**
 * Image Items widget
 * {@link PromoItem}
 * @param {Object} props React Props for this component
 * @returns {JSX}
 * @constructor
 */
const ImageItems = ({ content, settings }) => {
  if (Array.isArray(content) && content.length) {
    if (hasKey(settings, 'genericWidget.type')) {
      switch (settings.genericWidget.type) {
        case 'FourItems':
          return <FourItems content={content} settings={settings} />;
        case 'SixItems':
          return <SixItems content={content} settings={settings} />;
        default:
          break;
      }
    }
    const promoItems = content.map(contentData => (
      <div key={contentData.uid} className="col-md">
        <PromoItem {...contentData} />
      </div>
    ));

    return (
      <div className="uvs-widget">
        {settings
          && settings.title && (
            <TopicBar settings={settings} separator="top" theme={getTheme(Store)} />
        )}
        <div className="image-items-widget row">{promoItems}</div>
      </div>
    );
  }
  return null;
};

/**
 * propTypes
 * @property {Array} content Array of content items to be used by this widget
 */
ImageItems.propTypes = {
  content: PropTypes.array,
  settings: PropTypes.object,
};

/**
 * Default Prop Values
 * @property {Array} content Default array of content items to be used by this widget
 */
ImageItems.defaultProps = {
  content: [],
  settings: {},
};

export default ImageItems;
