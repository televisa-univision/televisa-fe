import React from 'react';
import Svg, { G, Path } from 'svgs';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import { BLACK } from '@univision/fe-utilities/styled/constants';

/**
 * navOpenInFull component
 * @param {number} width - icon width size
 * @param {number} height - icon height size
 * @param {string} fill - fill color, default: svg file color
 * @param {(Object|style)} [style] - modifier styles
 * @param {string} className - modifier class
 * @param {string} viewBox - viewBox value
 * @returns {JSX}
 */
const navOpenInFull = ({
  width, height, fill, className, style, viewBox,
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
        d="M224 91.627v-48.96C224 36.8 219.2 32 213.333 32h-48.96c-9.493 0-14.293 11.52-7.573 18.24l16.96 16.96L67.093 173.867l-16.96-16.96C43.52 150.187 32 154.88 32 164.373v48.96C32 219.2 36.8 224 42.667 224h48.96c9.493 0 14.293-11.52 7.573-18.24L82.24 188.8 188.907 82.133l16.96 16.96c6.613 6.72 18.133 2.027 18.133-7.466z"
        fill={`${fill || BLACK}`}
        fillRule="nonzero"
      />
    </G>
  </Svg>
);

navOpenInFull.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default navOpenInFull;
