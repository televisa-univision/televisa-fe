import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import Svg, {
  G, Path, Defs, LinearGradient, Stop,
} from 'svgs';

/**
 * laughing component
 * @param {size} size - icon size
 * @param {string} viewBox - viewBox
 * @param {style} style - style override
 * @returns {JSX}
 */
const laughing = ({
  width, height, viewBox, style,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} style={style}>
    <Defs>
      <LinearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="a">
        <Stop stopColor="#FAD256" offset="0%" />
        <Stop stopColor="#F9CD53" offset="51%" />
        <Stop stopColor="#F6B947" offset="100%" />
      </LinearGradient>
      <LinearGradient x1="50.04%" y1="0%" x2="50.04%" y2="100.03%" id="b">
        <Stop stopColor="#FAD256" offset="0%" />
        <Stop stopColor="#F9CD53" offset="51%" />
        <Stop stopColor="#F6B947" offset="100%" />
      </LinearGradient>
      <LinearGradient x1="50%" y1="-.01%" x2="50%" y2="100.04%" id="c">
        <Stop stopColor="#FAD256" offset="0%" />
        <Stop stopColor="#F9CD53" offset="51%" />
        <Stop stopColor="#F6B947" offset="100%" />
      </LinearGradient>
      <LinearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="d">
        <Stop stopColor="#503600" offset="0%" />
        <Stop stopColor="#F9D34E" offset="100%" />
      </LinearGradient>
      <LinearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="laughingE">
        <Stop stopColor="#FAD256" offset="0%" />
        <Stop stopColor="#F9CD53" offset="51%" />
        <Stop stopColor="#F6B947" offset="100%" />
      </LinearGradient>
      <LinearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="f">
        <Stop stopColor="#926505" offset="0%" />
        <Stop stopColor="#C88F3A" offset="100%" />
      </LinearGradient>
    </Defs>
    <G fill="none" fillRule="evenodd">
      <Path d="M0 91.2C0 40.91 40.91 0 91.2 0c50.29 0 91.2 40.91 91.2 91.2 0 50.29-40.91 91.2-91.2 91.2C40.91 182.4 0 141.49 0 91.2zm11.4 0c0 44 35.8 79.8 79.8 79.8S171 135.2 171 91.2s-35.8-79.8-79.8-79.8-79.8 35.8-79.8 79.8z" transform="translate(35 36.6)" fill="url(#a)" fillRule="nonzero" />
      <Path d="M32.2 35.34L15.86 22.8 32.2 10.26a5.8 5.8 0 0 0 1.12-7.98 5.49 5.49 0 0 0-7.8-1.14L3.24 18.24a5.74 5.74 0 0 0-.01 9.12l22.29 17.1a5.52 5.52 0 0 0 7.8-1.14 5.8 5.8 0 0 0-1.12-7.98z" transform="translate(137.36 82.2)" fill="url(#b)" />
      <Path d="M31.21 18.24L8.91 1.14a5.51 5.51 0 0 0-7.8 1.13 5.8 5.8 0 0 0 1.12 7.98L18.58 22.8 2.23 35.34a5.8 5.8 0 0 0-1.12 7.98 5.53 5.53 0 0 0 7.8 1.14l22.3-17.1a5.74 5.74 0 0 0 2.23-4.56c0-1.8-.82-3.5-2.23-4.56z" transform="translate(80.6 82.2)" fill="url(#c)" />
      <Path d="M108.75 1.9a4.64 4.64 0 0 0-3.74-1.9H5.7C4.23 0 2.84.7 1.95 1.9a4.9 4.9 0 0 0-.78 4.21c6.8 24.68 29.07 41.92 54.18 41.92s47.4-17.24 54.18-41.92c.4-1.45.11-3-.78-4.2V1.9z" transform="translate(70.48 142.4)" fill="url(#d)" />
      <Path d="M156.1 26.56C120.43-8.85 62.4-8.85 26.75 26.55a90.43 90.43 0 0 0 0 128.4c35.66 35.4 93.68 35.4 129.34 0a90.41 90.41 0 0 0 0-128.4l.01.01zm-9.99 118.48C115.96 175 66.9 175 36.73 145.05a76.48 76.48 0 0 1 0-108.6c30.16-29.93 79.22-29.94 109.4 0a76.47 76.47 0 0 1-.02 108.6v-.01z" transform="translate(38.21 36.6)" fill="url(#laughingE)" fillRule="nonzero" />
      <Path d="M108.75 1.9a4.64 4.64 0 0 0-3.74-1.9H5.7C4.23 0 2.84.7 1.95 1.9a4.9 4.9 0 0 0-.78 4.21c6.8 24.68 29.07 41.92 54.18 41.92s47.4-17.24 54.18-41.92c.4-1.45.11-3-.78-4.2V1.9z" transform="translate(74.2 135.7)" fill="url(#f)" />
      <Path d="M171.39 112.07l-16.34-12.54 16.34-12.54a5.8 5.8 0 0 0 1.12-7.98 5.49 5.49 0 0 0-7.8-1.14l-22.28 17.1a5.74 5.74 0 0 0-.01 9.12l22.29 17.1a5.52 5.52 0 0 0 7.8-1.14 5.8 5.8 0 0 0-1.12-7.98zM113.63 94.97l-22.3-17.1a5.51 5.51 0 0 0-7.8 1.13 5.8 5.8 0 0 0 1.12 7.98L101 99.53l-16.35 12.54a5.8 5.8 0 0 0-1.12 7.98 5.53 5.53 0 0 0 7.8 1.14l22.3-17.1a5.74 5.74 0 0 0 2.23-4.56c0-1.8-.82-3.5-2.23-4.56z" fill="#936411" />
      <Path d="M129.85 219a91.2 91.2 0 1 0 0-182.4 91.2 91.2 0 0 0 0 182.4z" fill="#FBD15D" />
      <Path d="M156.1 26.56C120.43-8.85 62.4-8.85 26.75 26.55a90.43 90.43 0 0 0 0 128.4c35.66 35.4 93.68 35.4 129.34 0a90.41 90.41 0 0 0 0-128.4l.01.01zm-9.99 118.48C115.96 175 66.9 175 36.73 145.05a76.48 76.48 0 0 1 0-108.6c30.16-29.93 79.22-29.94 109.4 0a76.47 76.47 0 0 1-.02 108.6v-.01z" transform="translate(38.21 36.6)" fill="url(#laughingE)" fillRule="nonzero" />
      <Path d="M108.75 1.9a4.64 4.64 0 0 0-3.74-1.9H5.7C4.23 0 2.84.7 1.95 1.9a4.9 4.9 0 0 0-.78 4.21c6.8 24.68 29.07 41.92 54.18 41.92s47.4-17.24 54.18-41.92c.4-1.45.11-3-.78-4.2V1.9z" transform="translate(74.2 135.7)" fill="url(#f)" />
      <Path d="M171.39 112.07l-16.34-12.54 16.34-12.54a5.8 5.8 0 0 0 1.12-7.98 5.49 5.49 0 0 0-7.8-1.14l-22.28 17.1a5.74 5.74 0 0 0-.01 9.12l22.29 17.1a5.52 5.52 0 0 0 7.8-1.14 5.8 5.8 0 0 0-1.12-7.98zM113.63 94.97l-22.3-17.1a5.51 5.51 0 0 0-7.8 1.13 5.8 5.8 0 0 0 1.12 7.98L101 99.53l-16.35 12.54a5.8 5.8 0 0 0-1.12 7.98 5.53 5.53 0 0 0 7.8 1.14l22.3-17.1a5.74 5.74 0 0 0 2.23-4.56c0-1.8-.82-3.5-2.23-4.56z" fill="#5B310B" />
    </G>
  </Svg>
);

/**
 * laughing props
 * @property {number} width - icon width size
 * @property {number} height - icon height size
 * @property {string} viewBox - viewBox width, height, default: 0 0 256 256
 * @property {(Object|style)} [style] - modifier styles
 */
laughing.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  viewBox: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default laughing;
