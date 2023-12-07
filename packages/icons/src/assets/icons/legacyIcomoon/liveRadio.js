import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, { Path } from 'svgs';

import { BLACK } from '../../../constants/colors';

/**
 * liveRadio component
 * @param {!Object} props - components props
 * @param {style} props.fill - custom fill color
 * @param {number} props.width - icon width size
 * @param {number} props.height - icon height size
 * @param {style} props.className - class name modifier
 * @param {style} props.style - style override
 * @returns {JSX}
 */
const liveRadio = ({
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
      d="M477.739 1.595c281.245 282.238 281.017 738.854-0.51 1020.81l-97.487-97.998c227.396-227.919 227.396-596.895 0-824.814l97.998-97.998zM304.201 175.133c185.451 186.375 185.222 487.64-0.51 673.735l-97.487-98.508c131.882-131.941 131.882-345.798 0-477.739l97.998-97.487zM174.716 584.268c-39.865 39.865-104.499 39.865-144.364 0s-39.865-104.499 0-144.364c39.865-39.865 104.499-39.865 144.364 0s39.865 104.499 0 144.364z"
    />
  </Svg>
);

liveRadio.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default liveRadio;
