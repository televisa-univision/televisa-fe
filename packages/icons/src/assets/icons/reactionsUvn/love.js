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
 * love icon component
 * @param {Object} props - components props
 * @param {string} props.className - modifier class name
 * @param {number} props.height - icon height
 * @param {(style|Object)} props.style - style override
 * @param {string} props.viewBox - viewBox
 * @param {number} props.width - icon width
 * @returns {JSX}
 */
const love = ({
  width, height, viewBox, className, style,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <Defs>
      <LinearGradient x1="50%" y1="-7.283%" x2="50%" y2="100%" id="prefix__lovea">
        <Stop stopColor="#E8293E" offset="0%" />
        <Stop stopColor="#C6172A" offset="100%" />
      </LinearGradient>
      <LinearGradient x1="50%" y1="100%" x2="50%" y2="2.001%" id="prefix__loveb">
        <Stop stopColor="#D0021B" stopOpacity={0} offset="0%" />
        <Stop stopColor="#FF8694" offset="100%" />
      </LinearGradient>
    </Defs>
    <G fill="none" fillRule="evenodd">
      <Path
        d="M128 0C57.308 0 0 57.308 0 128s57.308 128 128 128 128-57.308 128-128S198.692 0 128 0z"
        fill="url(#prefix__lovea)"
      />
      <Path
        d="M125.333 10.667c-45.655 0-82.666 29.847-82.666 66.666 0 36.82 37.01 66.667 82.666 66.667S208 114.152 208 77.333s-37.011-66.666-82.667-66.666z"
        fill="url(#prefix__loveb)"
        fillRule="nonzero"
        opacity={0.6}
      />
      <Path
        d="M181.661 85.065c-6.702-6.671-15.576-10.317-25.046-10.317s-18.371 3.673-25.074 10.344l-3.5 3.484-3.555-3.538c-6.703-6.671-15.63-10.371-25.1-10.371-9.444 0-18.345 3.673-25.02 10.317-6.703 6.67-10.393 15.529-10.366 24.954 0 9.426 3.718 18.257 10.42 24.928l50.961 50.72a3.696 3.696 0 002.578 1.08c.923 0 1.873-.35 2.578-1.053l51.07-50.639c6.702-6.67 10.393-15.529 10.393-24.955.027-9.425-3.636-18.284-10.339-24.954z"
        fill="#FFF"
        fillRule="nonzero"
      />
    </G>
  </Svg>
);

love.propTypes = {
  className: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default love;
