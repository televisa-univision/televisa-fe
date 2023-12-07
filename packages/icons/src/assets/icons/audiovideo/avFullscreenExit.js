import React from 'react';
import Svg, { G, Path } from 'svgs';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import { BLACK } from '../../../constants/colors';

/**
 * avFullscreenExit props
 * @property {number} width - icon width size
 * @property {number} height - icon height size
 * @property {string} fill - fill color, default: svg file color
 * @property {(Object|style)} [style] - modifier styles
 * @property {string} className - modifier class
 * @returns {JSX}
 */
const avFullscreenExit = ({
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
        d="M4.286 17.143h2.571v2.571A1.29 1.29 0 008.143 21a1.29 1.29 0 001.286-1.286v-3.857a1.29 1.29 0 00-1.286-1.286H4.286A1.29 1.29 0 003 15.857a1.29 1.29 0 001.286 1.286zM6.857 6.857H4.286A1.29 1.29 0 003 8.143a1.29 1.29 0 001.286 1.286h3.857a1.29 1.29 0 001.286-1.286V4.286A1.29 1.29 0 008.143 3a1.29 1.29 0 00-1.286 1.286zm9 14.143a1.29 1.29 0 001.286-1.286v-2.571h2.571A1.29 1.29 0 0021 15.857a1.29 1.29 0 00-1.286-1.286h-3.857a1.29 1.29 0 00-1.286 1.286v3.857A1.29 1.29 0 0015.857 21zm1.286-14.143V4.286A1.29 1.29 0 0015.857 3a1.29 1.29 0 00-1.286 1.286v3.857a1.29 1.29 0 001.286 1.286h3.857A1.29 1.29 0 0021 8.143a1.29 1.29 0 00-1.286-1.286z"
        fill={`${fill || BLACK}`}
        fillRule="nonzero"
      />
    </G>
  </Svg>
);

avFullscreenExit.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  width: PropTypes.number,
};

export default avFullscreenExit;
