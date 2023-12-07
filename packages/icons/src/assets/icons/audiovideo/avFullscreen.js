import React from 'react';
import Svg, { G, Path } from 'svgs';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import { BLACK } from '../../../constants/colors';

/**
 * avFullscreen props
 * @property {number} width - icon width size
 * @property {number} height - icon height size
 * @property {string} fill - fill color, default: svg file color
 * @property {(Object|style)} [style] - modifier styles
 * @property {string} className - modifier class
 * @returns {JSX}
 */
const avFullscreen = ({
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
        d="M4.286 14.571A1.29 1.29 0 003 15.857v3.857A1.29 1.29 0 004.286 21h3.857a1.29 1.29 0 001.286-1.286 1.29 1.29 0 00-1.286-1.285H5.57v-2.572a1.29 1.29 0 00-1.285-1.286zm0-5.142A1.29 1.29 0 005.57 8.143V5.57h2.572a1.29 1.29 0 001.286-1.285A1.29 1.29 0 008.143 3H4.286A1.29 1.29 0 003 4.286v3.857a1.29 1.29 0 001.286 1.286zm14.143 9h-2.572a1.29 1.29 0 00-1.286 1.285A1.29 1.29 0 0015.857 21h3.857A1.29 1.29 0 0021 19.714v-3.857a1.29 1.29 0 00-1.286-1.286 1.29 1.29 0 00-1.285 1.286zM14.57 4.286a1.29 1.29 0 001.286 1.285h2.572v2.572a1.29 1.29 0 001.285 1.286A1.29 1.29 0 0021 8.143V4.286A1.29 1.29 0 0019.714 3h-3.857a1.29 1.29 0 00-1.286 1.286z"
        fill={`${fill || BLACK}`}
        fillRule="nonzero"
      />
    </G>
  </Svg>
);

avFullscreen.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  width: PropTypes.number,
};

export default avFullscreen;
