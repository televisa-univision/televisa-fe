import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, { G, Path } from 'svgs';

import { MILANO_RED } from '../../../constants/colors';

/**
 * outIcon component
 * @param {!Object} props - components props
 * @param {style} props.fill - custom fill color
 * @param {number} props.width - icon width size
 * @param {number} props.height - icon height size
 * @param {string} props.viewBox - viewBox layout
 * @param {style} props.className - class name modifier
 * @param {style} props.style - style override
 * @returns {JSX}
 */
const outIcon = ({
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
    <G fill="none" fillRule="evenodd">
      <Path d="M0 256h256V0H0z" />
      <Path fill={`${fill || MILANO_RED}`} d="M164.955 90.261l-7.542 7.542 37.707 37.717 7.552-7.541z" />
      <Path fill={`${fill || MILANO_RED}`} d="M202.667 128.027l-7.542-7.542-37.717 37.707 7.541 7.552z" />
      <Path fill={`${fill || MILANO_RED}`} d="M53.333 133.333H192v-10.666H53.333z" />
    </G>
  </Svg>
);

outIcon.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  viewBox: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default outIcon;
