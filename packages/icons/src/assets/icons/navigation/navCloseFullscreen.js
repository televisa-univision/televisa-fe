import React from 'react';
import Svg, { G, Path } from 'svgs';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import { BLACK } from '@univision/fe-utilities/styled/constants';

/**
 * navCloseFullscreen component
 * @param {number} width - icon width size
 * @param {number} height - icon height size
 * @param {string} fill - fill color, default: svg file color
 * @param {(Object|style)} [style] - modifier styles
 * @param {string} className - modifier class
 * @param {string} viewBox - viewBox value
 * @returns {JSX}
 */
const navCloseFullscreen = ({
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
        d="M227.093 43.947l-48.96 48.96 16.96 16.96c6.72 6.72 1.92 18.24-7.573 18.24h-48.853c-5.867 0-10.667-4.8-10.667-10.667V68.373c0-9.493 11.52-14.293 18.24-7.573l16.96 16.96 48.96-48.96a10.623 10.623 0 0115.04 0c4.053 4.267 4.053 10.987-.107 15.147zM43.947 227.093l48.96-48.96 16.96 16.96c6.72 6.72 18.24 1.92 18.24-7.573v-48.853c0-5.867-4.8-10.667-10.667-10.667H68.373c-9.493 0-14.293 11.52-7.573 18.24l16.96 16.96-48.96 48.96a10.623 10.623 0 000 15.04c4.267 4.053 10.987 4.053 15.147-.107z"
        fill={`${fill || BLACK}`}
        fillRule="nonzero"
      />
    </G>
  </Svg>
);

navCloseFullscreen.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default navCloseFullscreen;
