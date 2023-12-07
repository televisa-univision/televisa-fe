import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import Svg, { Path } from 'svgs';

/**
 * article component
 * @param {size} size - icon size
 * @param {string} fill - icon fill modifier
 * @param {string} viewBox - viewBox
 * @param {style} style - style override
 * @returns {JSX}
 */
const radio = ({
  width, height, fill, viewBox, style, className,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} style={style} className={className}>
    <Path fill={`${fill || '#000000'}`} d="M45.6 162.146H0V89.138h45.6l45.6-36.104v146.018l-45.6-36.906zm123.2-33.696c0 13.639-6.4 26.476-16 37.708h-21.6C144 155.728 152 142.89 152 128.45c0-14.441-8-28.08-20.8-37.708h21.6c9.6 10.43 16 23.267 16 37.708zm43.2 0c0 23.266-10.4 44.126-28.8 60.974h-22.4c20.8-16.046 33.6-37.708 33.6-60.974 0-23.267-12.8-44.929-33.6-60.974h22.4c18.4 16.848 28.8 37.707 28.8 60.974zm44 0c0 32.894-16.8 63.38-44 87.45h-23.2c31.2-22.464 49.6-53.754 49.6-87.45 0-33.696-19.2-64.986-49.6-87.45H212c27.2 24.069 44 54.556 44 87.45z" fillRule="nonzero" />
  </Svg>
);

/**
 * article props
 * @property {number} width - icon width size
 * @property {number} height - icon height size
 * @property {string} fill - fill color, default: svg file color
 * @property {string} viewBox - viewBox width, height, default: 0 0 256 256
 * @property {(Object|style)} [style] - modifier styles
 * @property {string} className - modifier class
 */
radio.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  viewBox: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  className: PropTypes.string,
};

export default radio;
