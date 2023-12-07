import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, { Path } from 'svgs';

/**
 * prendeHamburger component
 * @param {size} size - icon size
 * @param {string} fill - icon fill modifier
 * @param {style} style - style override
 * @returns {JSX}
 */
const prendeHamburger = ({
  className, height, fill, style, viewBox, width,
}) => (
  <Svg
    className={className}
    height={height}
    style={style}
    viewBox={viewBox}
    width={width}
  >
    <Path
      d="M42.667 192h170.666C219.2 192 224 187.2 224 181.333c0-5.866-4.8-10.666-10.667-10.666H42.667c-5.867 0-10.667 4.8-10.667 10.666C32 187.2 36.8 192 42.667 192zm0-53.333h170.666c5.867 0 10.667-4.8 10.667-10.667s-4.8-10.667-10.667-10.667H42.667C36.8 117.333 32 122.133 32 128s4.8 10.667 10.667 10.667zM32 74.667c0 5.866 4.8 10.666 10.667 10.666h170.666c5.867 0 10.667-4.8 10.667-10.666C224 68.8 219.2 64 213.333 64H42.667C36.8 64 32 68.8 32 74.667z"
      fill={`${fill || '#000000'}`}
      fillRule="nonzero"
    />
  </Svg>
);

prendeHamburger.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default prendeHamburger;
