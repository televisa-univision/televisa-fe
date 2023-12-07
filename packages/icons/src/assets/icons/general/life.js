import React from 'react';
import Svg, { G, Path } from 'svgs';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import { BLACK } from '@univision/fe-utilities/styled/constants';

/**
 * life component
 * @param {number} width - icon width size
 * @param {number} height - icon height size
 * @param {string} fill - fill color, default: svg file color
 * @param {(Object|style)} [style] - modifier styles
 * @param {string} className - modifier class
 * @param {string} viewBox - viewBox value
 * @returns {JSX}
 */
const life = ({
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
        d="M224 85.333c11.733 0 21.333 9.6 21.333 21.334 0 15.466-15.36 24.106-26.773 20.586l-37.973 37.867C184.213 176.64 175.467 192 160 192c-15.573 0-24.213-15.467-20.587-26.88l-27.2-27.2c-3.2.96-7.893.96-11.093 0l-48.533 48.64c3.52 11.413-5.12 26.773-20.587 26.773-11.733 0-21.333-9.6-21.333-21.333 0-15.467 15.36-24.107 26.773-20.587l48.64-48.533C82.453 111.36 91.2 96 106.667 96c15.573 0 24.213 15.467 20.586 26.88l27.2 27.2c3.2-.96 7.894-.96 11.094 0l37.866-37.973c-3.52-11.414 5.12-26.774 20.587-26.774zM37.333 64l5.334 21.333L64 90.667 42.667 96l-5.334 21.333L32 96l-21.333-5.333L32 85.333 37.333 64zM160 32l10.027 22.08L192 64l-21.973 9.92L160 96l-9.813-22.08L128 64l22.187-9.92L160 32z"
        fill={`${fill || BLACK}`}
        fillRule="nonzero"
      />
    </G>
  </Svg>
);

life.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default life;
