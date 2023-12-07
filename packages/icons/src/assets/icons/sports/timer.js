import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, { G, Path, Circle } from 'svgs';

import { BLACK, WHITE } from '../../../constants/colors';

/**
 * timer component
 * @param {!Object} props - components props
 * @param {string} props.fill - custom fill color
 * @param {string} props.stroke - custom stroke color
 * @param {number} props.width - icon width size
 * @param {number} props.height - icon height size
 * @param {string} props.viewBox - viewBox layout
 * @param {string} props.className - class name modifier
 * @param {Object} props.style - style override
 * @returns {JSX}
 */
const timer = ({
  fill,
  stroke,
  height,
  width,
  viewBox,
  className,
  style,
}) => (
  <Svg
    height={height}
    width={width}
    viewBox={viewBox}
    className={className}
    style={style}
  >
    <G fill="none" fillRule="evenodd">
      <Circle stroke={BLACK} strokeWidth="9.0066" fill={`${stroke || WHITE}`} cx="129" cy="141" r="85" />
      <Circle fill={`${fill || BLACK}`} cx="129" cy="141" r="14" />
      <Path fill={`${fill || BLACK}`} d="M133 165V78h-8v87z" />
      <Path d="M197.6183 60.9587l13.6595 13.6595-6.8298 6.8298-3.3747-3.3753-6.6242 6.625-6.8298-6.8298 6.624-6.6252-3.4548-3.4543 6.8298-6.8297z" stroke={BLACK} strokeWidth="6" fill={`${stroke || WHITE}`} fillRule="nonzero" />
      <Path d="M157.9525 27v19.3175l-19.3175-.0005v9.5627h-19.3175l-.0005-9.5627-19.317.0005V27h57.9525z" stroke={BLACK} strokeWidth="7" fill={`${stroke || WHITE}`} fillRule="nonzero" />
    </G>
  </Svg>
);

timer.propTypes = {
  fill: PropTypes.string,
  stroke: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  viewBox: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default timer;
