import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, { Path } from 'svgs';

import { BLACK } from '../../../constants/colors';

/**
 * mail component
 * @param {!Object} props - components props
 * @param {style} props.fill - custom fill color
 * @param {number} props.width - icon width size
 * @param {number} props.height - icon height size
 * @param {style} props.className - class name modifier
 * @param {style} props.style - style override
 * @returns {JSX}
 */
const mail = ({
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
      d="M5.117 199.997v624.006h1040.003v-624.006h-1040.003zM973.886 761.602l-214.248-214.248-226.202 226.202-224.642-224.642-212.686 212.688-39-36.406 215.282-213.196-215.282-212.162 36.915-36.915 214.756 212.686 224.642 224.642 226.202-225.166 211.128-211.128 36.914 36.915-211.635 211.128 214.248 214.248-36.407 35.355z"
    />
  </Svg>
);

mail.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default mail;
