import React from 'react';
import Svg, { G, Path } from 'svgs';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import { BLACK } from '@univision/fe-utilities/styled/constants';

/**
 * navUforiaHomeInactive component
 * @param {number} width - icon width size
 * @param {number} height - icon height size
 * @param {string} fill - fill color, default: svg file color
 * @param {(Object|style)} [style] - modifier styles
 * @param {string} className - modifier class
 * @param {string} viewBox - viewBox value
 * @returns {JSX}
 */
const navUforiaHomeInactive = ({
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
        d="M141.988 26.181l85.333 74.107a21.333 21.333 0 017.346 16.107v96.938c0 11.782-9.552 21.334-21.334 21.334h-42.666c-11.782 0-21.334-9.552-21.334-21.334v-42.666c0-11.782-9.55-21.334-21.333-21.334-11.782 0-21.333 9.552-21.333 21.334v42.666c0 11.782-9.552 21.334-21.334 21.334H42.667c-11.782 0-21.334-9.552-21.334-21.334v-96.938c0-6.18 2.68-12.055 7.346-16.107l85.333-74.107c8.024-6.968 19.952-6.968 27.976 0zm71.345 90.214L128 42.288l-85.333 74.107v96.938h42.666v-42.666C85.333 147.103 104.436 128 128 128c22.85 0 41.505 17.962 42.614 40.537l.053 2.13v42.666h42.666v-96.938z"
        fill={`${fill || BLACK}`}
        fillRule="nonzero"
      />
    </G>
  </Svg>
);

navUforiaHomeInactive.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default navUforiaHomeInactive;
