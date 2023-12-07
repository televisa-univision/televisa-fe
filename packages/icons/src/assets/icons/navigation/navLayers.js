import React from 'react';
import Svg, { G, Path } from 'svgs';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import { BLACK } from '@univision/fe-utilities/styled/constants';

/**
 * navLayers component
 * @param {number} width - icon width size
 * @param {number} height - icon height size
 * @param {string} fill - fill color, default: svg file color
 * @param {(Object|style)} [style] - modifier styles
 * @param {string} className - modifier class
 * @param {string} viewBox - viewBox value
 * @returns {JSX}
 */
const navLayers = ({
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
        d="M134.4 192.64c-3.84 2.987-9.28 2.987-13.12 0l-65.6-50.987a10.57 10.57 0 00-13.013 0c-5.44 4.267-5.44 12.48 0 16.747l72.106 56.107c7.68 5.973 18.454 5.973 26.24 0L213.12 158.4c5.44-4.267 5.44-12.48 0-16.747l-.107-.106a10.57 10.57 0 00-13.013 0l-65.6 51.093zm6.72-32.213l72.107-56.107c5.44-4.267 5.44-12.587 0-16.853L141.12 31.36c-7.68-5.973-18.453-5.973-26.24 0L42.773 87.573c-5.44 4.267-5.44 12.587 0 16.854l72.107 56.106c7.68 5.974 18.56 5.974 26.24-.106z"
        fill={`${fill || BLACK}`}
        fillRule="nonzero"
      />
    </G>
  </Svg>
);

navLayers.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default navLayers;
