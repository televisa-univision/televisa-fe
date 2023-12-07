import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, { Path } from 'svgs';

import { BLACK, MILANO_RED } from '../../../constants/colors';

/**
 * shoot component
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
const shoot = ({
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
    <Path fill={`${stroke || fill || BLACK}`} d="M224 42.667H21.333v128H32V53.333h192v117.334h10.667v-128z" />
    <Path fill={`${fill || MILANO_RED}`} d="M123.093 128l-37.76 37.76 7.574 7.467 24.426-24.427v64.533H128v-65.386l25.28 25.28 7.573-7.467-37.76-37.76z" />
  </Svg>
);

shoot.propTypes = {
  fill: PropTypes.string,
  stroke: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  viewBox: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default shoot;
