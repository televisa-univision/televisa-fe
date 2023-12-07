import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import {
  Defs,
  G,
  LinearGradient,
  RadialGradient,
  Path,
  Stop,
  Svg,
} from 'svgs';

/**
 * loveSoccer icon component
 * @param {Object} props - components props
 * @param {string} props.className - modifier class name
 * @param {number} props.height - icon height
 * @param {(style|Object)} props.style - style override
 * @param {string} props.viewBox - viewBox
 * @param {number} props.width - icon width
 * @returns {JSX}
 */
const loveSoccer = ({
  width, height, viewBox, className, style,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <Defs>
      <LinearGradient
        x1="50%"
        y1="111.073%"
        x2="50%"
        y2="-11.6%"
        id="prefix__lovesoccera"
      >
        <Stop stopColor="#F5A238" offset="0%" />
        <Stop stopColor="#FAD156" offset="100%" />
      </LinearGradient>
      <LinearGradient x1="50%" y1="100%" x2="50%" y2="0%" id="prefix__lovesoccerb">
        <Stop stopColor="#FBEB4B" stopOpacity={0.26} offset="0%" />
        <Stop stopColor="#FFFDF7" offset="100%" />
      </LinearGradient>
      <LinearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="prefix__lovesoccerc">
        <Stop stopColor="#945F1A" offset="0%" />
        <Stop stopColor="#25180C" offset="100%" />
      </LinearGradient>
      <LinearGradient
        x1="67.992%"
        y1="129.525%"
        x2="50%"
        y2="27.889%"
        id="prefix__lovesoccere"
      >
        <Stop stopColor="#FFF" stopOpacity={0} offset="0%" />
        <Stop stopColor="#FFF7E0" offset="100%" />
      </LinearGradient>
      <RadialGradient
        cx="50%"
        cy="48.009%"
        fx="50%"
        fy="48.009%"
        r="47.183%"
        gradientTransform="matrix(0 -1 .9258 0 .056 .98)"
        id="prefix__lovesoccerd"
      >
        <Stop stopColor="#FF7FAF" offset="0%" />
        <Stop stopColor="#FBC001" offset="100%" />
      </RadialGradient>
    </Defs>
    <G fill="none" fillRule="evenodd">
      <Path d="M0 0h256v256H0z" />
      <Path
        d="M128 0C57.308 0 0 57.308 0 128s57.308 128 128 128 128-57.308 128-128S198.692 0 128 0z"
        fill="url(#prefix__lovesoccera)"
        fillRule="nonzero"
      />
      <Path
        d="M125.333 10.667C82.623 10.667 48 38.127 48 72s34.623 61.333 77.333 61.333 77.334-27.46 77.334-61.333-34.624-61.333-77.334-61.333z"
        fill="url(#prefix__lovesoccerb)"
        fillRule="nonzero"
      />
      <Path
        d="M53.333 149.333c0 38.292 32.236 69.334 72 69.334 39.765 0 72-31.042 72-69.334-16.363 1.146-40.363 1.72-72 1.72-31.636 0-55.636-.574-72-1.72z"
        fill="url(#prefix__lovesoccerc)"
        fillRule="nonzero"
      />
      <Path
        d="M160.63 210.014c-10.57 5.589-22.685 8.653-35.297 8.653-12.597 0-24.718-3.057-35.305-8.634.188-.428.38-.852.574-1.273 7.678-16.588 20.372-27.427 34.731-27.427 14.719 0 27.687 11.388 35.298 28.681z"
        fill="#E56839"
        fillRule="nonzero"
      />
      <G fillRule="nonzero">
        <Path
          d="M71.147 132.388l-21.364 15.64a6.233 6.233 0 01-9.903-4.653l-1.61-26.722-23.729-16.03a6.233 6.233 0 011.146-10.94L40.62 79.565l9.055-28.327a6.233 6.233 0 0111.013-1.718L77.67 73.359l26.498-4.18a6.233 6.233 0 016.372 9.268l-13.69 23.777L105 131.05a6.233 6.233 0 01-7.47 7.753l-26.384-6.415z"
          fill="#523014"
        />
        <Path
          d="M60.018 93.492l-23.168 9.965a5.934 5.934 0 01-8.197-6.433l4.234-25.244-18.612-20.054a5.934 5.934 0 013.41-9.896l25.326-4.063 14.464-24.41a5.934 5.934 0 0110.592.763l10.646 25.831 25.507 1.807a5.934 5.934 0 013.932 9.955L90.322 70.94l1.39 28.6a5.934 5.934 0 01-8.597 5.588L60.018 93.492z"
          fill="url(#prefix__lovesoccerd)"
          transform="rotate(-13 201.643 74.105)"
        />
        <Path
          d="M37.603 70.369l-16.15-10.666a4.872 4.872 0 01.892-8.595l19.259-7.623 7.065-21.636a4.872 4.872 0 018.567-1.359l13.33 18.274L91.2 35.598a4.872 4.872 0 014.936 7.288L88.05 56.622c-10.18 9.2-23.92 14.841-39.038 14.841a59.65 59.65 0 01-11.408-1.094z"
          fill="url(#prefix__lovesoccere)"
          transform="translate(0 32)"
        />
      </G>
      <G fillRule="nonzero">
        <Path
          d="M184.853 132.388l21.364 15.64a6.233 6.233 0 009.903-4.653l1.61-26.722 23.729-16.03a6.233 6.233 0 00-1.146-10.94L215.38 79.565l-9.055-28.327a6.233 6.233 0 00-11.013-1.718L178.33 73.359l-26.498-4.18a6.233 6.233 0 00-6.372 9.268l13.69 23.777L151 131.05a6.233 6.233 0 007.47 7.753l26.384-6.415z"
          fill="#523014"
        />
        <Path
          d="M65.593 93.492l-23.168 9.965a5.934 5.934 0 01-8.197-6.433l4.234-25.244L19.85 51.726a5.934 5.934 0 013.41-9.896l25.326-4.063 14.464-24.41a5.934 5.934 0 0110.592.763l10.646 25.831 25.507 1.807a5.934 5.934 0 013.932 9.955L95.897 70.94l1.39 28.6a5.934 5.934 0 01-8.597 5.588L65.593 93.492z"
          fill="url(#prefix__lovesoccerd)"
          transform="scale(-1 1) rotate(-13 76.43 1222.011)"
        />
        <Path
          d="M49.566 70.369l-16.15-10.666a4.872 4.872 0 01.892-8.595l19.259-7.623 7.065-21.636A4.872 4.872 0 0169.2 20.49l13.33 18.274 20.635-3.166a4.872 4.872 0 014.936 7.288l-8.088 13.736c-10.18 9.2-23.92 14.841-39.038 14.841a59.65 59.65 0 01-11.408-1.094z"
          fill="url(#prefix__lovesoccere)"
          transform="matrix(-1 0 0 1 267.963 32)"
        />
      </G>
    </G>
  </Svg>
);

loveSoccer.propTypes = {
  className: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default loveSoccer;
