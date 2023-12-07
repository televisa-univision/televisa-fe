import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, { G, Path, Polygon } from 'svgs';

/**
 * soundOff component
 * @param {size} size - icon size
 * @param {string} fill - icon fill modifier
 * @param {style} style - style override
 * @returns {JSX}
 */
const soundOff = ({
  width, height, fill, style,
}) => (
  <Svg width={width} height={height} viewBox="0 0 51.08 52.62" style={style}>
    <G>
      <Polygon
        fill={`${fill || '#FFFFFF'}`}
        points="1.42,16.86 1.42,38.26 13.7,38.26 34.2,52.26 34.2,43.93 7.13,16.86"
      />
      <Path
        fill={`${fill || '#FFFFFF'}`}
        d="M48.83,43.87L34.2,29.25V2.81L18.49,13.53L8.23,3.27c-1.28-1.28-3.34-1.28-4.62,0c-1.28,1.28-1.28,3.34,0,4.62l40.6,40.6c0.64,0.64,1.47,0.96,2.31,0.96c0.84,0,1.67-0.32,2.31-0.96C50.1,47.21,50.1,45.15,48.83,43.87z"
      />
    </G>
  </Svg>
);

soundOff.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default soundOff;
