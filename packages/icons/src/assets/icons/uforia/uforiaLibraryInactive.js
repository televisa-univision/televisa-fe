import React from 'react';
import Svg, { G, Path } from 'svgs';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import { BLACK } from '@univision/fe-utilities/styled/constants';

/**
 * uforiaLibraryInactive component
 * @param {number} width - icon width size
 * @param {number} height - icon height size
 * @param {string} fill - fill color, default: svg file color
 * @param {(Object|style)} [style] - modifier styles
 * @param {string} className - modifier class
 * @param {string} viewBox - viewBox value
 * @returns {JSX}
 */
const uforiaLibraryInactive = ({
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
        d="M53.333 64v21.333H42.667v128h128v-10.666H192v10.666c0 11.782-9.551 21.334-21.333 21.334h-128c-11.782 0-21.334-9.552-21.334-21.334v-128C21.333 73.551 30.885 64 42.667 64h10.666zm160-42.667c11.782 0 21.334 9.552 21.334 21.334v128c0 11.782-9.552 21.333-21.334 21.333h-128C73.551 192 64 182.449 64 170.667v-128c0-11.782 9.551-21.334 21.333-21.334h128zm0 21.334h-128v128h128v-128zm-32 10.666C187.224 53.333 192 58.11 192 64c0 5.47-4.118 9.979-9.423 10.595l-1.244.072h-10.666v48c0 14.727-11.94 26.666-26.667 26.666-14.728 0-26.667-11.939-26.667-26.666C117.333 107.939 129.273 96 144 96c1.828 0 3.613.184 5.338.534L149.333 64c0-5.47 4.118-9.979 9.423-10.595l1.244-.072h21.333z"
        fill={`${fill || BLACK}`}
        fillRule="nonzero"
      />
    </G>
  </Svg>
);

uforiaLibraryInactive.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default uforiaLibraryInactive;
