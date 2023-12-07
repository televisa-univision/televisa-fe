import React from 'react';
import Svg, { G, Path } from 'svgs';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import { BLACK } from '../../../constants/colors';

/**
 * compassCalibration props
 * @property {number} width - icon width size
 * @property {number} height - icon height size
 * @property {string} fill - fill color, default: svg file color
 * @property {(Object|style)} [style] - modifier styles
 * @property {string} className - modifier class
 * @returns {JSX}
 */
const compassCalibration = ({
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
        d="M12 13a4 4 0 110 8 4 4 0 010-8zm0-10c3.51 0 6.72 1.28 9.18 3.4.45.38.49 1.06.07 1.48l-3.6 3.6a.98.98 0 01-1.31.08c-1.2-.93-2.7-1.49-4.34-1.49-1.63 0-3.14.56-4.34 1.5-.4.31-.96.28-1.32-.08l-3.6-3.6c-.42-.42-.38-1.1.06-1.48C5.28 4.29 8.49 3 12 3z"
        fill={`${fill || BLACK}`}
        fillRule="nonzero"
      />
    </G>
  </Svg>
);

compassCalibration.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  width: PropTypes.number,
};

export default compassCalibration;
