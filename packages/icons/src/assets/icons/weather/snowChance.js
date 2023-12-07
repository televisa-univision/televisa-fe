import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import { Svg, Path } from 'svgs';

import { LIGHT_GREY } from '../../../constants/colors';

/**
 * snowChance icon component
 * @param {!Object} props - components props
 * @param {string} props.className - modifier class name
 * @param {string} props.fill - icon fill modifier
 * @param {(style|Object)} props.style - style override
 * @param {string} props.viewBox - viewBox
 * @param {number} props.width - icon width
 * @returns {JSX}
 */
const snowChance = ({
  width, height, fill, viewBox, className, style,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} className={className} style={style}>
    <Path d="M227.2 60.9L200 76.6l1.7-15.1a8.6 8.6 0 0 0-17-2l-3 27.7-45.1 26V60.6l22.3-16.4a8.5 8.5 0 1 0-10-13.8l-12.3 9V8.5c0-4.7-3.9-8.5-8.6-8.5a8.5 8.5 0 0 0-8.5 8.5v30.9l-12.3-9A8.5 8.5 0 0 0 97 44.2l22.4 16.4v52.6L73.9 87l-3-27.6a8.6 8.6 0 1 0-17 1.9l1.6 15.1L28.8 61c-4-2.4-9.3-1-11.6 3a8.5 8.5 0 0 0 3 11.8L47 91l-14 6.1a8.6 8.6 0 0 0 7 15.7l25.3-11.2L111 128l-45.6 26.3L40 143.1a8.6 8.6 0 0 0-7 15.7l14 6.1-26.7 15.4a8.5 8.5 0 1 0 8.5 14.8l26.7-15.4-1.6 15.1a8.6 8.6 0 0 0 7.5 9.4l1 .1c4.3 0 8-3.3 8.4-7.6l3-27.6 45.7-26.3v52.1L97 211.3a8.5 8.5 0 1 0 10 13.8l12.4-9v31.4a8.5 8.5 0 0 0 17 0V216l12.3 9a8.6 8.6 0 0 0 12-1.8c2.7-3.9 2-9.2-2-12l-22.2-16.4v-52.1l45.1 26 3 27.6a8.5 8.5 0 0 0 8.5 7.6h.9c4.7-.6 8-4.8 7.5-9.5l-1.6-15 27.2 15.6c1.3.8 2.8 1.2 4.3 1.2a8.6 8.6 0 0 0 4.3-16l-27.3-15.7 14-6.1a8.6 8.6 0 0 0-7-15.6L190.3 154 145.1 128l45.1-26 25.4 11c1 .6 2.3.8 3.4.8a8.6 8.6 0 0 0 3.5-16.3l-14-6.1 27.2-15.8a8.5 8.5 0 1 0-8.5-14.7z" fill={`${fill || LIGHT_GREY}`} />
  </Svg>
);

snowChance.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default snowChance;
