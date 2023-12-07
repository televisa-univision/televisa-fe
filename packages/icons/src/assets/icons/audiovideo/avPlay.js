import React from 'react';
import Svg, { G, Path } from 'svgs';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import { BLACK } from '../../../constants/colors';

/**
 * avPlay props
 * @property {number} width - icon width size
 * @property {number} height - icon height size
 * @property {string} fill - fill color, default: svg file color
 * @property {(Object|style)} [style] - modifier styles
 * @property {string} className - modifier class
 * @returns {JSX}
 */
const avPlay = ({
  width, height, fill, className, style,
}) => (
  <Svg
    viewBox="0 0 256 256"
    height={height}
    width={width}
    className={className}
    style={style}
  >
    <G fill="none" fillRule="evenodd">
      <Path d="M0 0h256v256H0z" />
      <Path
        d="M85.333 72.747v110.506c0 8.427 9.28 13.547 16.427 8.96l86.827-55.253c6.613-4.16 6.613-13.76 0-18.027L101.76 63.787c-7.147-4.587-16.427.533-16.427 8.96Z"
        fill={`${fill || BLACK}`}
        fillRule="nonzero"
      />
    </G>
  </Svg>
);

avPlay.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  width: PropTypes.number,
};

export default avPlay;
