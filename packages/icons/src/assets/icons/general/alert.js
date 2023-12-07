import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import { Svg, Path } from 'svgs';

import { BLACK } from '../../../constants/colors';

/**
 * alert icon component
 * @param {!Object} props - components props
 * @param {number} props.size - icon size
 * @param {string} props.fill - icon fill modifier
 * @param {string} props.viewBox - viewBox
 * @param {string} props.className - modifier class name
 * @param {(style|Object)} props.style - style override
 * @returns {JSX}
 */
const alert = ({
  width, height, fill, viewBox, className, style,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <Path d="M201.79797 202.591063H55.5122555c-6.4899213.016009-12.452545-3.384996-15.4771606-8.827974-3.0246155-5.442979-2.6109908-12.027735 1.0736441-17.092026l20.3674725-21.333333v-49.386667C60.2278528 78.5801373 78.782153 53.9130649 106.487201 46.1110632v-3.52c0-11.7820746 10.076053-21.3333333 22.505494-21.3333333 12.429441 0 22.505495 9.5512587 22.505495 21.3333333v3.52c27.586142 8.2525628 45.840635 33.0910925 44.448351 60.4799998v49.066667l20.592528 20.693333c3.921554 5.116912 4.419954 11.906154 1.283845 17.488608-3.136109 5.582454-9.357143 8.979827-16.024944 8.751392zm-95.873407 10.666667h45.010989c0 11.782075-10.076053 21.333333-22.505494 21.333333-12.429442 0-22.505495-9.551258-22.505495-21.333333zm22.505495-181.3333334c-6.214721 0-11.252748 4.7756293-11.252748 10.6666666v12.0533334l-4.501098.8533333c-24.6924076 5.1791313-41.8218527 26.5131216-40.5098906 50.4533331v53.973334l-22.5054945 22.506666c-1.3652161 1.807759-1.5351363 4.191714-.4388586 6.15712 1.0962777 1.965405 3.2703792 3.174543 5.6151223 3.12288H201.122805c2.344743.051663 4.518844-1.157475 5.615122-3.12288 1.096278-1.965406.926358-4.349361-.438858-6.15712l-22.505495-21.333333v-54.506667c1.503345-23.8516992-15.14699-45.3293103-39.60967-51.0933331l-4.501099-.8533333V42.5910632c0-5.8910373-5.038027-10.6666666-11.252747-10.6666666z" fill={`${fill || BLACK}`} fillRule="nonzero" />
  </Svg>
);

alert.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  viewBox: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default alert;
