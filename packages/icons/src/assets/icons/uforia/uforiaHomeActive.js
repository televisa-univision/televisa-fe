import React from 'react';
import Svg, { Path } from 'svgs';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import { BLACK } from '@univision/fe-utilities/styled/constants';

/**
 * navUforiaHomeActive component
 * @param {number} width - icon width size
 * @param {number} height - icon height size
 * @param {string} fill - fill color, default: svg file color
 * @param {(Object|style)} [style] - modifier styles
 * @param {string} className - modifier class
 * @param {string} viewBox - viewBox value
 * @returns {JSX}
 */
const navUforiaHomeActive = ({
  width,
  height,
  fill,
  className,
  style,
  viewBox,
}) => (
  <Svg
    viewBox={viewBox}
    height={height}
    width={width}
    className={className}
    style={style}
  >
    <Path
      d="M7.334 79.44l85.2-74.207a21.253 21.253 0 0127.932 0l85.2 74.207A21.389 21.389 0 01213 95.569v97.069c0 11.798-9.536 21.362-21.3 21.362h-42.6c-11.764 0-21.3-9.564-21.3-21.362v-42.724c0-11.798-9.536-21.362-21.3-21.362-11.764 0-21.3 9.564-21.3 21.362v42.724C85.2 204.436 75.664 214 63.9 214H21.3C9.536 214 0 204.436 0 192.638v-97.07A21.389 21.389 0 017.334 79.44z"
      fill={`${fill || BLACK}`}
      fillRule="nonzero"
    />
  </Svg>
);

navUforiaHomeActive.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default navUforiaHomeActive;
