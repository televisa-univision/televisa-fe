import PropTypes from 'prop-types';
import React from 'react';

import PromoItem from '@univision/fe-components-base/dist/components/PromoItem';

/**
 * Variable for Promo Item
 * @param {Object} props React Props for this component
 * @returns {JSX}
 * @constructor
 */
const TagItem = ({
  content,
  modifierClass,
  view,
  theme,
  columnSize,
}) => {
  return (
    <div className={columnSize}>
      <PromoItem
        {...content}
        showTag={false}
        className={modifierClass}
        theme={theme}
        showIcon={false}
        view={view}
      />
    </div>
  );
};

/**
 * propTypes
 * @property {Array} content Array of content items to be used by this widget
 * @property {Object} settings Object with this widget's settings
 */
TagItem.propTypes = {
  content: PropTypes.object,
  modifierClass: PropTypes.string,
  view: PropTypes.string,
  theme: PropTypes.string,
  columnSize: PropTypes.string,
};

/**
 * Default Prop Values
 * @property {Array} content Default array of content items to be used by this widget
 */
TagItem.defaultProps = {
  view: 'vertical',
  theme: 'gray',
  columnSize: '',
};

export default TagItem;
