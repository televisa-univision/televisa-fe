import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import {
  Defs,
  G,
  LinearGradient,
  Path,
  Stop,
  Svg,
} from 'svgs';

/**
 * funnySoccer icon component
 * @param {Object} props - components props
 * @param {string} props.className - modifier class name
 * @param {number} props.height - icon height
 * @param {(style|Object)} props.style - style override
 * @param {string} props.viewBox - viewBox
 * @param {number} props.width - icon width
 * @returns {JSX}
 */
const funnySoccer = ({
  width, height, viewBox, className, style,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <Defs>
      <LinearGradient
        x1="50%"
        y1="111.073%"
        x2="50%"
        y2="-11.6%"
        id="prefix__funnysoccera"
      >
        <Stop stopColor="#F5A238" offset="0%" />
        <Stop stopColor="#FAD156" offset="100%" />
      </LinearGradient>
      <LinearGradient x1="50%" y1="100%" x2="50%" y2="0%" id="prefix_funnysoccerb">
        <Stop stopColor="#F5A238" stopOpacity={0} offset="0%" />
        <Stop stopColor="#FFFDF7" offset="100%" />
      </LinearGradient>
      <LinearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="prefix_funnysoccerc">
        <Stop stopColor="#945F1A" offset="0%" />
        <Stop stopColor="#25180C" offset="100%" />
      </LinearGradient>
      <LinearGradient
        x1="96.185%"
        y1="15.683%"
        x2="17.42%"
        y2="89.662%"
        id="prefix_funnysoccerd"
      >
        <Stop stopColor="#67DAFF" offset="0%" />
        <Stop stopColor="#00B8F4" offset="100%" />
      </LinearGradient>
      <LinearGradient
        x1="31.941%"
        y1="14.736%"
        x2="31.941%"
        y2="78.425%"
        id="prefix_funnysoccere"
      >
        <Stop stopColor="#FFF" stopOpacity={0.571} offset="0%" />
        <Stop stopColor="#FFF" stopOpacity={0} offset="100%" />
      </LinearGradient>
    </Defs>
    <G fill="none" fillRule="evenodd">
      <Path
        d="M130.225.889C61.79.889 6.313 56.55 6.313 125.21c0 68.662 55.477 124.323 123.912 124.323s123.912-55.661 123.912-124.323C254.137 56.55 198.66.89 130.225.89z"
        fill="url(#prefix__funnysoccera)"
        fillRule="nonzero"
      />
      <Path
        d="M128 0C57.308 0 0 57.308 0 128s57.308 128 128 128 128-57.308 128-128S198.692 0 128 0z"
        fill="url(#prefix__funnysoccera)"
        fillRule="nonzero"
      />
      <Path
        d="M128.504 11.25c-44.673 0-80.887 28.603-80.887 63.887s36.214 63.888 80.887 63.888 80.887-28.604 80.887-63.888-36.214-63.888-80.887-63.888z"
        fill="url(#prefix_funnysoccerb)"
        fillRule="nonzero"
      />
      <Path
        d="M52.78 145.932c0 41.96 33.903 75.975 75.724 75.975 41.821 0 75.724-34.015 75.724-75.975-17.21-4.605-42.451-6.907-75.724-6.907s-58.514 2.302-75.724 6.907z"
        fill="url(#prefix_funnysoccerc)"
        fillRule="nonzero"
      />
      <Path
        d="M166.465 211.685c-11.16 6.5-24.127 10.222-37.961 10.222s-26.801-3.722-37.962-10.222c8.415-16.798 22.282-27.766 37.962-27.766 15.68 0 29.546 10.968 37.961 27.766z"
        fill="#E56839"
        fillRule="nonzero"
      />
      <Path
        d="M203.924 116.769c-7.224-7.92-16.467-11.88-27.729-11.88s-20.505 3.478-27.73 10.435M51.23 116.77c7.223-7.92 16.467-11.88 27.729-11.88s20.505 3.478 27.73 10.435"
        stroke="#3D3B3B"
        strokeWidth={13.581}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M37.627 109.778C49.94 108.4 65.532 47.91 66.942 32.991c1.41-14.92-7.428-25.897-19.741-24.518-12.313 1.38-23.437 14.593-24.847 29.512-1.41 14.92 2.96 73.173 15.273 71.793z"
        fill="url(#prefix_funnysoccerd)"
        transform="rotate(158 118.524 134.333)"
      />
      <Path
        d="M37.627 109.778C49.94 108.4 65.532 47.91 66.942 32.991c1.41-14.92-7.428-25.897-19.741-24.518-12.313 1.38-23.437 14.593-24.847 29.512-1.41 14.92 2.96 73.173 15.273 71.793z"
        fill="url(#prefix_funnysoccere)"
        transform="rotate(158 118.524 134.333)"
      />
      <G>
        <Path
          d="M37.627 109.778C49.94 108.4 65.532 47.91 66.942 32.991c1.41-14.92-7.428-25.897-19.741-24.518-12.313 1.38-23.437 14.593-24.847 29.512-1.41 14.92 2.96 73.173 15.273 71.793z"
          fill="url(#prefix_funnysoccerd)"
          transform="scale(1 -1) rotate(-22 -563.084 -48.748)"
        />
        <Path
          d="M37.627 109.778C49.94 108.4 65.532 47.91 66.942 32.991c1.41-14.92-7.428-25.897-19.741-24.518-12.313 1.38-23.437 14.593-24.847 29.512-1.41 14.92 2.96 73.173 15.273 71.793z"
          fill="url(#prefix_funnysoccere)"
          transform="scale(1 -1) rotate(-22 -563.084 -48.748)"
        />
      </G>
    </G>
  </Svg>
);

funnySoccer.propTypes = {
  className: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default funnySoccer;
