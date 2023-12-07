import React from 'react';
import Svg, { G, Path } from 'svgs';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import { BLACK } from '../../../constants/colors';

/**
 * queueMusic props
 * @property {number} width - icon width size
 * @property {number} height - icon height size
 * @property {string} fill - fill color, default: svg file color
 * @property {(Object|style)} [style] - modifier styles
 * @property {string} className - modifier class
 * @returns {JSX}
 */
const queueMusic = ({
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
        d="M14 6H4a1 1 0 100 2h10a1 1 0 000-2zm0 4H4a1 1 0 000 2h10a1 1 0 000-2zM4 16h6a1 1 0 000-2H4a1 1 0 000 2zM17 6v8.18c-.31-.11-.65-.18-1-.18-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3V8h2a1 1 0 000-2z"
        fill={`${fill || BLACK}`}
        fillRule="nonzero"
      />
    </G>
  </Svg>
);

queueMusic.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  width: PropTypes.number,
};

export default queueMusic;
