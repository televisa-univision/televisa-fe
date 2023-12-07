import React from 'react';
import Svg, { Path } from 'svgs';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import { INTERNATIONAL_ORANGE } from '@univision/fe-utilities/styled/constants';

/**
 * vix props
 * @property {string} className - modifier class
 * @property {string} fill - fill color, default: svg file color
 * @property {number} height - icon height size
 * @property {(Object|style)} [style] - modifier styles
 * @property {string} viewBox - svg viewBox
 * @property {number} width - icon width size
 * @returns {JSX}
 */
const vix = ({
  className,
  fill,
  height,
  style,
  width,
  viewBox,
}) => (
  <Svg
    width={width}
    height={height}
    viewBox={viewBox}
    style={style}
    className={className}
  >
    <Path
      d="m11.0589 1.13794c.5888 0 1.019.31701 1.1549.88311l5.91 21.26265 5.978-21.26265c.1359-.54345.5435-.88311 1.1549-.88311h9.6463c.4529 0 .7699.45288.634.88311l-9.5104 30.41085c-.1812.5887-.5888.8831-1.2002.8831h-13.5863c-.5888 0-1.019-.2717-1.2002-.8831l-9.555715-30.41085c-.135863-.40759.203796-.88311.656675-.88311zm26.267 6.06858c0-3.57775 2.9437-6.521461 6.5215-6.521461 3.5777 0 6.5214 2.943711 6.5214 6.521461 0 3.57778-2.9437 6.52148-6.5214 6.52148-3.5778 0-6.5215-2.9437-6.5215-6.52148zm12.3636 25.15738c0 .5435-.3623.9285-.9284.9285h-9.8275c-.5434 0-.9284-.3624-.9284-.9285v-15.194c0-.5435.3623-.9284.9284-.9284h9.8275c.5434 0 .9284.3623.9284.9284zm3.3513-.2264 9.284-14.9224-9.284-14.92232c-.3397-.54346-.0453-1.15484.5887-1.15484h10.5068c.7246 0 1.1549.22644 1.4719.76989l5.0949 8.89907 5.0949-8.89907c.3396-.54345.7472-.76989 1.4718-.76989h10.2804c.634 0 .9284.58874.5887 1.15484l-9.284 14.92232 9.284 14.9224c.317.5435.0453 1.1549-.5887 1.1549h-10.5068c-.7246 0-1.1549-.2265-1.4719-.7699l-5.0949-8.8991-5.0948 8.8991c-.3171.5434-.7246.7699-1.4719.7699h-10.2804c-.634 0-.9284-.5888-.5887-1.1549z"
      fill={fill || INTERNATIONAL_ORANGE}
    />
  </Svg>
);

vix.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  width: PropTypes.number,
  viewBox: PropTypes.string,
};

export default vix;
