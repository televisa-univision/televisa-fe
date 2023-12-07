import React from 'react';
import Svg, { G, Path } from 'svgs';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import { BLACK } from '@univision/fe-utilities/styled/constants';

/**
 * navMore component
 * @param {number} width - icon width size
 * @param {number} height - icon height size
 * @param {string} fill - fill color, default: svg file color
 * @param {(Object|style)} [style] - modifier styles
 * @param {string} className - modifier class
 * @param {string} viewBox - viewBox value
 * @returns {JSX}
 */
const navMore = ({
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
        d="M216.889 48H83.556c-6.134 0-10.934 3.111-14.134 7.822l-44.8 67.29a9.03 9.03 0 000 9.866l44.8 67.2c3.2 4.622 8.622 7.822 14.756 7.822h132.71c9.779 0 17.779-8 17.779-17.778V65.778c0-9.778-8-17.778-17.778-17.778zm-115.556 93.333A13.315 13.315 0 0188 128a13.315 13.315 0 0113.333-13.333A13.315 13.315 0 01114.667 128a13.315 13.315 0 01-13.334 13.333zm44.445 0A13.315 13.315 0 01132.444 128a13.315 13.315 0 0113.334-13.333A13.315 13.315 0 01159.11 128a13.315 13.315 0 01-13.333 13.333zm44.444 0A13.315 13.315 0 01176.89 128a13.315 13.315 0 0113.333-13.333A13.315 13.315 0 01203.556 128a13.315 13.315 0 01-13.334 13.333z"
        fill={`${fill || BLACK}`}
        fillRule="nonzero"
      />
    </G>
  </Svg>
);

navMore.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default navMore;
