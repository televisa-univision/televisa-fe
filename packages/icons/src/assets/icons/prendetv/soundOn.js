import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import Svg, { G, Path, Polygon } from 'svgs';

/**
 * soundOn component
 * @param {size} size - icon size
 * @param {string} fill - icon fill modifier
 * @param {style} style - style override
 * @returns {JSX}
 */
const soundOn = ({
  width, height, fill, style,
}) => (
  <Svg width={width} height={height} viewBox="0 0 61.76 52.62" style={style}>
    <G>
      <Polygon
        fill={`${fill || '#FFFFFF'}`}
        points="13.48,14.7 1.24,14.7 1.24,36.1 13.52,36.1 34.03,50.1 34.03,0.65 13.48,14.66"
      />
      <Path
        fill={`${fill || '#FFFFFF'}`}
        d="M48.78,26.58c0-4.88-2.63-9.44-6.87-11.9c-1.1-0.64-2.52-0.26-3.16,0.84c-0.64,1.11-0.26,2.52,0.84,3.16c2.82,1.63,4.57,4.66,4.57,7.89c0,3.24-1.75,6.26-4.57,7.9c-1.11,0.64-1.48,2.06-0.84,3.16c0.43,0.74,1.21,1.15,2,1.15c0.39,0,0.79-0.1,1.16-0.31C46.14,36.03,48.78,31.47,48.78,26.58z"
      />
      <Path
        fill={`${fill || '#FFFFFF'}`}
        d="M47.05,4.23c-1.31-0.76-2.99-0.31-3.75,1c-0.76,1.31-0.31,2.99,1,3.75c6.28,3.64,10.18,10.38,10.18,17.61c0,7.23-3.9,13.97-10.18,17.61c-1.31,0.76-1.76,2.44-1,3.75c0.51,0.88,1.43,1.37,2.38,1.37c0.47,0,0.94-0.12,1.37-0.37c7.97-4.61,12.92-13.18,12.92-22.36C59.97,17.41,55.02,8.84,47.05,4.23z"
      />
    </G>
  </Svg>
);

soundOn.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default soundOn;
