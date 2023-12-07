import React from 'react';
import Svg, { G, Path } from 'svgs';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import { BLACK } from '@univision/fe-utilities/styled/constants';

/**
 * latest component
 * @param {number} width - icon width size
 * @param {number} height - icon height size
 * @param {string} fill - fill color, default: svg file color
 * @param {(Object|style)} [style] - modifier styles
 * @param {string} className - modifier class
 * @param {string} viewBox - viewBox value
 * @returns {JSX}
 */
const latest = ({
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
        d="M141.44 32c-54.293-1.493-98.773 42.133-98.773 96H23.573c-4.8 0-7.146 5.76-3.733 9.067l29.76 29.866c2.133 2.134 5.44 2.134 7.573 0l29.76-29.866c3.307-3.307.96-9.067-3.84-9.067H64c0-41.6 33.92-75.2 75.733-74.667 39.68.534 73.067 33.92 73.6 73.6.534 41.707-33.066 75.734-74.666 75.734-17.174 0-33.067-5.867-45.654-15.787-4.266-3.307-10.24-2.987-14.08.853-4.48 4.48-4.16 12.054.854 15.894C96 216.427 116.373 224 138.667 224c53.866 0 97.493-44.48 96-98.773C233.28 75.2 191.467 33.387 141.44 32zM136 85.333c-4.373 0-8 3.627-8 8v39.254c0 3.733 2.027 7.253 5.227 9.173l33.28 19.733c3.84 2.24 8.746.96 10.986-2.773 2.24-3.84.96-8.747-2.773-10.987L144 129.493V93.227c0-4.267-3.627-7.894-8-7.894z"
        fill={`${fill || BLACK}`}
        fillRule="nonzero"
      />
    </G>
  </Svg>
);

latest.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default latest;
