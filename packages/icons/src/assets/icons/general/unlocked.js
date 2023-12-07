import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import Svg, { Path } from 'svgs';

/**
 * unlocked component
 * @param {number} width - icon width size
 * @param {number} height - icon height size
 * @param {string} fill - fill color, default: svg file color
 * @param {string} viewBox - viewBox width, height, default: 0 0 256 256
 * @param {(Object|style)} [style] - modifier styles
 * @param {string} className - modifier class
 * @returns {JSX}
 */
const unlocked = ({
  width, height, fill, viewBox, style, className,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} style={style} className={className}>
    <Path
      d="M128 10.667c29.44 0 53.333 23.893 53.333 53.333v21.333H192c11.733 0 21.333 9.6 21.333 21.334v106.666c0 11.734-9.6 21.334-21.333 21.334H64c-11.733 0-21.333-9.6-21.333-21.334V106.667c0-11.734 9.6-21.334 21.333-21.334h96V64c0-17.6-14.4-32-32-32-14.613 0-27.307 9.92-30.933 24-1.494 5.76-7.36 9.173-13.014 7.68-5.76-1.493-9.173-7.253-7.68-13.013 6.08-23.574 27.307-40 51.627-40zm64 96H64v106.666h128V106.667zm-64 74.666c11.733 0 21.333-9.6 21.333-21.333 0-11.733-9.6-21.333-21.333-21.333-11.733 0-21.333 9.6-21.333 21.333 0 11.733 9.6 21.333 21.333 21.333z"
      fill={`${fill || '#000000'}`}
      fillRule="nonzero"
    />
  </Svg>
);

unlocked.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  viewBox: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  className: PropTypes.string,
};

export default unlocked;
