import React from 'react';
import Svg, { G, Path } from 'svgs';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import { BLACK } from '@univision/fe-utilities/styled/constants';

/**
 * tenis component
 * @param {number} width - icon width size
 * @param {number} height - icon height size
 * @param {string} fill - fill color, default: svg file color
 * @param {(Object|style)} [style] - modifier styles
 * @param {string} className - modifier class
 * @param {string} viewBox - viewBox value
 * @returns {JSX}
 */
const tenis = ({
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
        d="M218.88 37.227c-24.96-24.96-70.613-19.947-101.867 11.306-17.066 17.067-26.88 41.28-27.093 58.24-.213 16.854 2.773 41.494-14.4 58.667l-45.227 45.227 15.147 15.146 45.227-45.226c17.173-17.174 41.813-14.187 58.666-14.4 16.854-.214 41.174-10.027 58.24-27.094C238.72 107.84 243.84 62.187 218.88 37.227zm-98.133 98.026c-16.32-16.32-11.2-49.173 11.306-71.68 22.507-22.506 55.254-27.626 71.68-11.306 16.32 16.32 11.2 49.173-11.306 71.68-22.507 22.506-55.254 27.626-71.68 11.306z"
        fill={`${fill || BLACK}`}
        fillRule="nonzero"
      />
    </G>
  </Svg>
);

tenis.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default tenis;
