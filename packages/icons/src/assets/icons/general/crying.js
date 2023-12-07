import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import Svg, {
  G, Path, Defs, LinearGradient, Stop,
} from 'svgs';

/**
 * crying component
 * @param {size} size - icon size
 * @param {string} viewBox - viewBox
 * @param {style} style - style override
 * @returns {JSX}
 */
const crying = ({
  width, height, viewBox, style,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} style={style}>
    <Defs>
      <LinearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="a">
        <Stop stopColor="#FAD256" offset="0%" />
        <Stop stopColor="#F9CD53" offset="51%" />
        <Stop stopColor="#F6B947" offset="100%" />
      </LinearGradient>
      <LinearGradient x1="49.98%" y1="0%" x2="49.98%" y2="99.99%" id="b">
        <Stop stopColor="#926505" offset="0%" />
        <Stop stopColor="#C88F3A" offset="100%" />
      </LinearGradient>
      <LinearGradient x1="49.99%" y1="0%" x2="49.99%" y2="72.46%" id="c">
        <Stop stopColor="#926505" offset="0%" />
        <Stop stopColor="#C28C2F" offset="100%" />
      </LinearGradient>
      <LinearGradient x1="49.67%" y1="15.42%" x2="49.67%" y2="101.05%" id="d">
        <Stop stopColor="#96D6F7" offset="0%" />
        <Stop stopColor="#198DE9" offset="100%" />
      </LinearGradient>
      <LinearGradient x1="50%" y1=".22%" x2="50%" y2="99.78%" id="e">
        <Stop stopColor="#8CCCF5" offset="0%" />
        <Stop stopColor="#1A8EE9" offset="100%" />
      </LinearGradient>
      <LinearGradient x1="50%" y1="0%" x2="50%" y2="243.88%" id="f">
        <Stop stopColor="#5B310B" offset="0%" />
        <Stop stopColor="#C28C2F" offset="100%" />
      </LinearGradient>
      <LinearGradient x1="50%" y1="0%" x2="50%" y2="243.88%" id="g">
        <Stop stopColor="#5B310B" offset="0%" />
        <Stop stopColor="#C28C2F" offset="100%" />
      </LinearGradient>
    </Defs>
    <G fill="none" fillRule="evenodd">
      <Path d="M221 213.99c0-5.72-41.8-10.37-93.36-10.37s-93.36 4.65-93.36 10.37c0 5.73 41.8 10.38 93.36 10.38S221 219.72 221 213.99" fill="#1A8EE9" />
      <Path d="M197.48 213.99c0-4.28-31.28-7.76-69.84-7.76-38.57 0-69.84 3.48-69.84 7.76 0 4.28 31.27 7.76 69.84 7.76 38.57 0 69.84-3.48 69.84-7.76" fill="#107FD7" />
      <Path d="M158.72 28.06C122.45-8.02 63.46-8.02 27.2 28.05a92.26 92.26 0 0 0 0 130.82c36.26 36.07 95.25 36.07 131.5 0a92.25 92.25 0 0 0 .02-130.81zm-10.15 120.72c-30.66 30.5-80.56 30.5-111.23 0a78.03 78.03 0 0 1 0-110.64c30.67-30.5 80.56-30.5 111.23 0a78.02 78.02 0 0 1 0 110.64z" transform="translate(34.46 32)" fill="url(#a)" fillRule="nonzero" />
      <Path d="M109.56 1.94a4.72 4.72 0 0 0-3.8-1.94h-101C3.29 0 1.87.71.97 1.94a5 5 0 0 0-.78 4.28c6.9 25.15 29.55 42.72 55.08 42.72 25.54 0 48.19-17.57 55.1-42.72a5 5 0 0 0-.8-4.28h-.01z" transform="translate(72.06 133.97)" fill="url(#b)" />
      <Path d="M169.87 109.88l-16.62-12.76 16.62-12.78a5.91 5.91 0 0 0 1.14-8.13 5.58 5.58 0 0 0-7.93-1.16l-22.65 17.41a5.88 5.88 0 0 0-.01 9.3l22.66 17.42a5.6 5.6 0 0 0 7.93-1.16 5.91 5.91 0 0 0-1.14-8.14zM111.15 92.46L88.49 75.03a5.6 5.6 0 0 0-7.94 1.17 5.91 5.91 0 0 0 1.13 8.13l16.64 12.78-16.64 12.77a5.91 5.91 0 0 0-1.13 8.14 5.62 5.62 0 0 0 7.94 1.16l22.66-17.43a5.85 5.85 0 0 0 2.27-4.64c0-1.83-.84-3.56-2.27-4.65z" fill="#936411" />
      <Path d="M127.64 218.84a92.92 92.92 0 1 0 0-185.84 92.92 92.92 0 0 0 0 185.84z" fill="#FBD15D" />
      <Path d="M158.72 28.06C122.45-8.02 63.46-8.02 27.2 28.05a92.26 92.26 0 0 0 0 130.82c36.26 36.07 95.25 36.07 131.5 0a92.25 92.25 0 0 0 .02-130.81zm-10.15 120.72c-30.66 30.5-80.56 30.5-111.23 0a78.03 78.03 0 0 1 0-110.64c30.67-30.5 80.56-30.5 111.23 0a78.02 78.02 0 0 1 0 110.64z" transform="translate(34.46 32)" fill="url(#a)" fillRule="nonzero" />
      <Path d="M60.08 30.72a8.21 8.21 0 0 1-4.89-1.67c-10.87-7.96-29.93-7.96-40.8 0-4.48 3.3-10.32 1.55-13.02-3.9C-1.34 19.69.1 12.6 4.58 9.3 21.52-3.1 48.06-3.1 65 9.31c4.49 3.3 5.93 10.38 3.22 15.84-1.77 3.58-4.9 5.57-8.13 5.57h-.01z" transform="translate(91.97 131.64)" fill="url(#c)" />
      <G fillRule="nonzero">
        <Path d="M20.26.28L0 0v115.2h20.26V.28zm94.23 114.92H94.25V.28L114.5 0v115.2h-.01z" transform="translate(69.07 105.22)" fill="url(#d)" />
        <Path d="M1 1V.75H.75V1H1zm20.26.28h.25v-.25h-.25v.25zM1 116.2H.75v.25H1v-.25zm20.26 0v.25h.25v-.25h-.25zm73.98 0h-.25v.25h.25v-.25zm20.26 0v.25h.25v-.25h-.25zM95.23 1.28v-.25h-.25v.25h.25zM115.5 1h.25V.75h-.26V1h.01zM1 1.25l20.25.28.01-.5L1 .75v.5zm.25 114.95V1h-.5v115.2h.5zm20-.25H1v.5h20.26v-.5h-.01zM21.02 1.28V116.2h.5V1.28H21h.02zm74.23 115.17h20.26v-.5H95.23v.5h.02zM94.99 1.28V116.2h.5V1.28h-.5zm20.5-.53l-20.26.28.01.5 20.26-.28v-.5h-.01zm.26 115.45V1h-.5v115.2h.5z" fill="url(#e)" transform="translate(68.07 104.22)" />
      </G>
      <Path d="M44.38 0a5 5 0 0 0-2.2.52C24.86 9.08 7.31.6 7.14.52A4.96 4.96 0 0 0 .52 2.7a4.85 4.85 0 0 0 2.21 6.54c.9.43 22.18 10.7 43.86 0A4.85 4.85 0 0 0 48.8 2.7 4.94 4.94 0 0 0 44.38 0" transform="translate(67.31 99.94)" fill="url(#f)" />
      <Path d="M44.38 0a5 5 0 0 0-2.2.52C24.86 9.07 7.31.6 7.14.52A4.96 4.96 0 0 0 .52 2.7a4.85 4.85 0 0 0 2.21 6.54c.9.43 22.2 10.7 43.86 0a4.84 4.84 0 0 0 2.2-6.54A4.93 4.93 0 0 0 44.4 0" transform="translate(136 99.94)" fill="url(#g)" />
    </G>
  </Svg>
);

/**
 * crying props
 * @property {number} width - icon width size
 * @property {number} height - icon height size
 * @property {string} viewBox - viewBox width, height, default: 0 0 256 256
 * @property {(Object|style)} [style] - modifier styles
 */
crying.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  viewBox: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default crying;
