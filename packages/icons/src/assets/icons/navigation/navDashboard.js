import React from 'react';
import Svg, { G, Path } from 'svgs';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import { BLACK } from '@univision/fe-utilities/styled/constants';

/**
 * navDashboard component
 * @param {number} width - icon width size
 * @param {number} height - icon height size
 * @param {string} fill - fill color, default: svg file color
 * @param {(Object|style)} [style] - modifier styles
 * @param {string} className - modifier class
 * @param {string} viewBox - viewBox value
 * @returns {JSX}
 */
const navDashboard = ({
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
        d="M64 106.667c-11.733 0-21.333 9.6-21.333 21.333 0 11.733 9.6 21.333 21.333 21.333 11.733 0 21.333-9.6 21.333-21.333 0-11.733-9.6-21.333-21.333-21.333zm128 0c-11.733 0-21.333 9.6-21.333 21.333 0 11.733 9.6 21.333 21.333 21.333 11.733 0 21.333-9.6 21.333-21.333 0-11.733-9.6-21.333-21.333-21.333zm-64 0c-11.733 0-21.333 9.6-21.333 21.333 0 11.733 9.6 21.333 21.333 21.333 11.733 0 21.333-9.6 21.333-21.333 0-11.733-9.6-21.333-21.333-21.333z"
        fill={`${fill || BLACK}`}
        fillRule="nonzero"
      />
    </G>
  </Svg>
);

navDashboard.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default navDashboard;
