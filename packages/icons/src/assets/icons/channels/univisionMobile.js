import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import Svg, { G, Path } from 'svgs';

/**
 * univisionMobile component
 * @param {size} props.size - icon size
 * @param {string} props.fill - icon fill modifier
 * @param {style} props.style - style override
 * @param {string} props.className - modifier class name
 * @returns {JSX}
 */
const univisionMobile = ({
  width, height, fill, className, style,
}) => (
  <Svg
    width={width}
    height={height}
    className={className}
    viewBox="0 0 256 256"
    style={style}
  >
    <G id="Page-1" fill="none" fillRule="evenodd">
      <Path fill={`${fill || '#00C473'}`} d="M100.069 0v144.176c7.212 0 47.479 1.01 81.595-2.014 8.591-.87 16.993-1.96 24.992-3.338 19.642-3.7 36.189-9.505 41.93-14.278V14.36C233.633 3.318 170.677 0 100.07 0" />
      <Path fill={`${fill || '#1D1DEA'}`} d="M248.585 126.384v-1.84c-5.742 4.772-22.288 10.583-41.931 14.278-8 1.377-16.4 2.473-24.992 3.343-34.112 3.023-74.378 2.014-81.595 2.014 0 .83 0 1.647.005 2.449a708.813 708.813 0 0 0 .354 20.818c.204 6.999.515 13.935.966 20.658.942 14.278 2.514 27.644 5.004 38.806 2.781 12.481 6.722 22.19 12.236 27.349.088.082.175.174.262.25a133.6 133.6 0 0 0 5.402.117c42.13 0 79.363-20.867 101.84-52.775 8.11-11.505 14.29-26.551 18.1-42.269a127.294 127.294 0 0 0 4.344-33.043c-.005 0-.01.005-.015.005v-.145c.005-.005.015-.01.02-.015" />
      <Path fill={`${fill || '#FF0000'}`} d="M118.63 254.257c-5.514-5.154-9.45-14.867-12.236-27.348-2.485-11.163-4.058-24.523-5.004-38.801-.451-6.729-.762-13.66-.966-20.664a622.093 622.093 0 0 1-.126-4.608c-.14-5.56-.209-10.486-.223-16.205-.005-.802-.005-1.618-.005-2.454-32.733 0-61.093-2.458-74.655-4.912-14.274-2.58-23.778-7.8-25.414-10.428 0 12.167 1.762 26.02 5.053 37.124a122.91 122.91 0 0 0 17.546 36.11c21.526 30.421 56.487 50.747 96.297 52.442-.092-.082-.175-.169-.267-.256" />
      <Path fill={`${fill || '#C626B6'}`} d="M4.84 8.535C2.164 8.535 0 10.69 0 13.346v115.49c1.64 2.628 11.14 7.85 25.414 10.428 2.194.397 4.79.797 7.717 1.189 15.153 2 39.51 3.724 66.937 3.724v-88.87C69.112 15.635 21.22 8.534 4.84 8.534" />
    </G>

  </Svg>
);

univisionMobile.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default univisionMobile;
