import React from 'react';
import Svg, { G, Path } from 'svgs';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import { BLACK } from '@univision/fe-utilities/styled/constants';

/**
 * uforiaLibraryActive component
 * @param {number} width - icon width size
 * @param {number} height - icon height size
 * @param {string} fill - fill color, default: svg file color
 * @param {(Object|style)} [style] - modifier styles
 * @param {string} className - modifier class
 * @param {string} viewBox - viewBox value
 * @returns {JSX}
 */
const uforiaLibraryActive = ({
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
    <G fill="none" fillRule="evenodd">
      <Path d="M0 0h256v256H0z" />
      <Path
        d="M42.667 64v128c0 11.247 8.702 20.46 19.74 21.275l1.593.058h128c0 11.782-9.551 21.334-21.333 21.334h-128c-11.782 0-21.334-9.552-21.334-21.334v-128C21.333 73.551 30.885 64 42.667 64zm170.666-42.667c11.782 0 21.334 9.552 21.334 21.334v128c0 11.782-9.552 21.333-21.334 21.333h-128C73.551 192 64 182.449 64 170.667v-128c0-11.782 9.551-21.334 21.333-21.334h128zm-32 32h-32l-1.244.072a10.671 10.671 0 00-9.35 9.351L138.666 64l.004 43.201a26.789 26.789 0 00-5.338-.534c-14.727 0-26.666 11.939-26.666 26.666 0 14.728 11.939 26.667 26.666 26.667 14.139 0 25.707-11.003 26.61-24.913l.057-1.754V74.667h21.333l1.244-.072C187.882 73.979 192 69.47 192 64c0-5.891-4.776-10.667-10.667-10.667z"
        fill={`${fill || BLACK}`}
        fillRule="nonzero"
      />
    </G>
  </Svg>
);

uforiaLibraryActive.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default uforiaLibraryActive;
