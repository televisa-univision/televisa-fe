import React from 'react';
import PropTypes from 'prop-types';
import icons from '@univision/fe-commons/dist/assets/icons/amp/processed';
import Svg from './AmpIcon.styles';

/**
 * Basic building block for icon based components
 * used e.g. on {@link PromoItem}
 * @param {Object} props React Props for this component
 * @returns {JSX}
 * @constructor
 */
const Icon = ({
  name,
  viewbox,
  fill,
}) => {
  return (
    <Svg viewBox={viewbox}>
      <path d={icons[`icon-${name}`]} fill={fill} />
    </Svg>
  );
};

/**
 * propTypes
 * @property {string} name Text of the particular icon
 * @property {string} className Text to apply additional styles to the icon (color, shadow...)
 */
Icon.propTypes = {
  name: PropTypes.string,
  viewbox: PropTypes.string,
  fill: PropTypes.string,
};

/**
 * Default Prop Values
 */
Icon.defaultProps = {
  name: '',
  viewbox: '0 0 1024 1024',
  fill: 'white',
};

export default Icon;
