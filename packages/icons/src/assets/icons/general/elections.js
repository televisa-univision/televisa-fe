import React from 'react';
import Svg, { G, Path } from 'svgs';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import { BLACK } from '@univision/fe-utilities/styled/constants';

/**
 * elections component
 * @param {number} width - icon width size
 * @param {number} height - icon height size
 * @param {string} fill - fill color, default: svg file color
 * @param {(Object|style)} [style] - modifier styles
 * @param {string} className - modifier class
 * @param {string} viewBox - viewBox value
 * @returns {JSX}
 */
const elections = ({
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
        d="M128 21.333c5.891 0 10.667 4.776 10.667 10.667v11.327c41.234 5.142 73.331 39.703 74.626 82.015l.04 2.658H224c5.891 0 10.667 4.776 10.667 10.667 0 5.796-4.623 10.512-10.383 10.663l-.284.003v53.334c5.891 0 10.667 4.775 10.667 10.666V224c0 5.891-4.776 10.667-10.667 10.667H32c-5.891 0-10.667-4.776-10.667-10.667v-10.667c0-5.89 4.776-10.666 10.667-10.666v-53.334c-5.891 0-10.667-4.775-10.667-10.666S26.11 128 32 128h10.667c0-43.516 32.572-79.424 74.666-84.673V32c0-5.891 4.776-10.667 10.667-10.667zM53.332 202.666h21.334v-53.333H53.334v53.333zm64.001-53.333H96v53.333h21.333v-53.333zm42.667 0h-21.333v53.333h21.332l.001-53.333zm42.667 0h-21.334v53.333h21.333v-53.333zM128 64c-34.543 0-62.694 27.366-63.956 61.6L64 128h128c0-35.346-28.654-64-64-64z"
        fill={`${fill || BLACK}`}
        fillRule="nonzero"
      />
    </G>
  </Svg>
);

elections.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default elections;
