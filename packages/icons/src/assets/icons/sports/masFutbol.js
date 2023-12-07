import React from 'react';
import Svg, { G, Path } from 'svgs';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import { BLACK } from '@univision/fe-utilities/styled/constants';

/**
 * masFutbol component
 * @param {number} width - icon width size
 * @param {number} height - icon height size
 * @param {string} fill - fill color, default: svg file color
 * @param {(Object|style)} [style] - modifier styles
 * @param {string} className - modifier class
 * @param {string} viewBox - viewBox value
 * @returns {JSX}
 */
const masFutbol = ({
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
        d="M121.38 53.62l.141.009c.097-.006.188-.017.285-.017 4.503 0 8.93.334 13.254.978a26.09 26.09 0 00-1.546 6.31l-.154 2.17.054 1.858c.3 4.998 1.834 9.57 4.284 13.43l-10.037 1.156h-.005v30.513l20.62 14.356 27.516-7.22a26.555 26.555 0 0013.108 5.323l2.17.154 1.858-.054c5.462-.327 10.415-2.13 14.484-4.989a89.066 89.066 0 013.63 25.258c0 49.286-39.956 89.242-89.236 89.242-.097 0-.188-.022-.285-.022-.096.01-.187.022-.284.022-49.28 0-89.237-39.962-89.237-89.248s39.957-89.237 89.237-89.237l.142.008zm14.554 112.562h-28.825l-18.5 27.556 16.402 19.393c5.225 1.205 10.637 1.899 16.226 1.91l.142-.005.142-.006c.097 0 .188.011.285.011a71.597 71.597 0 0013.065-1.25l3.16-.66 16.403-19.393-18.5-27.556zm-74.376-38.774l-12.252 20.427c.667 9.612 3.167 18.698 7.22 26.908l1.592 3.037 20.945 9.773 18.938-28.228-7.357-24.276-29.086-7.641zm119.926-.006l-29.08 7.64-7.363 24.277 18.938 28.228 20.945-9.773c4.432-7.985 7.355-16.895 8.477-26.367l.335-3.578-12.252-20.427zm-89.339-50.56a72.33 72.33 0 00-20.63 13.812l-2.51 2.51-2.961 23.675 28.716 7.544 20.621-14.356V79.514l-23.236-2.672zM192 106.667l-1.24-.072c-4.881-.572-8.783-4.474-9.355-9.356L181.333 96V74.667H160c-5.448 0-9.976-4.14-10.595-9.428L149.333 64l.072-1.24c.143-1.22.494-2.379 1.017-3.44l.476-.857c1.878-3.073 5.261-5.13 9.102-5.13h21.333V32c0-5.867 4.8-10.667 10.667-10.667l1.24.072c5.288.62 9.427 5.147 9.427 10.595v21.333H224c5.867 0 10.667 4.8 10.667 10.667l-.072 1.24c-.62 5.288-5.147 9.427-10.595 9.427h-21.333V96c0 2.555-.91 4.908-2.423 6.75l.756-1.043a10.772 10.772 0 01-6.044 4.54 10.571 10.571 0 01-2.956.42z"
        fill={`${fill || BLACK}`}
        fillRule="nonzero"
      />
    </G>
  </Svg>
);

masFutbol.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default masFutbol;
