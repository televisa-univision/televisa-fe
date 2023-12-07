import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import Svg, { Path } from 'svgs';

/**
 * wrong component
 * @param {size} size - icon size
 * @param {string} fill - icon fill modifier
 * @param {string} viewBox - viewBox
 * @param {style} style - style override
 * @returns {JSX}
 */
const wrong = ({
  width, height, fill, viewBox, style,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} style={style}>
    <Path
      fill={`${fill || '#A3A3A3'}`}
      d="M216.853 91.52C198.15 45.795 147.795 21.731 100.468 35.9 53.14 50.068 24.293 97.842 33.791 146.323c9.498 48.481 54.24 81.839 103.414 77.102C186.38 218.687 223.932 177.403 224 128a95.467 95.467 0 0 0-7.147-36.48zM160 48.96a85.333 85.333 0 0 1 45.973 43.84 86.827 86.827 0 0 0-16.32-8.747l-2.773-.96L160 53.333c.09-1.456.09-2.917 0-4.373zm-34.56 8.747c5.973-.64 12.053-1.387 18.027-1.707a87.787 87.787 0 0 1 10.666 0l27.414 30.72c-.96 2.987-1.814 5.973-2.88 8.853-1.92 5.12-3.947 10.667-5.974 15.254l-39.68 4.266-1.493-1.813-13.547-16-5.76-5.653 10.667-33.28 2.56-.64zm-69.333 32c1.386-3.627 2.666-7.36 4.266-10.667A81.6 81.6 0 0 1 64 71.147l2.987-3.2a85.333 85.333 0 0 1 33.6-20.694 68.373 68.373 0 0 1 17.066 8.854l-10.666 31.146-6.294 2.667a181.867 181.867 0 0 0-24.426 13.973L55.893 91.947a6.187 6.187 0 0 1 .32-1.814l-.106-.426zm3.52 76.8a62.613 62.613 0 0 1-12.054-9.6 86.08 86.08 0 0 1-2.986-48 76.693 76.693 0 0 1 5.76-9.707c.64-.96 2.026-1.92 2.773-2.88l21.547 12.48c-.225 11.053.705 22.1 2.773 32.96l-16.427 25.707-1.386-.96zm25.706 36.16l34.56 5.973h.854a78.4 78.4 0 0 0 10.666 4.587 85.333 85.333 0 0 1-46.08-10.56zm37.014-2.027l-1.814 2.24-40.746-7.147a127.36 127.36 0 0 1-12.8-18.453c-.96-1.707-2.027-3.307-2.774-5.013l16.32-25.067h1.174a264.64 264.64 0 0 0 30.4 5.973h1.493l19.307 32.96a288.3 288.3 0 0 1-10.027 14.507h-.533zm47.253-20.16a179.84 179.84 0 0 1-32 3.2l-19.52-34.347 9.067-17.173 5.973-11.733 40.747-4.374a227.2 227.2 0 0 1 13.866 22.614l2.24 4.373-19.306 37.333-1.067.107zm18.773 8.107a85.333 85.333 0 0 1-10.666 8.853 78.293 78.293 0 0 0-3.094-13.973l20.267-38.187a95.36 95.36 0 0 0 16-9.173 7.147 7.147 0 0 0 2.453-1.707 85.333 85.333 0 0 1-24.533 54.08l-.427.107z"
    />
  </Svg>
);

/**
 * wrong props
 * @property {number} width - icon width size
 * @property {number} height - icon height size
 * @property {string} fill - fill color, default: svg file color
 * @property {string} viewBox - viewBox width, height, default: 0 0 256 256
 * @property {(Object|style)} [style] - modifier styles
 */
wrong.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  viewBox: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default wrong;
