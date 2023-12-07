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
 * sadSoccer icon component
 * @param {Object} props - components props
 * @param {string} props.className - modifier class name
 * @param {number} props.height - icon height
 * @param {(style|Object)} props.style - style override
 * @param {string} props.viewBox - viewBox
 * @param {number} props.width - icon width
 * @returns {JSX}
 */
const sadSoccer = ({
  width, height, viewBox, className, style,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <Defs>
      <LinearGradient
        x1="50%"
        y1="111.073%"
        x2="50%"
        y2="-11.6%"
        id="prefix__sadsoccera"
      >
        <Stop stopColor="#F5A238" offset="0%" />
        <Stop stopColor="#FAD156" offset="100%" />
      </LinearGradient>
      <LinearGradient x1="50%" y1="100%" x2="50%" y2="0%" id="prefix__sadsoccerb">
        <Stop stopColor="#F5A238" stopOpacity={0} offset="0%" />
        <Stop stopColor="#FFFDF7" offset="100%" />
      </LinearGradient>
      <LinearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="prefix__sadsoccerc">
        <Stop stopColor="#945F1A" offset="0%" />
        <Stop stopColor="#25180C" offset="100%" />
      </LinearGradient>
    </Defs>
    <G fill="none" fillRule="evenodd">
      <Path
        d="M128 0C57.308 0 0 57.308 0 128c0 70.692 57.308 128 128 128 70.692 0 128-57.308 128-128C256 57.308 198.692 0 128 0z"
        fill="url(#prefix__sadsoccera)"
      />
      <Path
        d="M126.5 10C84.25 10 50 37.087 50 70.5S84.25 131 126.5 131 203 103.913 203 70.5 168.75 10 126.5 10z"
        fill="url(#prefix__sadsoccerb)"
      />
      <Path
        d="M171.426 98.455l29.131 18.64-.717 116.496a110.017 110.017 0 01-28.414 14.09V98.454z"
        fill="#00B8F4"
      />
      <Path
        d="M209.572 85.248c3.476-1.421 5.15-5.409 3.737-8.907-1.412-3.498-5.375-5.182-8.852-3.76l-45.296 18.515c-6.61 2.701-5.143 12.518 1.964 13.144 9.006.794 15.929 2.208 20.684 4.152 4.86 1.987 12 6.364 21.218 13.088a6.767 6.767 0 009.489-1.523c2.202-3.057 1.524-7.331-1.514-9.547-10.03-7.316-17.99-12.197-24.079-14.686a45.915 45.915 0 00-1.53-.593l24.179-9.883z"
        fill="#333"
      />
      <Path
        d="M123 139c-14.912 0-27 15.222-27 34s12.088 34 27 34 27-15.222 27-34-12.088-34-27-34z"
        fill="url(#prefix__sadsoccerc)"
      />
      <Path
        d="M83.574 98.455l-29.131 18.64.717 116.496a110.017 110.017 0 0028.414 14.09V98.454z"
        fill="#00B8F4"
      />
      <Path
        d="M45.428 85.248c-3.476-1.421-5.15-5.409-3.737-8.907 1.412-3.498 5.375-5.182 8.852-3.76l45.296 18.515c6.61 2.701 5.143 12.518-1.964 13.144-9.006.794-15.929 2.208-20.684 4.152-4.86 1.987-12 6.364-21.218 13.088a6.767 6.767 0 01-9.489-1.523c-2.202-3.057-1.524-7.331 1.514-9.547 10.03-7.316 17.99-12.197 24.079-14.686a45.915 45.915 0 011.53-.593l-24.179-9.883z"
        fill="#333"
      />
    </G>
  </Svg>
);

sadSoccer.propTypes = {
  className: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default sadSoccer;
