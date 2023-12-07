import React from 'react';
import Svg, { G, Path } from 'svgs';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import {
  BLACK,
  CARDINAL,
  GOSSAMER,
} from '@univision/fe-utilities/styled/constants';

/**
 * standingsColor component
 * @param {number} width - icon width size
 * @param {number} height - icon height size
 * @param {string} fill - fill color, default: svg file color
 * @param {(Object|style)} [style] - modifier styles
 * @param {string} className - modifier class
 * @param {string} viewBox - viewBox value
 * @returns {JSX}
 */
const standingsColor = ({
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
        d="M91.733 170.667a2.133 2.133 0 011.707 3.413l-11.733 15.644a2.133 2.133 0 01-3.414 0L66.56 174.08a2.133 2.133 0 011.707-3.413h23.466zm0-53.334a2.133 2.133 0 011.707 3.414L81.707 136.39a2.133 2.133 0 01-3.414 0L66.56 120.747a2.133 2.133 0 011.707-3.414h23.466z"
        fill={`${fill || CARDINAL}`}
        fillRule="nonzero"
      />
      <Path
        d="M93.44 71.253L81.707 55.61a2.133 2.133 0 00-3.414 0L66.56 71.253a2.133 2.133 0 001.707 3.414h23.466a2.133 2.133 0 001.707-3.414z"
        fill={`${fill || GOSSAMER}`}
        fillRule="nonzero"
      />
      <Path
        d="M183.095 168a8 8 0 110 16h-55.117a8 8 0 110-16h55.117zm0-53.333a8 8 0 110 16h-55.117a8 8 0 110-16h55.117zM184 61.333a8 8 0 010 16h-55.117a8 8 0 010-16H184z"
        fill={`${fill || BLACK}`}
        fillRule="nonzero"
      />
      <Path
        d="M46.315 234.667h167.424c11.51 0 20.928-11.046 20.928-24.546V38.305c0-13.5-9.418-24.545-20.928-24.545H46.315c-11.51 0-20.928 11.045-20.928 24.545v171.816c0 13.5 9.417 24.546 20.928 24.546zm-2.272-202.66h171.849v184.64H44.042V32.006z"
        fill={`${fill || BLACK}`}
        fillRule="nonzero"
      />
    </G>
  </Svg>
);

standingsColor.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default standingsColor;
