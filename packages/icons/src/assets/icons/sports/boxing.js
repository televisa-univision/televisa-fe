import React from 'react';
import Svg, { G, Path } from 'svgs';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import { BLACK } from '@univision/fe-utilities/styled/constants';

/**
 * boxing component
 * @param {number} width - icon width size
 * @param {number} height - icon height size
 * @param {string} fill - fill color, default: svg file color
 * @param {(Object|style)} [style] - modifier styles
 * @param {string} className - modifier class
 * @param {string} viewBox - viewBox value
 * @returns {JSX}
 */
const boxing = ({
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
        d="M53.579 115.992l5.066 39.982.026.19c2.131 14.736 12.346 26.764 25.782 31.932V213c0 6.075 4.986 11 11.135 11h57.506l23.51-.455c4.615-1.343 7.987-5.553 7.987-10.547v-25.56c13.381-5.808 23.207-18.525 24.482-33.632.008-.09.015-.18.018-.27l4.155-69.988c.803-13.527-3.937-26.405-13.348-36.262C190.488 37.428 177.753 32 164.038 32h-40.934c-10.168 0-19.989 4.202-26.943 11.53-6.954 7.327-10.569 17.278-9.923 27.195l.896 16.221h-7.947c-7.498 0-14.617 3.21-19.531 8.807-4.89 5.57-7.102 12.94-6.077 20.24zm53.145 74.832h55.596v11.174h-55.596v-11.174zM76.48 110.168a3.56 3.56 0 012.707-1.22h9.162l1.851 33.554c.335 6.066 5.573 10.709 11.726 10.385 6.141-.331 10.847-5.518 10.512-11.584l-3.969-71.885c-.263-4.038 1.135-7.888 3.938-10.84 2.801-2.952 6.6-4.578 10.697-4.578h40.933c7.52 0 14.5 2.976 19.66 8.38 5.159 5.404 7.757 12.464 7.317 19.88l-4.145 69.836c-.855 9.39-8.967 16.726-18.522 16.726h-69.22c-9.166 0-17.06-6.739-18.398-15.688l-5.062-39.96c-.01-.063-.017-.126-.026-.19a3.469 3.469 0 01.84-2.816z"
        fill={`${fill || BLACK}`}
        fillRule="nonzero"
      />
    </G>
  </Svg>
);

boxing.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default boxing;
