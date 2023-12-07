import React from 'react';
import Svg, { G, Path } from 'svgs';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import { BLACK } from '@univision/fe-utilities/styled/constants';

/**
 * navHome component
 * @param {number} width - icon width size
 * @param {number} height - icon height size
 * @param {string} fill - fill color, default: svg file color
 * @param {(Object|style)} [style] - modifier styles
 * @param {string} className - modifier class
 * @param {string} viewBox - viewBox value
 * @returns {JSX}
 */
const navHome = ({
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
        d="M107.107 202.446v-54.438h41.74v54.438c0 5.988 4.695 10.887 10.434 10.887h31.304c5.74 0 10.435-4.9 10.435-10.887v-76.214h17.739c4.8 0 7.095-6.206 3.443-9.472l-87.234-81.984a10.19 10.19 0 00-13.982 0L33.75 116.76c-3.547 3.266-1.356 9.472 3.444 9.472h17.739v76.214c0 5.988 4.696 10.887 10.435 10.887h31.304c5.739 0 10.434-4.9 10.434-10.887z"
        fill={`${fill || BLACK}`}
        fillRule="nonzero"
      />
    </G>
  </Svg>
);

navHome.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default navHome;
