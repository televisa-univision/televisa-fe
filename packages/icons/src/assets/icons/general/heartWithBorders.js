import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import { BLACK } from '@univision/fe-utilities/styled/constants';

import Svg, { G, Path } from 'svgs';

/**
 * heartWithBorders component
 * @param {size} size - icon size
 * @param {string} props.fill - icon fill modifier
 * @param {string} props.className - modifier class name
 * @param {string} viewBox - viewBox
 * @param {style} style - style override
 * @returns {JSX}
 */
const heartWithBorders = ({
  width, height, fill, viewBox, style, className,
}) => (
  <Svg width={width} height={height} className={className} viewBox={viewBox} style={style}>
    <G fill="none" fillRule="evenodd">
      <Path d="M-32-42h256v256H-32z" />
      <Path
        d="M136.7.7A58 58 0 0096.5 20l-.5.6-.5-.6A57.9 57.9 0 0052.5.7a53.2 53.2 0 00-37.2 14.7A50.3 50.3 0 000 51.8c0 11.4 3.3 22.5 10 33.7l1.5 2.4c9.6 15.6 20.8 27.2 56.1 58.4l28.4 25 23-20.2c41.5-36.6 52.5-47.9 63-65.6a65.2 65.2 0 0010-33.7c0-14-5.5-27-15.3-36.4A53.2 53.2 0 00139.4.7h-2.7zm2.7 10.1c11.7 0 22.4 4.3 30.3 12a40.1 40.1 0 0112.2 29c0 9.5-2.8 18.8-8.6 28.5l-2 3.4c-10 15.8-23.2 28.4-68 67.8l-7.3 6.3-24-21.1c-34.2-30.4-44.3-41-53.3-56.4-5.8-9.7-8.6-19-8.6-28.5 0-11.2 4.4-21.5 12.2-29a43.1 43.1 0 0130.3-12 47.8 47.8 0 0139.2 21l4.2 6.4 4.2-6.5a47.8 47.8 0 0139.2-21z"
        fill={fill || BLACK}
      />
    </G>
  </Svg>
);

/**
 * heart props
 * @property {number} width - icon width size
 * @param {string} props.className - modifier class name
 * @property {number} height - icon height size
 * @property {string} fill - fill color, default: svg file color
 * @property {string} viewBox - viewBox width, height, default: 0 0 256 256
 * @property {(Object|style)} [style] - modifier styles
 */
heartWithBorders.propTypes = {
  className: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  viewBox: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default heartWithBorders;
