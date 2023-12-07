import React from 'react';
import Svg, { G, Path } from 'svgs';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import { BLACK } from '@univision/fe-utilities/styled/constants';

/**
 * addToCalendar component
 * @param {number} width - icon width size
 * @param {number} height - icon height size
 * @param {string} fill - fill color, default: svg file color
 * @param {(Object|style)} [style] - modifier styles
 * @param {string} className - modifier class
 * @param {string} viewBox - viewBox value
 * @returns {JSX}
 */
const addToCalendar = ({
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
        d="M213.333 170.667l1.24.072c5.288.619 9.427 5.147 9.427 10.594v21.334h21.333c5.867 0 10.667 4.8 10.667 10.666l-.072 1.24c-.62 5.288-5.147 9.427-10.595 9.427H224v21.333C224 251.2 219.2 256 213.333 256l-1.24-.072c-5.288-.62-9.426-5.147-9.426-10.595V224h-21.334c-5.866 0-10.666-4.8-10.666-10.667l.072-1.24c.619-5.288 5.147-9.426 10.594-9.426h21.334v-21.334c0-5.866 4.8-10.666 10.666-10.666zm-32-160c5.448 0 9.976 4.138 10.595 9.427l.072 1.24V32h10.667c11.2 0 20.456 8.747 21.274 19.747l.059 1.586v96h-21.333v-64H53.333V192c0 5.448 4.14 9.976 9.428 10.595l1.239.072h85.333V224h-96c-11.301 0-20.465-8.747-21.275-19.747L32 202.667l.107-149.334c0-11.2 8.552-20.456 19.628-21.274L53.333 32H64V21.333c0-5.866 4.8-10.666 10.667-10.666 5.447 0 9.975 4.138 10.594 9.427l.072 1.24V32h85.334V21.333c0-5.866 4.8-10.666 10.666-10.666z"
        fill={`${fill || BLACK}`}
        fillRule="nonzero"
      />
    </G>
  </Svg>
);

addToCalendar.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default addToCalendar;
