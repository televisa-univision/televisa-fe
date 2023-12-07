import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import Svg, { G, Path } from 'svgs';

/**
 * univisionMobileWhite component
 * @param {size} props.size - icon size
 * @param {string} props.fill - icon fill modifier
 * @param {style} props.style - style override
 * @param {string} props.className - modifier class name
 * @returns {JSX}
 */
const univisionMobileWhite = ({
  width, height, fill, className, style,
}) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 256 256"
    className={className}
    style={style}
  >
    <G fill="none" fillRule="evenodd">
      <Path fill={`${fill || '#FFFFFF'}`} d="M252.127 123.847l-.069-109.829C237.663 3.36 179.034.022 111.381.002l.133 140.643c46.38 0 121.369-4.75 140.613-16.798M252.127 137.737c-.473 67.845-54.356 121.585-121.487 121.624-.93 0-1.866-.059-2.732-.059-14.06-19.46-16.35-55.783-16.38-103.67 49.724-.418 112.434-2.003 140.599-17.895M112.915 259.194C49.801 254.664.462 203.13 0 137.904c17.792 10.826 68.74 17.575 93.248 17.92.196 39.596 4.854 84.573 19.667 103.37M95.651 52.093C65.325 15.633 20.391 9.01 4.776 9.02 2.152 9.025-.004 11.123 0 13.747c0 .074.015.157.015.236 0-.015-.005-.025-.01-.034v1.053c0 .01-.005.02-.005.03 0 .03 0 .059.005.088v.118L.01 125.914c33.531 11.107 80.064 13.007 93.82 13.376l1.821-85.913c-.01-.01-.02-.014-.03-.024l.03-1.26z" />
    </G>
  </Svg>
);

univisionMobileWhite.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default univisionMobileWhite;
