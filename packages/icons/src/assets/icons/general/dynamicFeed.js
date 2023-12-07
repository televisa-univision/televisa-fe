import React from 'react';
import Svg, { G, Path } from 'svgs';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import { BLACK } from '@univision/fe-utilities/styled/constants';

/**
 * dynamicFeed component
 * @param {number} width - icon width size
 * @param {number} height - icon height size
 * @param {string} fill - fill color, default: svg file color
 * @param {(Object|style)} [style] - modifier styles
 * @param {string} className - modifier class
 * @param {string} viewBox - viewBox value
 * @returns {JSX}
 */
const dynamicFeed = ({
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
        d="M32 128l1.24.072c5.288.62 9.427 5.147 9.427 10.595v64H128c5.867 0 10.667 4.8 10.667 10.666l-.072 1.24C137.975 219.86 133.448 224 128 224H42.667c-11.734 0-21.334-9.6-21.334-21.333v-64C21.333 132.8 26.133 128 32 128zm42.667-42.667l1.24.072c5.288.62 9.426 5.147 9.426 10.595v64h85.334c5.866 0 10.666 4.8 10.666 10.667l-.072 1.24c-.619 5.288-5.147 9.426-10.594 9.426H85.333C73.6 181.333 64 171.733 64 160V96c0-5.867 4.8-10.667 10.667-10.667zM213.333 32c11.734 0 21.334 9.6 21.334 21.333v64c0 11.734-9.6 21.334-21.334 21.334H128c-11.733 0-21.333-9.6-21.333-21.334v-64C106.667 41.6 116.267 32 128 32h85.333zm0 42.667H128V112c0 2.987 2.347 5.333 5.333 5.333H208c2.987 0 5.333-2.346 5.333-5.333V74.667z"
        fill={`${fill || BLACK}`}
        fillRule="nonzero"
      />
    </G>
  </Svg>
);

dynamicFeed.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default dynamicFeed;
