import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, { Path } from 'svgs';

import { BLACK } from '../../../constants/colors';

/**
 * search component
 * @param {!Object} props - components props
 * @param {style} props.fill - custom fill color
 * @param {number} props.width - icon width size
 * @param {number} props.height - icon height size
 * @param {style} props.className - class name modifier
 * @param {style} props.style - style override
 * @returns {JSX}
 */
const search = ({
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
      d="M905.102 853.333l-205.369-205.369c44.423-55.23 71.301-126.212 71.301-203.472 0-180.030-145.943-325.973-325.973-325.973s-325.973 145.943-325.973 325.973c0 180.030 145.943 325.973 325.973 325.973 77.26 0 148.241-26.878 204.105-71.794l204.167 205.861zM191.147 445.44c-0-139.814 113.342-253.156 253.156-253.156s253.156 113.342 253.156 253.156c0 139.814-113.342 253.156-253.156 253.156s-253.156-113.342-253.156-253.156z"
    />
  </Svg>
);

search.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default search;
