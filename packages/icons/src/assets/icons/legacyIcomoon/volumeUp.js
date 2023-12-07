import React from 'react';
import Svg, { G, Path } from 'svgs';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import { BLACK } from '@univision/fe-utilities/styled/constants';

/**
 * volumeUp component
 * @param {number} width - icon width size
 * @param {number} height - icon height size
 * @param {string} fill - fill color, default: svg file color
 * @param {(Object|style)} [style] - modifier styles
 * @param {string} className - modifier class
 * @param {string} viewBox - viewBox value
 * @returns {JSX}
 */
const volumeUp = ({
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
        d="M32 106.667v42.666C32 155.2 36.8 160 42.667 160h32l35.093 35.093c6.72 6.72 18.24 1.92 18.24-7.573V68.373c0-9.493-11.52-14.293-18.24-7.573L74.667 96h-32C36.8 96 32 100.8 32 106.667zM176 128c0-18.88-10.88-35.093-26.667-42.987v85.867C165.12 163.093 176 146.88 176 128zm-26.667-80.533V49.6c0 4.053 2.667 7.573 6.4 9.067 27.52 10.986 46.934 37.973 46.934 69.333s-19.414 58.347-46.934 69.333c-3.84 1.494-6.4 5.014-6.4 9.067v2.133c0 6.72 6.72 11.414 12.907 9.067C198.4 203.84 224 168.96 224 128c0-40.96-25.6-75.84-61.76-89.6-6.187-2.453-12.907 2.347-12.907 9.067z"
        fill={`${fill || BLACK}`}
        fillRule="nonzero"
      />
    </G>
  </Svg>
);

volumeUp.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default volumeUp;
