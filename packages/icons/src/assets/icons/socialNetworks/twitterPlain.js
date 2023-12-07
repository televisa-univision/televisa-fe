import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, { Path } from 'svgs';

import { DARKER_GREY } from '../../../constants/colors';

/**
 * twitterIcon component
 * @param {size} size - icon size
 * @param {string} fill - icon fill modifier
 * @param {string} viewBox - viewBox
 * @param {style} style - style override
 * @param {string} [className] - modifier class
 * @returns {JSX}
 */
const twitterIcon = ({
  width, height, fill, viewBox, style, className,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} style={style} className={className}>
    <Path d="M256 49.83a109.056 109.056 0 0 1-26.368 26.88v6.656a144.768 144.768 0 0 1-6.144 41.472 148.864 148.864 0 0 1-18.688 39.68 156.8 156.8 0 0 1-29.952 33.664 134.144 134.144 0 0 1-41.856 23.424 155.392 155.392 0 0 1-52.352 8.704A147.328 147.328 0 0 1 0 207.142c4.251.455 8.525.669 12.8.64a103.808 103.808 0 0 0 65.152-22.016 51.2 51.2 0 0 1-30.592-10.368 50.432 50.432 0 0 1-18.56-25.6c3.262.499 6.556.756 9.856.768a55.04 55.04 0 0 0 13.824-1.792 51.2 51.2 0 0 1-30.08-17.792 49.408 49.408 0 0 1-11.904-32.896v-.64a52.48 52.48 0 0 0 23.68 6.528A51.84 51.84 0 0 1 17.024 85.67a51.2 51.2 0 0 1 .768-51.2c13.104 16 29.41 29.08 47.872 38.4a147.712 147.712 0 0 0 60.416 16.64 55.68 55.68 0 0 1-1.28-11.776 49.408 49.408 0 0 1 15.36-36.608 53.12 53.12 0 0 1 75.392 1.152 103.936 103.936 0 0 0 33.28-12.8 50.432 50.432 0 0 1-23.04 28.416A105.6 105.6 0 0 0 256 49.83" fill={`${fill || DARKER_GREY}`} />
  </Svg>
);

/**
 * twitterIcon props
 * @property {number} width - icon width size
 * @property {number} height - icon height size
 * @property {string} fill - fill color, default: svg file color
 * @property {string} viewBox - viewBox width, height, default: 0 0 256 256
 * @property {(Object|style)} [style] - modifier styles
 * @property {string} [className] - modifier class
 */
twitterIcon.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default twitterIcon;
