import React from 'react';
import Svg, { G, Path } from 'svgs';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import { BLACK } from '@univision/fe-utilities/styled/constants';

/**
 * libraryMusic component
 * @param {number} width - icon width size
 * @param {number} height - icon height size
 * @param {string} fill - fill color, default: svg file color
 * @param {(Object|style)} [style] - modifier styles
 * @param {string} className - modifier class
 * @param {string} viewBox - viewBox value
 * @returns {JSX}
 */
const libraryMusic = ({
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
        d="M213.333 21.333h-128C73.6 21.333 64 30.933 64 42.667v128C64 182.4 73.6 192 85.333 192h128c11.734 0 21.334-9.6 21.334-21.333v-128c0-11.734-9.6-21.334-21.334-21.334zm-32 53.334H160v57.28c0 13.546-9.6 26.026-23.04 27.733-18.027 2.453-33.173-13.333-29.867-31.467 2.134-11.733 12.587-20.8 24.534-21.546 6.72-.427 12.8 1.706 17.706 5.44V64c0-5.867 4.8-10.667 10.667-10.667h21.333C187.2 53.333 192 58.133 192 64s-4.8 10.667-10.667 10.667zM32 64c-5.867 0-10.667 4.8-10.667 10.667v138.666c0 11.734 9.6 21.334 21.334 21.334h138.666c5.867 0 10.667-4.8 10.667-10.667s-4.8-10.667-10.667-10.667h-128c-5.866 0-10.666-4.8-10.666-10.666v-128C42.667 68.8 37.867 64 32 64z"
        fill={`${fill || BLACK}`}
        fillRule="nonzero"
      />
    </G>
  </Svg>
);

libraryMusic.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default libraryMusic;
