import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import Svg, { Path } from 'svgs';

/**
 * locked component
 * @param {number} width - icon width size
 * @param {number} height - icon height size
 * @param {string} fill - fill color, default: svg file color
 * @param {string} viewBox - viewBox width, height, default: 0 0 256 256
 * @param {(Object|style)} [style] - modifier styles
 * @param {string} className - modifier class
 * @returns {JSX}
 */
const locked = ({
  width, height, fill, viewBox, style, className,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} style={style} className={className}>
    <Path
      d="M192 85.333h-10.667V64c0-29.44-23.893-53.333-53.333-53.333-29.44 0-53.333 23.893-53.333 53.333v21.333H64c-11.733 0-21.333 9.6-21.333 21.334v106.666c0 11.734 9.6 21.334 21.333 21.334h128c11.733 0 21.333-9.6 21.333-21.334V106.667c0-11.734-9.6-21.334-21.333-21.334zm-64 96c-11.733 0-21.333-9.6-21.333-21.333 0-11.733 9.6-21.333 21.333-21.333 11.733 0 21.333 9.6 21.333 21.333 0 11.733-9.6 21.333-21.333 21.333zm-32-96V64c0-17.707 14.293-32 32-32s32 14.293 32 32v21.333H96z"
      fill={`${fill || '#000000'}`}
      fillRule="nonzero"
    />
  </Svg>
);

locked.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  viewBox: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  className: PropTypes.string,
};

export default locked;
