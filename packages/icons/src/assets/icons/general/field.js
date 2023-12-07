import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import Svg, { Path } from 'svgs';

/**
 * field component
 * @param {size} size - icon size
 * @param {string} fill - icon fill modifier
 * @param {string} viewBox - viewBox
 * @param {style} style - style override
 * @returns {JSX}
 */
const field = ({
  width, height, fill, viewBox, style,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} style={style}>
    <Path fill={`${fill || '#000000'}`} d="M19.2 51.2h211.2V64H19.2z" />
    <Path
      fill={`${fill || '#000000'}`}
      d="M224 51.2h12.8v153H224zM121.6 64h12.8v128h-12.8zM19.2 51.2H32v147.2H19.2z"
    />
    <Path fill={`${fill || '#000000'}`} d="M19.2 96H64v12.8H19.2zM192 96h44.8v12.8H192z" />
    <Path
      fill={`${fill || '#000000'}`}
      d="M192 96h12.8v64H192zM51.2 96H64v64H51.2zm-32 96h217.6v12.8H19.2zM128 100.571c15.149 0 27.429 12.28 27.429 27.428 0 15.149-12.28 27.429-27.428 27.429-15.149 0-27.429-12.28-27.429-27.429 0-15.148 12.28-27.428 27.429-27.428zm0-10.971a38.4 38.4 0 1 0 38.4 38.4c0-21.208-17.192-38.4-38.4-38.4z"
    />
    <Path fill={`${fill || '#000000'}`} d="M19.2 147.2H64V160H19.2zm172.8 0h44.8V160H192z" />
  </Svg>
);

/**
 * field props
 * @property {number} width - icon width size
 * @property {number} height - icon height size
 * @property {string} fill - fill color, default: svg file color
 * @property {string} viewBox - viewBox width, height, default: 0 0 256 256
 * @property {(Object|style)} [style] - modifier styles
 */
field.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  viewBox: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default field;
