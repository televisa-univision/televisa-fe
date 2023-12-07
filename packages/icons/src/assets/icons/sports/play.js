import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, { G, Path, Ellipse } from 'svgs';

import { BLACK } from '../../../constants/colors';

/**
 * play component
 * @param {!Object} props - components props
 * @param {style} props.fill - custom fill color
 * @param {number} props.width - icon width size
 * @param {number} props.height - icon height size
 * @param {string} props.viewBox - viewBox layout
 * @param {style} props.className - class name modifier
 * @param {style} props.style - style override
 * @returns {JSX}
 */
const play = ({
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
    <G fill="none" fillRule="evenodd" stroke={fill} transform="translate(4 4)">
      <Ellipse
        cx="124.763"
        cy="124.703"
        strokeWidth="14"
        opacity=".95"
        rx="117.144"
        ry="116.996"
      />
      <Path fill={`${fill || BLACK}`} strokeWidth="1.087" d="M169.62 123.855l-65.364 37.06V86.797z" />
    </G>
  </Svg>
);

play.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  viewBox: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default play;
