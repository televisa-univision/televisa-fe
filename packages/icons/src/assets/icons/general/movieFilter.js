import React from 'react';
import Svg, { G, Path } from 'svgs';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import { BLACK } from '@univision/fe-utilities/styled/constants';

/**
 * movieFilter component
 * @param {number} width - icon width size
 * @param {number} height - icon height size
 * @param {string} fill - fill color, default: svg file color
 * @param {(Object|style)} [style] - modifier styles
 * @param {string} className - modifier class
 * @param {string} viewBox - viewBox value
 * @returns {JSX}
 */
const movieFilter = ({
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
        d="M229.333 42.667H192l18.56 27.84c1.173 1.813-.107 4.16-2.24 4.16h-21.333c-3.52 0-6.934-1.814-8.854-4.8L160 42.667h-21.333l18.56 27.84c1.173 1.813-.107 4.16-2.24 4.16h-21.334c-3.52 0-6.933-1.814-8.853-4.8l-18.133-27.2H85.333l18.56 27.84c1.174 1.813-.106 4.16-2.24 4.16H80.32c-3.52 0-6.827-1.814-8.853-4.8l-18.134-27.2H42.667c-11.734 0-21.227 9.6-21.227 21.333l-.107 128c0 11.733 9.6 21.333 21.334 21.333h170.666c11.734 0 21.334-9.6 21.334-21.333V48c0-2.987-2.347-5.333-5.334-5.333zM120 162.667L106.667 192l-13.334-29.333L64 149.333 93.333 136l13.334-29.333L120 136l29.333 13.333L120 162.667zm60.693-35.307l-10.026 21.973-10.027-21.973-21.973-10.027 21.973-10.026 10.027-21.974 10.026 21.974 21.974 10.026-21.974 10.027z"
        fill={`${fill || BLACK}`}
        fillRule="nonzero"
      />
    </G>
  </Svg>
);

movieFilter.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default movieFilter;
