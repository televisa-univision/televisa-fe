import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, { Path } from 'svgs';

import { BLACK } from '../../../constants/colors';

/**
 * notifyMe component
 * @param {!Object} props - components props
 * @param {style} props.fill - custom fill color
 * @param {number} props.width - icon width size
 * @param {number} props.height - icon height size
 * @param {style} props.className - class name modifier
 * @param {style} props.style - style override
 * @returns {JSX}
 */
const notifyMe = ({
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
      d="M725.333 170.667v-42.667h85.333v42.667h42.667c47.128 0 85.333 38.205 85.333 85.333v384h-85.333v-256h-682.667v426.667h469.333v85.333h-469.333c-47.128 0-85.333-38.205-85.333-85.333v-554.667c0-47.128 38.205-85.333 85.333-85.333h42.667v-42.667h85.333v42.667h426.667z M896 815.36h128v85.333h-128v123.307h-85.333v-123.307h-128v-85.333h128v-132.693h85.333v132.693z M256 469.333h85.333v85.333h-85.333v-85.333z M426.667 469.333h85.333v85.333h-85.333v-85.333z M256 640h85.333v85.333h-85.333v-85.333z M426.667 640h85.333v85.333h-85.333v-85.333z M597.333 469.333h85.333v85.333h-85.333v-85.333z"
    />
  </Svg>
);

notifyMe.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default notifyMe;
