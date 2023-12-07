import PropTypes from 'prop-types';
import React from 'react';

import { hasKey } from '@univision/fe-commons/dist/utils/helpers';
import NumericList from '@univision/fe-components-base/dist/components/NumericList';
import Styles from './RelatedContent.scss';

/**
 * Related Content
 * @param {Object} props component props
 * @returns {JSX}
 */
const RelatedContent = ({ content }) => {
  return (
    <div className={Styles.wrapper}>
      {hasKey(content, 'relatedContent')
        && Array.isArray(content.relatedContent)
        && hasKey(content, 'relatedContentTitle') && (
          <NumericList
            title={content.relatedContentTitle}
            contents={content.relatedContent}
          />
      )}
    </div>
  );
};

/**
 * propTypes
 * @property {Object} content Array of content items to be used by this widget
 */
RelatedContent.propTypes = {
  content: PropTypes.object,
};

export default RelatedContent;
