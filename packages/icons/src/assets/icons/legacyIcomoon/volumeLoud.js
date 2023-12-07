import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, { Path } from 'svgs';

import { BLACK } from '../../../constants/colors';

/**
 * volumeLoud component
 * @param {!Object} props - components props
 * @param {style} props.fill - custom fill color
 * @param {number} props.width - icon width size
 * @param {number} props.height - icon height size
 * @param {style} props.className - class name modifier
 * @param {style} props.style - style override
 * @returns {JSX}
 */
const volumeLoud = ({
  fill,
  height,
  width,
  className,
  style,
}) => (
  <Svg
    height={height}
    width={width}
    viewBox="0 0 1024 1024"
    className={className}
    style={style}
  >
    <Path
      fill={`${fill || BLACK}`}
      d="M182.4 643.2h-182.4v-291.2h182.4l182.4-144v582.4l-182.4-147.2zM675.2 508.8v0c0 54.4-25.6 105.6-64 150.4h-86.4c51.2-41.6 83.2-92.8 83.2-150.4s-32-112-83.2-150.4h86.4c38.4 41.6 64 92.8 64 150.4v0c0 0 0 0 0 0s0 0 0 0zM848 508.8c0 92.8-41.6 176-115.2 243.2h-89.6c83.2-64 134.4-150.4 134.4-243.2s-51.2-179.2-134.4-243.2h89.6c73.6 67.2 115.2 150.4 115.2 243.2 0 0 0 0 0 0s0 0 0 0zM1024 508.8c0 0 0 0 0 0 0 131.2-67.2 252.8-176 348.8h-92.8c124.8-89.6 198.4-214.4 198.4-348.8s-76.8-259.2-198.4-348.8h92.8c108.8 96 176 217.6 176 348.8 0 0 0 0 0 0z"
    />
  </Svg>
);

volumeLoud.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default volumeLoud;
