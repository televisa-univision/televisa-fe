import React from 'react';
import Svg, { G, Path } from 'svgs';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import { BLACK } from '@univision/fe-utilities/styled/constants';

/**
 * uforiaPodcastInactive component
 * @param {number} width - icon width size
 * @param {number} height - icon height size
 * @param {string} fill - fill color, default: svg file color
 * @param {(Object|style)} [style] - modifier styles
 * @param {string} className - modifier class
 * @param {string} viewBox - viewBox value
 * @returns {JSX}
 */
const uforiaPodcastInactive = ({
  width,
  height,
  fill,
  className,
  style,
  viewBox,
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
        d="M145.328 160c11.782 0 21.333 9.551 21.333 21.333 0 3.582-.901 7.106-2.622 10.247l-17.617 32.172a21.003 21.003 0 01-36.844 0L91.961 191.58c-5.66-10.334-1.87-23.299 8.464-28.958A21.333 21.333 0 01110.672 160h34.656zm0 21.333h-34.656L128 212.971l17.328-31.638zM128 106.667c11.782 0 21.333 9.55 21.333 21.333 0 11.782-9.55 21.333-21.333 21.333-11.782 0-21.333-9.55-21.333-21.333 0-11.782 9.55-21.333 21.333-21.333zM128 64c35.346 0 64 28.654 64 64 0 5.891-4.776 10.667-10.667 10.667-5.89 0-10.666-4.776-10.666-10.667 0-23.564-19.103-42.667-42.667-42.667S85.333 104.436 85.333 128c0 5.891-4.775 10.667-10.666 10.667S64 133.89 64 128c0-35.346 28.654-64 64-64zm0-42.667c58.91 0 106.667 47.757 106.667 106.667 0 5.891-4.776 10.667-10.667 10.667S213.333 133.89 213.333 128c0-47.128-38.205-85.333-85.333-85.333S42.667 80.872 42.667 128c0 5.891-4.776 10.667-10.667 10.667S21.333 133.89 21.333 128C21.333 69.09 69.09 21.333 128 21.333z"
        fill={`${fill || BLACK}`}
        fillRule="nonzero"
      />
    </G>
  </Svg>
);

uforiaPodcastInactive.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default uforiaPodcastInactive;
