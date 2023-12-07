import React from 'react';
import Svg, { Path } from 'svgs';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import { BLACK } from '@univision/fe-utilities/styled/constants';

/**
 * playCircleFilled component
 * @param {number} width - icon width size
 * @param {number} height - icon height size
 * @param {string} fill - fill color, default: svg file color
 * @param {(Object|style)} [style] - modifier styles
 * @param {string} className - modifier class
 * @param {string} viewBox - viewBox value
 * @returns {JSX}
 */
const playCircleFilled = ({
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
    <Path
      d="M106.5 0C47.712 0 0 47.712 0 106.5S47.712 213 106.5 213 213 165.288 213 106.5 165.288 0 106.5 0zM85.2 143.775v-74.55c0-4.366 5.005-6.922 8.52-4.26l49.736 37.275a5.286 5.286 0 010 8.52L93.72 148.035c-3.514 2.662-8.52.107-8.52-4.26z"
      fill={`${fill || BLACK}`}
      fillRule="nonzero"
    />
  </Svg>
);

playCircleFilled.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default playCircleFilled;
