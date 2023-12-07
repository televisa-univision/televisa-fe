import React from 'react';
import Svg, { G, Path } from 'svgs';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import { BLACK } from '../../../constants/colors';

/**
 * queuePlayNext props
 * @property {number} width - icon width size
 * @property {number} height - icon height size
 * @property {string} fill - fill color, default: svg file color
 * @property {(Object|style)} [style] - modifier styles
 * @property {string} className - modifier class
 * @returns {JSX}
 */
const queuePlayNext = ({
  width, height, fill, className, style,
}) => (
  <Svg
    viewBox="0 0 24 24"
    height={height}
    width={width}
    className={className}
    style={style}
  >
    <G fill="none" fillRule="evenodd">
      <Path d="M0 0h24v24H0z" />
      <Path
        d="M21 3H3c-1.11 0-2 .89-2 2v12a2 2 0 002 2h5v1a1 1 0 001 1h6a1 1 0 001-1v-1h1a1 1 0 000-2H3V5h18v7a1 1 0 002 0V5a2 2 0 00-2-2zm-8 7V8a1 1 0 00-2 0v2H9a1 1 0 000 2h2v2a1 1 0 002 0v-2h2a1 1 0 000-2zm10.293 8.707l-3.086 3.086a1 1 0 01-1.414 0l-.086-.086a1 1 0 010-1.414L21 18l-2.293-2.293a1 1 0 010-1.414l.086-.086a1 1 0 011.414 0l3.086 3.086a1 1 0 010 1.414z"
        fill={`${fill || BLACK}`}
        fillRule="nonzero"
      />
    </G>
  </Svg>
);

queuePlayNext.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  width: PropTypes.number,
};

export default queuePlayNext;
