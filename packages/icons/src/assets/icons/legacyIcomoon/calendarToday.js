import React from 'react';
import Svg, { G, Path } from 'svgs';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import { BLACK } from '@univision/fe-utilities/styled/constants';

/**
 * calendarToday component
 * @param {number} width - icon width size
 * @param {number} height - icon height size
 * @param {string} fill - fill color, default: svg file color
 * @param {(Object|style)} [style] - modifier styles
 * @param {string} className - modifier class
 * @param {string} viewBox - viewBox value
 * @returns {JSX}
 */
const calendarToday = ({
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
        d="M213.333 32h-10.666V21.333c0-5.866-4.8-10.666-10.667-10.666s-10.667 4.8-10.667 10.666V32H74.667V21.333c0-5.866-4.8-10.666-10.667-10.666s-10.667 4.8-10.667 10.666V32H42.667c-11.734 0-21.334 9.6-21.334 21.333V224c0 11.733 9.6 21.333 21.334 21.333h170.666c11.734 0 21.334-9.6 21.334-21.333V53.333c0-11.733-9.6-21.333-21.334-21.333zm-10.666 192H53.333c-5.866 0-10.666-4.8-10.666-10.667v-128h170.666v128c0 5.867-4.8 10.667-10.666 10.667z"
        fill={`${fill || BLACK}`}
        fillRule="nonzero"
      />
    </G>
  </Svg>
);

calendarToday.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default calendarToday;
