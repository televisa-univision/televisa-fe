import React from 'react';
import Svg, { G, Path } from 'svgs';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import { GOSSAMER } from '@univision/fe-utilities/styled/constants';

/**
 * triangleGreen component
 * @param {number} width - icon width size
 * @param {number} height - icon height size
 * @param {string} fill - fill color, default: svg file color
 * @param {(Object|style)} [style] - modifier styles
 * @param {string} className - modifier class
 * @param {string} viewBox - viewBox value
 * @returns {JSX}
 */
const triangleGreen = ({
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
        d="M86.714 153.8l32.606-45.648c3.424-4.794 10.086-5.904 14.88-2.48a10.667 10.667 0 012.48 2.48l32.606 45.648c3.424 4.794 2.314 11.456-2.48 14.88a10.667 10.667 0 01-6.2 1.987H95.394c-5.891 0-10.667-4.776-10.667-10.667 0-2.223.695-4.39 1.987-6.2z"
        fill={`${fill || GOSSAMER}`}
        fillRule="nonzero"
      />
    </G>
  </Svg>
);

triangleGreen.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default triangleGreen;
