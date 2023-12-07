import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import Svg, { G, Path } from 'svgs';

import { GREEN_DARKER, MILANO_RED } from '../../../constants/colors';

/**
 * Player substitution component
 * @param {!Object} props - components props
 * @param {style} props.fill - custom fill color
 * @param {number} props.width - icon width size
 * @param {number} props.height - icon height size
 * @param {string} props.viewBox - viewBox layout
 * @param {style} props.className - class name modifier
 * @param {style} props.style - style override
 * @returns {JSX}
 */
const playerSubstitution = ({
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
      <Path fill={`${fill || GREEN_DARKER}`} d="M31.9505469,104.228571 L57.5177143,129.802971 L49.7609143,137.559771 L10.9659429,98.7648 L10.9933908,98.7373908 L10.9714286,98.7154286 L49.7664,59.9204571 L57.5232,67.6882286 L31.9470526,93.2571429 L164.571429,93.2571429 L164.571429,104.228571 L31.9505469,104.228571 Z" />
      <Path fill={`${fill || MILANO_RED}`} d="M112.413175,159.085714 L137.980343,184.660114 L130.223543,192.416914 L91.4285714,153.621943 L91.4560194,153.594534 L91.4340571,153.572571 L130.229029,114.7776 L137.985829,122.545371 L112.409681,148.114286 L245.034057,148.114286 L245.034057,159.085714 L112.413175,159.085714 Z" transform="translate(168.231314, 153.597257) scale(-1, 1) translate(-168.231314, -153.597257)" />
    </G>
  </Svg>
);

playerSubstitution.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  viewBox: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default playerSubstitution;
