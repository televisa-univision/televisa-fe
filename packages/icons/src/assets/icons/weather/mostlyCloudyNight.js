import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import { Svg, G, Path } from 'svgs';

import { LIGHT_GREY } from '../../../constants/colors';

/**
 * mostlyCloudyNight icon component
 * @param {!Object} props - components props
 * @param {number} props.size - icon size
 * @param {string} props.fill - icon fill modifier
 * @param {string} props.viewBox - viewBox
 * @param {string} props.className - modifier class name
 * @param {(style|Object)} props.style - style override
 * @returns {JSX}
 */
const mostlyCloudyNight = ({
  width, height, fill, viewBox, className, style,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <G fill="none" fillRule="evenodd">
      <Path d="M220.6 167l-.1.1h-.1l-.2.2a19.3 19.3 0 0 1-15.5 7.7h-.5v-1.3l-.1-2.5h-.4c0 .2-.3.2-.4.3v-.6l.4-.2h.4a30.9 30.9 0 0 0-25.8-27 30.5 30.5 0 0 0-39.1-24.2 40.8 40.8 0 0 0-26.1-20.2 29.7 29.7 0 0 1 49.1 10.5 5.3 5.3 0 0 0 3.2 3.2c1.4.6 3 .5 4.4-.3a21 21 0 0 1 9.3-2.3 20 20 0 0 1 19.8 19.7c0 3.1 2.5 5.4 5.8 5.4a19.7 19.7 0 0 1 15.9 31.4m-27.3 9.7v.3l-.1.5-.7 2.3-1 2.6-1.1 1.9-.1.3h-.1l-.1.3v.1a19.9 19.9 0 0 1-16.3 8.7h-103c-7 0-13.4-2.7-18.3-7a66.3 66.3 0 0 1-7.2-10.4 27.2 27.2 0 0 1 22.5-37l1.1-.1a5.7 5.7 0 0 0 5-4.7c.4-3.1 1.4-6.2 2.9-9.2.3-.6.6-1.3 1-1.8 0-.1 0-.2.2-.2a29 29 0 0 1 7.4-8.1l.1-.2c0-.2.2-.3.2-.3 3.8-2.7 8.3-4.7 13-5.4l1.7-.2 1.5-.1h3.1c12 .7 22.3 8.3 26.3 19.5a6.2 6.2 0 0 0 3.2 3.2c1.4.5 3.1.4 4.5-.3 2.8-1.5 6-2.4 9.2-2.4a20 20 0 0 1 19.8 19.9c0 3 2.5 5.3 5.8 5.3 10.7 0 19.5 8.8 19.6 19.4v.6l-.1 2.5m-66.4 46A92.6 92.6 0 0 1 71 204.4h102.8c4.7 0 9.2-1 13.3-3a93.7 93.7 0 0 1-60.2 21.4m-91.7-70.2a94.2 94.2 0 0 1 38.2-103c-.7 2.2-1 4.4-1.6 6.6l-.2.8c-3.7 16-3.8 32.6 0 48.6l1.7 6a38.4 38.4 0 0 0-9.3 17.2 38.3 38.3 0 0 0-28.8 23.8m174-27.4a30.2 30.2 0 0 0-39-24.1 41 41 0 0 0-36-21.6 41.3 41.3 0 0 0-34 18.8 39 39 0 0 0-17.9 5.7 94 94 0 0 1 6.2-64.2c1-2 .6-4.5-1-6.1-1.5-1.6-4-2-6-1a107.3 107.3 0 0 0-29.1 20.6 104.8 104.8 0 0 0-17.5 125.9l.3.7c2 5.6 5.4 10.6 9.8 14.4a104.7 104.7 0 0 0 82 39.1 105 105 0 0 0 89.5-50 30.6 30.6 0 0 0-7.3-58.2" fill={`${fill || LIGHT_GREY}`} fillRule="evenodd" />
    </G>
  </Svg>
);

mostlyCloudyNight.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  viewBox: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default mostlyCloudyNight;
