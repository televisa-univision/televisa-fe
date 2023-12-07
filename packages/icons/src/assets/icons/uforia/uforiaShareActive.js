import React from 'react';
import Svg, { G, Path } from 'svgs';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import { BLACK } from '@univision/fe-utilities/styled/constants';

/**
 * uforiaShareActive component
 * @param {number} width - icon width size
 * @param {number} height - icon height size
 * @param {string} fill - fill color, default: svg file color
 * @param {string} stroke - stroke color, default: svg file color
 * @param {(Object|style)} [style] - modifier styles
 * @param {string} className - modifier class
 * @param {string} viewBox - viewBox value
 * @returns {JSX}
 */
const uforiaShareActive = ({
  width,
  height,
  fill,
  className,
  style,
  viewBox,
  stroke,
}) => (
  <Svg
    viewBox={viewBox}
    height={height}
    width={width}
    className={className}
    style={style}
  >
    <G fill="none" fillRule="evenodd">
      <Path d="M0 0h256v256H0z" fill="none" />
      <Path
        d="M64.348 85.315c23.564 0 42.667 19.103 42.667 42.667s-19.103 42.667-42.667 42.667-42.667-19.103-42.667-42.667 19.103-42.667 42.667-42.667zm128 64c23.564 0 42.667 19.103 42.667 42.667s-19.103 42.667-42.667 42.667-42.667-19.103-42.667-42.667 19.103-42.667 42.667-42.667zm0-128c23.564 0 42.667 19.103 42.667 42.667s-19.103 42.667-42.667 42.667-42.667-19.103-42.667-42.667 19.103-42.667 42.667-42.667zm-35.34 48.253l9.566 19.068-66.594 33.406-9.566-19.069 66.595-33.405zm-56.668 64.484l65.55 32.775-9.541 19.08-65.55-32.774z"
        fill={`${stroke || BLACK}`}
      />
      <Path
        d="M192.348 21.315c23.564 0 42.667 19.103 42.667 42.667s-19.103 42.667-42.667 42.667c-12.893 0-24.45-5.719-32.274-14.758l-54.008 27.1c.621 2.9.949 5.907.949 8.991 0 3.065-.324 6.055-.938 8.937l54.089 27.049c7.822-8.978 19.34-14.653 32.182-14.653 23.564 0 42.667 19.103 42.667 42.667s-19.103 42.667-42.667 42.667-42.667-19.103-42.667-42.667c0-3.065.324-6.055.938-8.937L96.53 155.996c-7.822 8.978-19.34 14.653-32.182 14.653-23.564 0-42.667-19.103-42.667-42.667s19.103-42.667 42.667-42.667c12.822 0 24.323 5.656 32.144 14.609l54.097-27.145a42.846 42.846 0 0 1-.908-8.797c0-23.564 19.103-42.667 42.667-42.667zm0 144c-14.728 0-26.667 11.94-26.667 26.667 0 14.728 11.94 26.667 26.667 26.667 14.728 0 26.667-11.94 26.667-26.667 0-14.728-11.94-26.667-26.667-26.667zm-128-64c-14.728 0-26.667 11.94-26.667 26.667 0 14.728 11.94 26.667 26.667 26.667 14.728 0 26.667-11.94 26.667-26.667 0-14.728-11.94-26.667-26.667-26.667zm128-64c-14.728 0-26.667 11.94-26.667 26.667 0 14.728 11.94 26.667 26.667 26.667 14.728 0 26.667-11.94 26.667-26.667 0-14.728-11.94-26.667-26.667-26.667z"
        fill={`${fill || BLACK}`}
      />
    </G>
  </Svg>
);

uforiaShareActive.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
  stroke: PropTypes.string,
};

export default uforiaShareActive;
