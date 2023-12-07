import React from 'react';
import Svg, { G, Path } from 'svgs';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import { BLACK } from '@univision/fe-utilities/styled/constants';

/**
 * chronometer component
 * @param {number} width - icon width size
 * @param {number} height - icon height size
 * @param {string} fill - fill color, default: svg file color
 * @param {(Object|style)} [style] - modifier styles
 * @param {string} className - modifier class
 * @param {string} viewBox - viewBox value
 * @returns {JSX}
 */
const chronometer = ({
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
        d="M128 85.333h-5.333a5.333 5.333 0 00-5.334 5.334v58.666l46.126 27.676a5.333 5.333 0 007.298-1.797l2.431-3.987a5.333 5.333 0 00-1.835-7.365l-38.02-22.527V90.667A5.333 5.333 0 00128 85.333zm-22.4-75.018l44.794.025a9.606 9.606 0 019.6 9.601 9.59 9.59 0 01-9.584 9.596H105.6a9.614 9.614 0 01-9.614-9.614 9.608 9.608 0 019.609-9.608h.005zM33.107 47.058L52.092 32.25a9.609 9.609 0 0113.478 1.657 9.59 9.59 0 01-1.65 13.466L44.94 62.203a9.614 9.614 0 01-13.495-1.657 9.606 9.606 0 011.662-13.488zM128 42.667c-53.013 0-96 42.986-96 96 0 53.013 42.987 96 96 96s96-42.987 96-96c0-53.014-42.987-96-96-96zm0 170.666c-41.173 0-74.667-33.493-74.667-74.666C53.333 97.493 86.827 64 128 64s74.667 33.493 74.667 74.667c0 41.173-33.494 74.666-74.667 74.666z"
        fill={`${fill || BLACK}`}
        fillRule="nonzero"
      />
    </G>
  </Svg>
);

chronometer.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default chronometer;
