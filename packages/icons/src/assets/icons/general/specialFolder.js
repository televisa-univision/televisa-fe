import React from 'react';
import Svg, { G, Path } from 'svgs';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import { BLACK } from '@univision/fe-utilities/styled/constants';

/**
 * specialFolder component
 * @param {number} width - icon width size
 * @param {number} height - icon height size
 * @param {string} fill - fill color, default: svg file color
 * @param {(Object|style)} [style] - modifier styles
 * @param {string} className - modifier class
 * @param {string} viewBox - viewBox value
 * @returns {JSX}
 */
const specialFolder = ({
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
        d="M213.333 64H128l-15.04-15.04a21.399 21.399 0 00-15.147-6.293H42.667c-11.734 0-21.334 9.6-21.334 21.333v128c0 11.733 9.6 21.333 21.334 21.333h170.666c11.734 0 21.334-9.6 21.334-21.333V85.333c0-11.733-9.6-21.333-21.334-21.333zm-32.64 111.04L160 162.987l-20.693 12.053c-4.054 2.347-8.96-1.28-7.894-5.867l5.44-23.466-18.026-15.574c-3.52-3.093-1.707-8.96 2.986-9.386l23.787-2.027 9.387-21.973c1.813-4.267 8-4.267 9.813 0l9.387 21.973 23.786 2.027c4.694.426 6.614 6.293 2.987 9.386l-18.027 15.574 5.44 23.466c1.174 4.587-3.733 8.214-7.68 5.867z"
        fill={`${fill || BLACK}`}
        fillRule="nonzero"
      />
    </G>
  </Svg>
);

specialFolder.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default specialFolder;
