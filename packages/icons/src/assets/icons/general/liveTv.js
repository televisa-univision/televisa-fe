import React from 'react';
import Svg, { G, Path } from 'svgs';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import { BLACK } from '@univision/fe-utilities/styled/constants';

/**
 * liveTv component
 * @param {number} width - icon width size
 * @param {number} height - icon height size
 * @param {string} fill - fill color, default: svg file color
 * @param {(Object|style)} [style] - modifier styles
 * @param {string} className - modifier class
 * @param {string} viewBox - viewBox value
 * @returns {JSX}
 */
const liveTv = ({
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
      <Path
        d="M112 182.933l42.453-24.32c7.147-4.053 7.147-14.4 0-18.56L112 115.733c-7.147-4.053-16 1.174-16 9.28v48.534c0 8.213 8.853 13.44 16 9.386zM224 64h-80.96l31.36-31.36c2.133-2.133 2.133-5.44 0-7.573-2.133-2.134-5.44-2.134-7.573 0L128 63.893 89.173 25.067c-2.133-2.134-5.44-2.134-7.573 0-2.133 2.133-2.133 5.44 0 7.573L112.96 64H32c-11.733 0-21.333 9.493-21.333 21.333v128c0 11.734 9.6 21.334 21.333 21.334h192c11.733 0 21.333-9.6 21.333-21.334v-128c0-11.84-9.6-21.333-21.333-21.333zm-10.667 149.333H42.667c-5.867 0-10.667-4.8-10.667-10.666V96c0-5.867 4.8-10.667 10.667-10.667h170.666C219.2 85.333 224 90.133 224 96v106.667c0 5.866-4.8 10.666-10.667 10.666z"
        fill={`${fill || BLACK}`}
        fillRule="nonzero"
      />
    </G>
  </Svg>
);

liveTv.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default liveTv;
