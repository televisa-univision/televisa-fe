import React from 'react';
import PropTypes from 'prop-types';
import Svg, {
  Path, G, Defs, Rect,
} from 'svgs';

/**
 * lasEstrellasAppBlack component
 * @param {size} size - icon size
 * @param {string} fill - icon fill modifier
 * @param {string} viewBox - viewBox
 * @param {style} style - style override
 * @param {string} [className] - modifier class
 * @returns {JSX}
 */
const lasEstrellasAppBlack = ({
  width, height,
}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <G clipPath="url(#clip0_1143_26947)">
      <Rect width="24" height="24" rx="5" fill="#1D1D27" />
      <Path fillRule="evenodd" clipRule="evenodd" d="M11.9906 11.1879H11.8973L11.4679 10.3104L11.9533 4.07468V4.05601C11.9533 4.03734 11.972 4 12.0093 4C12.0466 4 12.0653 4.01867 12.0653 4.05601V4.07468L12.5134 10.4037L12.1027 11.1692L11.9906 11.1879ZM17.5542 6.33372C17.5729 6.31505 17.6102 6.29638 17.6476 6.33372C17.6849 6.37106 17.6663 6.4084 17.6476 6.42707L17.6289 6.44574L13.4656 11.2625L12.6441 11.5052L12.5507 11.4306L12.4947 11.3559L12.8121 10.4411L17.5356 6.35239L17.5542 6.33372ZM20 11.9907C20 11.9533 19.9627 11.9347 19.944 11.9347H19.9253L13.7083 11.4866L12.8121 11.916V12.0094L12.8308 12.14L13.5776 12.5321L19.944 12.0654H19.9627L20 11.9907ZM13.5589 12.8495L17.6475 17.5543L17.6849 17.6476H17.5915L17.5729 17.6289L12.7374 13.4469L12.476 12.6254L12.5507 12.5321L12.588 12.4948L13.5589 12.8495ZM12.0466 12.7748H11.9906L11.8786 12.7935L11.4679 13.5589L11.916 19.9253V19.944C11.916 19.9813 11.9346 20 11.972 20C12.0093 20 12.028 19.9627 12.028 19.944V19.9253L12.4761 13.727L12.0466 12.7748ZM11.4492 12.5508L11.4865 12.5881L11.1505 13.5776L6.44569 17.6476L6.42702 17.6663H6.33367V17.5729L6.35234 17.5543L10.5157 12.7561L11.3745 12.4948L11.4492 12.5508ZM11.2252 12.0653V11.8973L10.4224 11.4679L4.07468 11.9347H4.05601C4.01867 11.9347 4 11.9533 4 11.9907C4 12.028 4.03734 12.0467 4.05601 12.0467H4.07468L10.3104 12.4948L11.2252 12.0653ZM11.4305 11.4306L11.3558 11.4866L10.441 11.1692L6.35234 6.44574L6.33367 6.42707V6.33372H6.42702L6.44569 6.35239L11.2438 10.5157L11.5052 11.3559L11.4305 11.4306Z" fill="white" />
    </G>
    <Defs>
      <clipPath id="clip0_1143_26947">
        <Rect width="24" height="24" fill="white" />
      </clipPath>
    </Defs>
  </Svg>
);

/**
 * lasEstrellasApp props
 * @property {number} width - icon width size
 * @property {number} height - icon height size
 * @property {string} fill - fill color, default: svg file color
 * @property {string} viewBox - viewBox width, height, default: 0 0 256 256
 * @property {(Object|style)} [style] - modifier styles
 * @property {string} [className] - modifier class
 */
lasEstrellasAppBlack.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};

export default lasEstrellasAppBlack;
