import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, { Path } from 'svgs';

import { BLACK } from '../../../constants/colors';

/**
 * fault component
 * @param {!Object} props - components props
 * @param {style} props.fill - custom fill color
 * @param {number} props.width - icon width size
 * @param {number} props.height - icon height size
 * @param {string} props.viewBox - viewBox layout
 * @param {style} props.className - class name modifier
 * @param {style} props.style - style override
 * @returns {JSX}
 */
const fault = ({
  fill,
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
    <Path
      fill={`${fill || BLACK}`}
      d="M149.333 74.667v10.666h-32V74.667h-22.4A64 64 0 0 0 33.28 151.36c.533 2.987 2.347 8.64 2.347 8.64-8.29.625-14.604 7.692-14.294 16a16 16 0 0 0 29.547 8.427 63.04 63.04 0 0 0 44.267 18.24c30.454-1.764 56.028-23.547 62.613-53.334C163.627 120.107 184 96 213.333 96h21.334V74.667h-85.334zm-112 106.666a5.333 5.333 0 1 1 0-10.666 5.333 5.333 0 0 1 0 10.666z"
    />
  </Svg>
);

fault.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  viewBox: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default fault;
