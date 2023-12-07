import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import Svg, { G, Path } from 'svgs';

/**
 * galavisionMobileWhite
 * @param {size} props.size - icon size
 * @param {string} props.fill - icon fill modifier
 * @param {style} props.style - style override
 * @param {string} props.className - modifier class name
 * @returns {JSX}
 */
const galavisionMobileWhite = ({
  width, height, fill, className, style,
}) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 14 16"
    className={className}
    style={style}
  >
    <G id="Page-1" fill="none" fillRule="evenodd">
      <G id="Deportes/TV-Logo/Mobile/white/galavision" fill={`${fill || '#FEFEFE'}`} transform="translate(-1)">
        <Path id="Fill-1" d="M10.826 14.31c.242.017.498.068.74.085-1.164 1.036-2.537 1.675-4.13 1.599-.744-.035-1.449-.093-2.168-.318-1.51-.472-2.772-1.49-3.487-2.91-1.377-2.737-.777-5.821.587-8.445.295-.568.637-1.113 1.033-1.617C4.503 1.3 6.044.324 7.847.182A7.409 7.409 0 0 1 9.89.32l.757.623c.1.082-.77 2.05-.835 2.222-.292.776-.605 1.55-.876 2.332-.846-.071-1.653.186-2.339.677-1.454 1.04-2.04 3.062-1.828 4.815.16 1.317.89 2.277 1.955 2.923 1.061.643 2.14 1.226 4.062.409" />
        <Path id="Fill-4" d="M7 13.137s1.025.937 2.535.858c.996-.053 2.727.216 4.165-1.566 0 0 2.378-2.437.702-6.039L13.747 6l-5.221.63s1.44.506 1.881 1.933c.408 1.318.13 4.002-3.407 4.574" />
      </G>
    </G>
  </Svg>
);

/**
 * galavisionMobileWhite props
 * @property {number} width - icon width size
 * @property {number} height - icon height size
 * @property {string} fill - fill color, default: svg file color
 * @property {string} className - className width, height, default: 0 0 256 256
 * @property {(Object|style)} [style] - modifier styles
 */
galavisionMobileWhite.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default galavisionMobileWhite;
