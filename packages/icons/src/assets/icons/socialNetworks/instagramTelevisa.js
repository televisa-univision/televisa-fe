import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, { Path } from 'svgs';

import { WHITE } from '@univision/fe-utilities/styled/constants';

/**
 * instagramTelevisaIcon component
 * @param {size} size - icon size
 * @param {string} fill - icon fill modifier
 * @param {style} style - style override
 * @param {string} [className] - modifier class
 * @returns {JSX}
 */
const instagramTelevisaIcon = ({
  width, height, fill, style, className,
}) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    style={style}
    className={className}
  >
    <Path
      d="M14.7 6.6H9.3c-.4 0-.9.1-1.3.2-.5.2-1 .7-1.2 1.3-.2.4-.2.8-.2 1.2v5.4c0 .4.1.9.2 1.3.2.6.7 1 1.3 1.3.4.1.9.2 1.3.2h5.4c.4 0 .8-.1 1.2-.2.6-.2 1-.7 1.3-1.3.1-.4.2-.8.2-1.2V9.4c0-.4-.1-.9-.3-1.3-.2-.6-.7-1-1.3-1.3-.4-.1-.8-.2-1.2-.2zM9.3 5.4H12c1.8 0 2 0 2.7.1.6 0 1.1.1 1.6.3 1 .2 1.7.9 2 1.8.2.5.3 1.1.3 1.6v5.4c0 .6-.1 1.1-.3 1.6-.3.9-1.1 1.6-1.9 1.9-.5.2-1.1.3-1.6.3H9.3c-.6 0-1.1-.1-1.6-.3-1-.1-1.7-.8-2-1.7-.2-.5-.3-1.1-.3-1.6V9.4c0-.6.1-1.1.3-1.6.3-.9 1.1-1.6 2-2 .5-.3 1-.4 1.6-.4zM8.6 12c0-1.9 1.5-3.4 3.4-3.4.9 0 1.8.4 2.4 1 .6.6 1 1.5 1 2.4 0 1.9-1.5 3.4-3.4 3.4S8.6 13.9 8.6 12zm1.2 0c0 1.2 1 2.2 2.2 2.2.6 0 1.2-.2 1.6-.7.4-.4.7-1 .7-1.6 0-1.2-1-2.2-2.2-2.2S9.8 10.8 9.8 12zm5.8-2.8c.4 0 .8-.4.8-.8s-.4-.8-.8-.8-.8.4-.8.8c0 .5.3.8.8.8z"
      fill={fill || WHITE}
    />
  </Svg>
);
/**
 * instagramTelevisaIcon props
 * @property {number} width - icon width size
 * @property {number} height - icon height size
 * @property {string} fill - fill color, default: svg file color
 * @property {(Object|style)} [style] - modifier styles
 * @property {string} [className] - modifier class
 */
instagramTelevisaIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  className: PropTypes.string,
};

export default instagramTelevisaIcon;
