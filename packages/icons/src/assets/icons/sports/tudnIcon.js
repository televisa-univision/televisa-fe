import React from 'react';
import Svg, { G, Path } from 'svgs';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import { BLACK } from '@univision/fe-utilities/styled/constants';

/**
 * tudnIcon component
 * @param {number} width - icon width size
 * @param {number} height - icon height size
 * @param {string} fill - fill color, default: svg file color
 * @param {(Object|style)} [style] - modifier styles
 * @param {string} className - modifier class
 * @param {string} viewBox - viewBox value
 * @returns {JSX}
 */
const tudnIcon = ({
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
        d="M128 21.333c58.91 0 106.667 47.757 106.667 106.667 0 58.91-47.757 106.667-106.667 106.667-58.91 0-106.667-47.757-106.667-106.667C21.333 69.09 69.09 21.333 128 21.333zm0 21.334c-1.836 0-3.66.058-5.467.172l.003 83.074-42.667 23.396-.008-91.778C57.403 72.903 42.667 98.731 42.667 128c0 47.128 38.205 85.333 85.333 85.333s85.333-38.205 85.333-85.333c0-29.385-14.853-55.301-37.46-70.65l-.004 89.896-42.667 23.397-.002-127.82a86.656 86.656 0 00-5.2-.156z"
        fill={`${fill || BLACK}`}
        fillRule="nonzero"
      />
    </G>
  </Svg>
);

tudnIcon.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default tudnIcon;
