import React from 'react';
import Svg, { G, Path } from 'svgs';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import { BLACK } from '@univision/fe-utilities/styled/constants';

/**
 * insertChart component
 * @param {number} width - icon width size
 * @param {number} height - icon height size
 * @param {string} fill - fill color, default: svg file color
 * @param {(Object|style)} [style] - modifier styles
 * @param {string} className - modifier class
 * @param {string} viewBox - viewBox value
 * @returns {JSX}
 */
const insertChart = ({
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
        d="M202.667 32H53.333C41.6 32 32 41.6 32 53.333v149.334C32 214.4 41.6 224 53.333 224h149.334C214.4 224 224 214.4 224 202.667V53.333C224 41.6 214.4 32 202.667 32zM85.333 181.333c-5.866 0-10.666-4.8-10.666-10.666v-53.334c0-5.866 4.8-10.666 10.666-10.666 5.867 0 10.667 4.8 10.667 10.666v53.334c0 5.866-4.8 10.666-10.667 10.666zm42.667 0c-5.867 0-10.667-4.8-10.667-10.666V85.333c0-5.866 4.8-10.666 10.667-10.666s10.667 4.8 10.667 10.666v85.334c0 5.866-4.8 10.666-10.667 10.666zm42.667 0c-5.867 0-10.667-4.8-10.667-10.666v-21.334c0-5.866 4.8-10.666 10.667-10.666 5.866 0 10.666 4.8 10.666 10.666v21.334c0 5.866-4.8 10.666-10.666 10.666z"
        fill={`${fill || BLACK}`}
        fillRule="nonzero"
      />
    </G>
  </Svg>
);

insertChart.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default insertChart;
