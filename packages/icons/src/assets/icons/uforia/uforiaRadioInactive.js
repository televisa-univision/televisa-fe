import React from 'react';
import Svg, { G, Path } from 'svgs';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import { BLACK } from '@univision/fe-utilities/styled/constants';

/**
 * uforiaRadioInactive component
 * @param {number} width - icon width size
 * @param {number} height - icon height size
 * @param {string} fill - fill color, default: svg file color
 * @param {(Object|style)} [style] - modifier styles
 * @param {string} className - modifier class
 * @param {string} viewBox - viewBox value
 * @returns {JSX}
 */
const uforiaRadioInactive = ({
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
    <G fill="none" fillRule="evenodd">
      <Path d="M0 0h256v256H0z" />
      <Path
        d="M180.786 28.627c1.73 5.19-.75 10.769-5.589 13.03l-1.157.462-65.667 21.878 104.96.003c11.782 0 21.334 9.551 21.334 21.333v128c0 11.782-9.552 21.334-21.334 21.334H42.667c-11.782 0-21.334-9.552-21.334-21.334v-128c0-11.088 8.46-20.201 19.278-21.235L167.294 21.88c5.588-1.863 11.629 1.157 13.492 6.746zm32.547 108.778L42.667 138.59v74.744h170.666v-75.928zM80 149.333c14.728 0 26.667 11.94 26.667 26.667 0 14.728-11.94 26.667-26.667 26.667-14.728 0-26.667-11.94-26.667-26.667 0-14.728 11.94-26.667 26.667-26.667zm0 16c-5.891 0-10.667 4.776-10.667 10.667S74.11 186.667 80 186.667 90.667 181.89 90.667 176 85.89 165.333 80 165.333zm133.333-80H42.667v31.923l128-.886v-9.703c0-5.891 4.775-10.667 10.666-10.667 5.47 0 9.98 4.118 10.595 9.423l.072 1.244v9.554l21.333-.15V85.334z"
        fill={`${fill || BLACK}`}
        fillRule="nonzero"
      />
    </G>
  </Svg>
);

uforiaRadioInactive.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default uforiaRadioInactive;
