import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, { Path } from 'svgs';

import { BLACK } from '../../../constants/colors';

/**
 * arrow component
 * @param {!Object} props - components props
 * @param {style} props.fill - custom fill color
 * @param {number} props.width - icon width size
 * @param {number} props.height - icon height size
 * @param {style} props.className - class name modifier
 * @param {style} props.style - style override
 * @returns {JSX}
 */
const soundbars = ({
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
      d="M884.784 804.523h137.573v-804.517h-137.573z M666.957 804.523h137.567v-654.114h-137.567z M446.567 804.523h137.573v-299.289h-137.573z M223.589 804.529h137.573v-442.452h-137.573z M0 804.523h137.567v-299.295h-137.567z M884.784 1023.257h137.573v-148.336h-137.573z M666.957 1023.257h137.567v-148.336h-137.567z M446.567 1023.257h137.573v-148.336h-137.573z M223.589 1023.257h137.573v-148.336h-137.573z M0 1023.257h137.567v-148.336h-137.567z"
    />
  </Svg>
);

soundbars.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default soundbars;
