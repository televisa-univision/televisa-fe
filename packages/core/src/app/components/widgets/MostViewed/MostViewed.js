import PropTypes from 'prop-types';
import React from 'react';

import { hasKey } from '@univision/fe-commons/dist/utils/helpers';
import NumericList from '@univision/fe-components-base/dist/components/NumericList';
import Styles from './MostViewed.scss';

/**
 * Most Viewed for section pages
 * @param {Object} props component props
 * @returns {JSX}
 */
const MostViewed = ({ content, modifierClass }) => {
  return (
    <div className={`${Styles.wrapper} ${modifierClass}`}>
      {hasKey(content, 'title')
        && hasKey(content, 'contents')
        && Array.isArray(content.contents) && (
          <NumericList title={content.title} contents={content.contents} />
      )}
    </div>
  );
};

/**
 * propTypes
 * @property {Object} content Array of content items to be used by this widget
 */
MostViewed.propTypes = {
  content: PropTypes.object,
  modifierClass: PropTypes.string,
};

export default MostViewed;
