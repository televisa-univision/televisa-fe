import React from 'react';
import Svg, { Path } from 'svgs';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import { BLACK } from '@univision/fe-utilities/styled/constants';

/**
 * videoLibrary component
 * @param {number} width - icon width size
 * @param {number} height - icon height size
 * @param {string} fill - fill color, default: svg file color
 * @param {(Object|style)} [style] - modifier styles
 * @param {string} className - modifier class
 * @param {string} viewBox - viewBox value
 * @returns {JSX}
 */
const videoLibrary = ({
  width, height, fill, className, style, viewBox,
}) => (
  <Svg
    viewBox={viewBox}
    height={height}
    width={width}
    className={className}
    style={style}
  >
    <Path
      d="M10.65 42.6C4.793 42.6 0 47.392 0 53.25V191.7C0 203.415 9.585 213 21.3 213h138.45c5.857 0 10.65-4.792 10.65-10.65 0-5.857-4.793-10.65-10.65-10.65H31.95c-5.857 0-10.65-4.792-10.65-10.65V53.25c0-5.858-4.793-10.65-10.65-10.65zM191.7 0H63.9C52.185 0 42.6 9.585 42.6 21.3v127.8c0 11.715 9.585 21.3 21.3 21.3h127.8c11.715 0 21.3-9.585 21.3-21.3V21.3C213 9.585 203.415 0 191.7 0zm-85.2 133.125v-95.85l58.256 43.665a5.286 5.286 0 010 8.52L106.5 133.125z"
      fill={`${fill || BLACK}`}
      fillRule="nonzero"
    />
  </Svg>
);

videoLibrary.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default videoLibrary;
